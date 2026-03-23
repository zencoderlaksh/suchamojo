import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion, useInView } from '../../../lib/motion'

const industryCards = [
  {
    title: 'Founders & CEOs',
    description: 'Narrative systems for builders shaping companies and public trust.',
    to: '/industries/founders',
  },
  {
    title: 'Mutual Fund Distributors',
    description: 'Credibility-led communication for long-term investor confidence.',
    to: '/industries/mutual-fund-distributors',
  },
  {
    title: 'Financial Advisors',
    description: 'Authority-building content for trust-sensitive financial audiences.',
    to: '/industries/financial-advisors',
  },
  {
    title: 'Doctors & Healthcare Professionals',
    description: 'Professional visibility rooted in expertise, ethics, and clarity.',
    to: '/industries/doctors',
  },
  {
    title: 'Lawyers & Legal Professionals',
    description: 'Sharper public positioning for legal experts and advisors.',
    to: '/industries/lawyers',
  },
  {
    title: 'Corporate Leaders & Executives',
    description: 'Executive presence for leaders who need authority beyond the boardroom.',
    to: '/industries/corporate-leaders',
  },
]

const IndustriesServe = () => {
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_8%_0%,rgba(255,255,255,0.09),transparent_48%),radial-gradient(55%_45%_at_88%_15%,rgba(34,211,238,0.08),transparent_50%),radial-gradient(60%_55%_at_50%_100%,rgba(249,115,22,0.08),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-xl">
              <Motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="font-body text-[0.72rem] uppercase tracking-[0.24em] text-gray-400"
              >
                Industries We Serve
              </Motion.p>
              <Motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
                className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-[2.8rem]"
              >
                Built For Every Ambitious Professional
              </Motion.h2>
            </div>

            <Motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
              className="max-w-2xl font-body text-sm leading-relaxed text-gray-300 sm:text-base lg:justify-self-end"
            >
              Whether you&apos;re managing portfolios or building companies, your personal brand is your
              competitive edge. Explore the industries where strategic storytelling can create stronger trust,
              visibility, and authority.
            </Motion.p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industryCards.map((industry, index) => (
              <Motion.div
                key={industry.to}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.06, ease: 'easeOut' }}
              >
                <Link
                  to={industry.to}
                  className="group relative block h-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_42%)] opacity-75" />
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-200/10 blur-3xl transition duration-500 group-hover:scale-110" />

                  <div className="relative z-10 flex h-full flex-col">
                    <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-body text-[0.62rem] uppercase tracking-[0.18em] text-gray-300">
                      Industry
                    </span>
                    <h3 className="mt-4 font-heading text-[1.35rem] uppercase leading-[1.05] tracking-[0.05em] text-white">
                      {industry.title}
                    </h3>
                    <p className="mt-3 max-w-[30ch] font-body text-sm leading-relaxed text-gray-400">
                      {industry.description}
                    </p>
                    <span className="mt-6 inline-flex text-[0.68rem] uppercase tracking-[0.2em] text-gray-200 transition duration-300 group-hover:translate-x-1">
                      Explore Industry
                    </span>
                  </div>
                </Link>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </Motion.section>
  )
}

export default IndustriesServe
