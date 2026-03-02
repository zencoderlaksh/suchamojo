import React, { forwardRef, useEffect, useMemo, useState } from 'react'

const OMIT_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'whileHover',
  'whileInView',
  'viewport',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragTransition',
  'whileTap',
  'onDragEnd',
])

const motionCache = new Map()

const readMotionValue = (value) => {
  if (value && typeof value.get === 'function') return value.get()
  return value
}

const formatTransformValue = (value, unit) => {
  const resolved = readMotionValue(value)
  if (resolved == null) return null
  if (typeof resolved === 'number') return `${resolved}${unit}`
  return `${resolved}`
}

const normalizeStyle = (style) => {
  if (!style || typeof style !== 'object') return style

  const nextStyle = { ...style }
  const transforms = []
  const transformKeyMap = [
    ['x', 'translateX', 'px'],
    ['y', 'translateY', 'px'],
    ['rotateX', 'rotateX', 'deg'],
    ['rotateY', 'rotateY', 'deg'],
    ['rotateZ', 'rotateZ', 'deg'],
    ['scale', 'scale', ''],
  ]

  transformKeyMap.forEach(([styleKey, transformFn, unit]) => {
    if (styleKey in nextStyle) {
      const value = formatTransformValue(nextStyle[styleKey], unit)
      if (value != null) transforms.push(`${transformFn}(${value})`)
      delete nextStyle[styleKey]
    }
  })

  if (transforms.length) {
    const existing = nextStyle.transform ? `${nextStyle.transform} ` : ''
    nextStyle.transform = `${existing}${transforms.join(' ')}`.trim()
  }

  return nextStyle
}

const createMotionComponent = (tag) =>
  forwardRef(function MotionComponent(props, ref) {
    const cleanProps = {}
    Object.keys(props).forEach((key) => {
      if (!OMIT_PROPS.has(key)) cleanProps[key] = props[key]
    })
    if ('style' in cleanProps) cleanProps.style = normalizeStyle(cleanProps.style)
    return React.createElement(tag, { ...cleanProps, ref })
  })

export const motion = new Proxy(
  {},
  {
    get(_, key) {
      if (!motionCache.has(key)) {
        motionCache.set(key, createMotionComponent(key))
      }
      return motionCache.get(key)
    },
  }
)

export const AnimatePresence = ({ children }) =>
  React.createElement(React.Fragment, null, children)

export const useInView = (ref, { once = false, amount = 0.1 } = {}) => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref?.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: amount }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, once, amount])

  return inView
}

export const useScroll = () => {
  return { scrollYProgress: 0 }
}

export const useMotionValue = (initialValue = 0) => {
  return useMemo(() => {
    let current = initialValue
    return {
      get: () => current,
      set: (next) => {
        current = next
      },
    }
  }, [initialValue])
}

export const useTransform = (inputValue, inputRange = [0, 1], outputRange = [0, 1]) => {
  const input = readMotionValue(inputValue)
  const [inStart, inEnd] = inputRange
  const [outStart, outEnd] = outputRange
  const safeDenominator = inEnd - inStart || 1
  const progress = Math.min(Math.max((input - inStart) / safeDenominator, 0), 1)
  return outStart + (outEnd - outStart) * progress
}
