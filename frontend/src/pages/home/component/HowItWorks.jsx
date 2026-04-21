import React, { useRef } from 'react'
import { motion as Motion, useInView } from '../../../lib/motion'

const steps = [
  {
    id: '01',
    title: 'We Find Your Angle',
    description:
      'One clear story. One clear audience. One reason people should follow you and not the thousand others in your space.',
  },
  {
    id: '02',
    title: 'We Build Your Content Engine',
    description:
      'Your formats, your posting rhythm, your signature style. A system so simple you can run it in an hour a day.',
  },
  {
    id: '03',
    title: 'We Help You Stay Consistent',
    description:
      'Accountability, feedback, and direction every week. So you never stare at a blank screen wondering what to post again.',
  },
]

const HowItWorks = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <Motion.section
      id="how-it-works"
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-12 w-full max-w-[1240px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_70px_rgba(0,0,0,0.58)] sm:px-8 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_0%,rgba(255,255,255,0.08),transparent_48%),radial-gradient(60%_50%_at_85%_20%,rgba(103,232,249,0.08),transparent_50%),radial-gradient(55%_40%_at_50%_100%,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10">
          <div className="max-w-3xl">
            <Motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="font-body text-[0.72rem] uppercase tracking-[0.24em] text-gray-400"
            >
              How It Works
            </Motion.p>
            <Motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
              className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-[2.8rem]"
            >
              3 Steps To A Brand That Works For You
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
              className="mt-5 max-w-3xl font-body text-base leading-relaxed text-gray-300 sm:text-lg"
            >
              When content feels fun, you post more. When you post more, people notice. We start with the fun part.
            </Motion.p>
          </div>

          <div className="relative mt-8 grid gap-4 lg:grid-cols-3">
            <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />

            {steps.map((step, index) => (
              <Motion.article
                key={step.id}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_40%)] opacity-75" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-200/10 blur-3xl transition duration-500 group-hover:scale-110" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-heading text-lg tracking-[0.12em] text-white">
                      {step.id}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent lg:hidden" />
                  </div>

                  <h3 className="mt-6 font-heading text-[1.6rem] uppercase tracking-[0.05em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[32ch] font-body text-sm leading-relaxed text-gray-400 sm:text-[0.95rem]">
                    {step.description}
                  </p>

                  <div className="mt-6 h-px w-20 bg-gradient-to-r from-cyan-100/45 to-transparent transition duration-300 group-hover:w-28" />
                </div>
              </Motion.article>
            ))}
          </div>
        </div>
      </div>
    </Motion.section>
  )
}

export default HowItWorks
