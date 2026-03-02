import { motion as Motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-140, 140], [18, -18])
  const rotateY = useTransform(x, [-140, 140], [-18, 18])

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    }
  }

  if (disableDrag) {
    return (
      <Motion.div
        className="absolute h-full w-full cursor-pointer [transform-style:preserve-3d]"
        style={{ x: 0, y: 0 }}
      >
        {children}
      </Motion.div>
    )
  }

  return (
    <Motion.div
      className="absolute h-full w-full cursor-grab [transform-style:preserve-3d]"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.22}
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 220, bounceDamping: 28, power: 0.2, timeConstant: 220 }}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </Motion.div>
  )
}

export default function Stack({
  randomRotation = false,
  sensitivity = 140,
  cards = [],
  animationConfig = { stiffness: 145, damping: 24, mass: 1.05 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mobileBreakpoint])

  const shouldDisableDrag = mobileClickOnly && isMobile
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag

  const [stack, setStack] = useState(() => cards.map((content, index) => ({ id: index + 1, content })))

  const sendToBack = (id) => {
    setStack((prev) => {
      const newStack = [...prev]
      const index = newStack.findIndex((card) => card.id === id)
      if (index < 0) return prev
      const [card] = newStack.splice(index, 1)
      newStack.unshift(card)
      return newStack
    })
  }

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id
        sendToBack(topCardId)
      }, autoplayDelay)
      return () => clearInterval(interval)
    }
    return undefined
  }, [autoplay, autoplayDelay, stack, isPaused])

  return (
    <div
      className="relative h-full w-full [perspective:900px] [transform-style:preserve-3d]"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const deterministicRotate = randomRotation ? ((card.id * 37) % 11) - 5 : 0
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <Motion.div
              className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl [will-change:transform]"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + deterministicRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
                mass: animationConfig.mass,
                restSpeed: 0.25,
                restDelta: 0.001,
              }}
            >
              {card.content}
            </Motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
}
