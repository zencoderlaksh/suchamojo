import React, { useEffect, useRef, useState } from 'react'
import { motion as Motion, useInView, useScroll, useTransform } from '../../../lib/motion'

const PARTICLES = [
  { left: '10%', top: '20%', delay: 0.2, duration: 5.4 },
  { left: '25%', top: '70%', delay: 1.0, duration: 6.0 },
  { left: '45%', top: '38%', delay: 0.6, duration: 5.7 },
  { left: '60%', top: '15%', delay: 1.5, duration: 6.3 },
  { left: '73%', top: '65%', delay: 0.8, duration: 5.9 },
  { left: '88%', top: '32%', delay: 1.8, duration: 6.5 },
]

const CountUp = ({
  start = 0,
  end = 0,
  duration = 1.5,
  delay = 0,
  useEasing = true,
  onStart,
  onEnd,
}) => {
  const [value, setValue] = useState(start)
  const onStartRef = useRef(onStart)
  const onEndRef = useRef(onEnd)

  useEffect(() => {
    onStartRef.current = onStart
    onEndRef.current = onEnd
  }, [onStart, onEnd])

  useEffect(() => {
    let rafId
    let timeoutId

    const easeOutCubic = (t) => 1 - (1 - t) ** 3
    const ease = useEasing ? easeOutCubic : (t) => t

    timeoutId = setTimeout(() => {
      onStartRef.current?.()
      const startedAt = performance.now()

      const tick = (now) => {
        const elapsed = (now - startedAt) / 1000
        const progress = Math.min(elapsed / duration, 1)
        const current = start + (end - start) * ease(progress)
        setValue(current)

        if (progress < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          setValue(end)
          onEndRef.current?.()
        }
      }

      rafId = requestAnimationFrame(tick)
    }, Math.max(0, delay) * 1000)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [start, end, duration, delay, useEasing])

  return <>{Math.round(value)}</>
}

const MilestoneItem = ({ value, suffix = '+', label, delay = 0, inView }) => {
  const [isCounting, setIsCounting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  return (
    <Motion.div
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.025, transition: { duration: 0.28 } }}
      className="group relative w-full rounded-3xl border border-white/10 bg-white/[0.025] px-4 py-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:px-5 sm:py-8"
    >
      <div className="relative mx-auto flex w-fit items-end justify-center leading-none">
        <Motion.div
          animate={{ opacity: inView ? 1 : 0.7, scale: isComplete ? [1, 1.05, 1] : 1 }}
          transition={{ duration: isComplete ? 0.4 : 0.3, ease: 'easeOut' }}
          className="relative flex items-baseline"
        >
          <span className="bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text font-heading font-normal tracking-tight text-transparent text-4xl sm:text-5xl lg:text-6xl">
            <CountUp
              start={0}
              end={inView ? value : 0}
              duration={1.5}
              delay={delay + 0.1}
              useEasing
              onStart={() => { setIsCounting(true); setIsComplete(false) }}
              onEnd={() => { setIsCounting(false); setIsComplete(true) }}
            />
          </span>

          {/* Plus */}
          {suffix ? (
            <span className="ml-1 whitespace-nowrap font-heading font-normal text-white/50 text-xl sm:text-2xl lg:text-3xl">
              {suffix}
            </span>
          ) : null}
        </Motion.div>
      </div>

      <p className={`mx-auto mt-3 max-w-[16ch] font-body text-sm leading-relaxed transition-colors duration-300 sm:text-[0.95rem] ${isCounting ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
        }`}>
        {label}
      </p>
    </Motion.div>
  )
}

const MilestonesSection = ({ split = false }) => {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const inView = useInView(panelRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -20])
  const milestones = [
    {
      value: 30000,
      suffix: '+',
      label: 'Creators trained across India',
    },
    {
      value: 12,
      suffix: '+ Years',
      label: 'At the intersection of story and growth',
    },
    {
      value: 8,
      suffix: '+',
      label: 'Industries served',
    },
    {
      value: 100,
      suffix: '+',
      label: 'Brand strategy sessions led',
    },
  ]

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${split ? 'w-full h-full' : 'mx-auto mt-12 w-full max-w-[1240px] px-4 sm:px-6 lg:px-8'} font-body`}
    >
      <Motion.div style={{ y: split ? 0 : parallaxY }} className={split ? 'h-full' : 'relative'}>
        <Motion.div
          ref={panelRef}
          whileHover={{ y: -3, scale: 1.002 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0f] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_70px_rgba(0,0,0,0.6)] sm:rounded-[40px] ${split ? 'h-full' : ''}`}
        >
          <div className={`relative overflow-hidden rounded-[32px] px-5 py-10 sm:rounded-[40px] sm:px-8 sm:py-12 ${split ? 'h-full flex flex-col' : ''}`}>
            {/* Radial glow */}
            <Motion.div
              animate={{ opacity: inView ? 0.18 : 0.07 }}
              transition={{ duration: 0.7 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(103,232,249,0.22),rgba(168,85,247,0.14)_32%,transparent_68%)]"
            />
            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_46%,rgba(0,0,0,0.5)_100%)]" />
            {/* Dot grid noise */}
            <Motion.div
              animate={{ backgroundPosition: ['0% 0%', '20% 22%', '0% 0%'] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:3px_3px]"
            />
            {/* Shimmer beam */}
            <Motion.div
              animate={{ x: ['-30%', '130%'] }}
              transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
              className="pointer-events-none absolute top-[42%] h-20 w-48 bg-gradient-to-r from-transparent via-cyan-100/10 to-transparent blur-2xl"
            />

            {/* Floating particles */}
            {PARTICLES.map((dot) => (
              <Motion.span
                key={`${dot.left}-${dot.top}`}
                animate={{ y: [0, -7, 0], opacity: [0.08, 0.26, 0.08] }}
                transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
                style={{ left: dot.left, top: dot.top }}
                className="pointer-events-none absolute h-[3px] w-[3px] rounded-full bg-white/25"
              />
            ))}

            <div className={`relative z-10 flex flex-col items-center ${split ? 'flex-1 justify-center gap-8' : 'gap-8 sm:gap-10'}`}>
              <Motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative font-heading font-normal uppercase tracking-[0.18em] text-white [text-shadow:0_0_18px_rgba(255,255,255,0.12)] text-2xl sm:text-3xl lg:text-[1.9rem] xl:text-[2.15rem]"
              >
                MILESTONES
                <Motion.span
                  animate={{ opacity: [0, 0.2, 0], y: [0, 1, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 4 }}
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </Motion.h2>

              <div className="grid w-full gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                {milestones.map((milestone, index) => (
                  <MilestoneItem
                    key={`${milestone.value}-${milestone.label || index}`}
                    value={milestone.value}
                    suffix={milestone.suffix}
                    label={milestone.label}
                    delay={index * 0.1}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </Motion.section>
  )
}

export default MilestonesSection
