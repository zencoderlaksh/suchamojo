import React, { useEffect, useState } from 'react'
import { motion as Motion, useInView } from '../../../lib/motion'
import { useRef } from 'react'
import s1 from '../../../assets/image/s-1.jpg'
import s2 from '../../../assets/image/s-2.jpg'
import s3 from '../../../assets/image/s-3.jpg'
import s4 from '../../../assets/image/s-4.jpg'
import s5 from '../../../assets/image/s-5.jpg'
import s6 from '../../../assets/image/s-6.jpg'
import s7 from '../../../assets/image/s-7.jpg'
import s8 from '../../../assets/image/s-8.jpg'
import s9 from '../../../assets/image/s-9.jpg'

const serviceCards = [
  { id: 0, image: s1, alt: 'Service visual 1' },
  { id: 1, image: s2, alt: 'Service visual 2' },
  { id: 2, image: s3, alt: 'Service visual 3' },
  { id: 3, image: s4, alt: 'Service visual 4' },
  { id: 4, image: s5, alt: 'Service visual 5' },
  { id: 5, image: s6, alt: 'Service visual 6' },
  { id: 6, image: s7, alt: 'Service visual 7' },
  { id: 7, image: s8, alt: 'Service visual 8' },
  { id: 8, image: s9, alt: 'Service visual 9' },
]

const getRelativePosition = (index, activeIndex, total) => {
  let diff = index - activeIndex
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

const getCardTransform = (relative) => {
  if (relative === 0)
    return { transform: 'translateX(0%) translateY(0px) scale(1)', opacity: 1, zIndex: 30 }
  if (relative === -1)
    return { transform: 'translateX(-72%) translateY(12px) rotate(-7deg) scale(0.87)', opacity: 1, zIndex: 20 }
  if (relative === 1)
    return { transform: 'translateX(72%) translateY(12px) rotate(7deg) scale(0.87)', opacity: 1, zIndex: 20 }
  const dir = relative < 0 ? -1 : 1
  return { transform: `translateX(${dir * 130}%) scale(0.78)`, opacity: 0, zIndex: 10 }
}

const ServicesSection = ({ split = false }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  useEffect(() => {
    if (isPaused) return undefined
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % serviceCards.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [isPaused])

  const currentStepLabel = `${String(activeIndex + 1).padStart(2, '0')} Strategy`

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={split ? 'w-full h-full' : 'mx-auto mt-12 w-full max-w-[1240px] px-4 sm:px-6 lg:px-8'}
    >
      <div className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0f] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_70px_rgba(0,0,0,0.6)] sm:rounded-[40px] sm:px-8 sm:py-12 ${split ? 'h-full flex flex-col' : ''}`}>
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_75%_at_50%_0%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(80%_60%_at_8%_100%,rgba(34,211,238,0.07),transparent_55%)]" />
        {/* Noise */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')] [background-size:180px]" />

        <div className={`relative z-10 flex flex-col items-center text-center ${split ? 'flex-1 justify-between gap-6' : 'gap-7 sm:gap-9'}`}>
          {/* Heading */}
          <Motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="font-pixel font-normal uppercase tracking-[0.2em] text-white [text-shadow:0_0_18px_rgba(255,255,255,0.14)] text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.25rem]"
          >
            SERVICES
          </Motion.h2>

          {/* Image stack */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            className="w-full [perspective:1400px] [transform-style:preserve-3d]"
          >
            {/* Desktop / tablet stack (shown md+) */}
            <div
              className="mx-auto hidden h-[240px] w-full max-w-[380px] items-center justify-center md:flex lg:h-[270px] lg:max-w-[420px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {serviceCards.map((card, index) => {
                const relative = getRelativePosition(index, activeIndex, serviceCards.length)
                const cardStyle = getCardTransform(relative)
                const isVisible = Math.abs(relative) <= 1
                return (
                  <article
                    key={card.id}
                    style={cardStyle}
                    onClick={() => setActiveIndex(index)}
                    className={`absolute overflow-hidden rounded-2xl shadow-[0_20px_44px_rgba(0,0,0,0.55)] [transform-style:preserve-3d] transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-[165px] lg:w-[195px] ${isVisible ? 'cursor-pointer hover:shadow-[0_28px_56px_rgba(0,0,0,0.65)]' : 'pointer-events-none'
                      }`}
                  >
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="pointer-events-none block h-[155px] w-full select-none object-cover transition-transform duration-500 hover:scale-105 lg:h-[175px]"
                      draggable={false}
                    />
                  </article>
                )
              })}
            </div>

            {/* Mobile: single active card */}
            <div className="flex justify-center md:hidden">
              <article className="w-full max-w-[320px] overflow-hidden rounded-2xl shadow-[0_18px_36px_rgba(0,0,0,0.5)] sm:max-w-[380px]">
                <img
                  src={serviceCards[activeIndex].image}
                  alt={serviceCards[activeIndex].alt}
                  className="h-[200px] w-full object-cover sm:h-[240px]"
                />
              </article>
            </div>
          </Motion.div>

          {/* Badge + description */}
          <div className="flex flex-col items-center gap-3">
            <Motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
              className="inline-flex items-center rounded-full bg-gray-200/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-gray-800"
            >
              {currentStepLabel}
            </Motion.span>

            <Motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.38, ease: 'easeOut' }}
              className="max-w-[440px] text-sm leading-relaxed text-gray-400 sm:text-base"
            >
              We map your positioning, narrative, and content system into a sharp brand strategy that
              feels coherent, premium, and built for long-term visibility.
            </Motion.p>
          </div>
        </div>
      </div>
    </Motion.section>
  )
}

export default ServicesSection
