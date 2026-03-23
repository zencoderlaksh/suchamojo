import React, { useRef } from 'react'
import { FaCompass, FaLayerGroup, FaPenNib } from 'react-icons/fa6'
import { motion as Motion, useInView } from '../../../lib/motion'

const differentiators = [
  {
    title: 'Industry-Specific Playbooks',
    description:
      'We do not use generic templates. Every brand is built for your specific industry and audience.',
    icon: FaCompass,
    accent: 'from-cyan-200/30 via-cyan-100/12 to-transparent',
  },
  {
    title: 'Story-First Approach',
    description:
      'Before tactics come story. We dig deep into what makes you, you and turn it into a brand.',
    icon: FaPenNib,
    accent: 'from-orange-200/30 via-orange-100/12 to-transparent',
  },
  {
    title: 'End-to-End Support',
    description:
      'From strategy to content to hiring, we handle the full brand-building stack.',
    icon: FaLayerGroup,
    accent: 'from-white/26 via-white/10 to-transparent',
  },
]

const WhySuchaMojo = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-12 w-full max-w-[1240px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_70px_rgba(0,0,0,0.58)] sm:px-8 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_12%_0%,rgba(255,255,255,0.08),transparent_46%),radial-gradient(60%_45%_at_88%_18%,rgba(34,211,238,0.08),transparent_48%),radial-gradient(55%_45%_at_50%_100%,rgba(249,115,22,0.08),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="max-w-xl">
              <Motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="font-body text-[0.72rem] uppercase tracking-[0.24em] text-gray-400"
              >
                Why SuchaMojo
              </Motion.p>
              <Motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
                className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-[2.8rem]"
              >
                Not Just Strategy. Execution.
              </Motion.h2>
            </div>

            <Motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
              className="max-w-2xl font-body text-sm leading-relaxed text-gray-300 sm:text-base lg:justify-self-end"
            >
              The work is designed to move from insight into action. Every engagement is built to feel specific,
              sharp, and actually usable in the real world, not just impressive in a deck.
            </Motion.p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {differentiators.map((item, index) => {
              const Icon = item.icon

              return (
                <Motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.08, ease: 'easeOut' }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-6"
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80`} />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/8 blur-3xl transition duration-500 group-hover:scale-110" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <div className="relative">
                        <span className="pulse-soft absolute inset-0 rounded-2xl bg-white/8 blur-xl" />
                        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12 bg-black/25 text-white backdrop-blur-md">
                          <Icon className="float-slow text-[1.35rem]" />
                        </span>
                      </div>

                      <span className="font-heading text-[2.4rem] leading-none tracking-[0.04em] text-white/18">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-heading text-[1.45rem] uppercase leading-[1.05] tracking-[0.05em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-[30ch] font-body text-sm leading-relaxed text-gray-300 sm:text-[0.95rem]">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 h-px w-24 bg-gradient-to-r from-white/40 to-transparent transition duration-300 group-hover:w-32" />
                  </div>
                </Motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </Motion.section>
  )
}

export default WhySuchaMojo
