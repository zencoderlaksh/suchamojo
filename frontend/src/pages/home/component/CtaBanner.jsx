import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { motion as Motion, useInView } from '../../../lib/motion'
import { useAppStore } from '../../../store/useAppStore'

const CtaBanner = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })
  const trackEvent = useAppStore((state) => state.trackEvent)
  const cta = useAppStore((state) => state.settings.cta)

  if (!cta.enabled) return null

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-12 w-full max-w-[1240px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.6rem] border border-[#ffb26f]/18 bg-[#0d0d0d] px-6 py-10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] sm:px-8 sm:py-12 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_85%_at_0%_0%,rgba(255,92,53,0.26),transparent_40%),radial-gradient(60%_70%_at_100%_0%,rgba(255,190,110,0.18),transparent_40%),linear-gradient(135deg,rgba(255,92,53,0.08),rgba(255,255,255,0.02))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] opacity-70" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <Motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="font-body text-[0.72rem] uppercase tracking-[0.24em] text-orange-100/75"
            >
              CTA Banner
            </Motion.p>
            <Motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
              className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-[3rem]"
            >
              Ready To Build A Brand That Opens Doors?
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
              className="mt-5 max-w-[46ch] font-body text-sm leading-relaxed text-orange-50/85 sm:text-base"
            >
              {cta.body}
            </Motion.p>
          </div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
          >
            <Link
              to={cta.link || '/book-a-call'}
              onClick={() =>
                trackEvent('schedule_free_consultation_click', { source_page: 'homepage_cta_banner' })
              }
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff5c35] px-6 py-3 font-body text-[0.74rem] uppercase tracking-[0.2em] text-white shadow-[0_18px_34px_rgba(255,92,53,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff704f]"
            >
              {cta.label || 'Book Your Free Call'}
              <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
            </Link>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  )
}

export default CtaBanner
