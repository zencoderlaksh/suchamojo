import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion, useInView } from '../../../lib/motion'

const industryCards = [
  {
    title: 'Founders & CEOs',
    description: "Your brand is your company's first impression. Build a founder identity that attracts talent, trust, and investment.",
    to: '/industries/founders',
  },
  {
    title: 'Doctors & Healthcare Professionals',
    description: 'Patients choose the doctor they trust. Build a digital presence that reflects your expertise and bedside manner.',
    to: '/industries/doctors',
  },
  {
    title: 'Financial Advisors and Mutual Fund Distributors',
    description: 'Trust is your product. A strong personal brand positions you as the advisor clients seek out, not the one they compare.',
    to: '/industries/mutual-fund-distributors',
  },
  {
    title: 'Corporate Leaders & Executives',
    description: 'Your personal brand opens boardroom doors. Build the kind of presence that gets you invited into rooms before you even ask.',
    to: '/industries/corporate-leaders',
  },
  {
    title: 'D2C Founders & Brand Builders',
    description: 'Your product has a story. So do you. Build a founder brand that makes people buy into you before they even buy what you sell.',
    to: '/industries/founders',
  },
  {
    title: 'Freelancers & Independent Consultants',
    description: 'You are the product. A strong personal brand means clients find you, trust you faster, and stop asking for discounts.',
    to: '/about',
  },
  {
    title: 'Coaches & Educators',
    description: 'You teach people how to change. Your brand should show them you have done it yourself. Build a presence that converts belief into enrollment.',
    to: '/about',
  },
  {
    title: 'Real Estate Professionals',
    description: 'In a market built on relationships, the agent people remember is the one they call. Build a brand that keeps you top of mind long after the first meeting.',
    to: '/about',
  },
  {
    title: 'Content Creators & Influencers',
    description: 'Followers are not a brand. A brand is what people say about you when the algorithm stops pushing your content. Build something that lasts.',
    to: '/blog',
  },
  {
    title: 'Startup Teams & Early-Stage Companies',
    description: "Your team is already telling your company's story online. The question is whether they are telling it well and together.",
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
              Your personal brand is not just a LinkedIn profile. It is a business asset. And the
              way you build it depends entirely on your industry, your audience, and what you are
              trying to achieve. We have built brand systems for people across very different fields
              and we know the specific pressures, audiences, and opportunities each one carries.
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
