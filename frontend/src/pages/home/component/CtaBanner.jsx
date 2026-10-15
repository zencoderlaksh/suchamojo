import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { motion as Motion, useInView } from '../../../lib/motion'
import { useAppStore } from '../../../store/useAppStore'

const CtaBanner = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })
  const trackEvent = useAppStore((state) => state.trackEvent)

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-12 w-full max-w-[1400px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.6rem] border border-orange-500/30 bg-[#0d0d0d] px-6 py-10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] sm:px-10 sm:py-14 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_85%_at_0%_0%,rgba(249,115,22,0.26),transparent_40%),radial-gradient(60%_70%_at_100%_0%,rgba(255,190,110,0.18),transparent_40%),linear-gradient(135deg,rgba(249,115,22,0.08),rgba(255,255,255,0.02))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] opacity-70" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">
              NEXT STEPS
            </div>
            <Motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
              className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-[2.8rem] leading-[1.08]"
            >
              You don't need more content. You need content that works for you.
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
              className="mt-4 max-w-2xl font-body text-sm sm:text-base leading-relaxed text-gray-300 font-medium"
            >
              Tell us what you're building, where you're stuck and what kind of support you need. We'll help you figure out the right next step.
            </Motion.p>
          </div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
            className="shrink-0"
          >
            <Link
              to="/book-a-call"
              onClick={() =>
                trackEvent('schedule_free_consultation_click', { source_page: 'homepage_final_cta' })
              }
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#f97316] px-8 py-4 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_34px_rgba(249,115,22,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ea580c] hover:shadow-orange-500/50"
            >
              BOOK YOUR FREE DISCOVERY CALL
              <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
            </Link>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  )
}

export default CtaBanner
