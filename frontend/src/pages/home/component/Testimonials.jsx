import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaStar } from 'react-icons/fa6'
import { motion as Motion, useInView } from '../../../lib/motion'

const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Founder & CEO',
    industry: 'Venture-backed startup',
    quote:
      'The brand became sharper, clearer, and far more aligned with the kind of company we were actually building.',
    rating: 5,
    tone: 'from-cyan-200/22 via-cyan-100/8 to-transparent',
  },
  {
    name: 'Nisha Kapoor',
    role: 'Financial Advisor',
    industry: 'Wealth management',
    quote:
      'What changed most was trust. People started understanding my voice, my expertise, and why my approach was different.',
    rating: 5,
    tone: 'from-orange-200/22 via-orange-100/8 to-transparent',
  },
  {
    name: 'Dr. Rohan Sethi',
    role: 'Consultant Doctor',
    industry: 'Healthcare',
    quote:
      'The process helped me communicate with far more confidence online without losing the professionalism my field demands.',
    rating: 5,
    tone: 'from-white/22 via-white/8 to-transparent',
  },
]

const TestimonialCard = ({ item, featured = false }) => (
  <article
    className={`group relative shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-6 ${
      featured ? 'w-[320px] sm:w-[360px] lg:w-[400px]' : 'w-[290px] sm:w-[320px] lg:w-[360px]'
    }`}
  >
    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.tone} opacity-80`} />
    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/8 blur-3xl transition duration-500 group-hover:scale-110" />

    <div className="relative z-10 flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-heading text-xl uppercase tracking-[0.06em] text-white">{item.name}</p>
          <p className="mt-2 font-body text-[0.7rem] uppercase tracking-[0.18em] text-gray-400">
            {item.role} . {item.industry}
          </p>
        </div>
        {featured ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-black/25 text-white backdrop-blur-md">
            <FaPlay className="ml-0.5 text-sm" />
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex gap-1.5 text-[0.82rem] text-[#ffcc68]">
        {Array.from({ length: item.rating }).map((_, index) => (
          <FaStar key={`${item.name}-${index}`} />
        ))}
      </div>

      <p className="mt-5 font-body text-sm leading-relaxed text-gray-300 sm:text-[0.95rem]">&ldquo;{item.quote}&rdquo;</p>

      {featured ? (
        <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[0.66rem] uppercase tracking-[0.18em] text-gray-200">
          <FaPlay className="text-[0.6rem]" />
          Video testimonial
        </div>
      ) : null}
    </div>
  </article>
)

const Testimonials = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [width, setWidth] = useState(0)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const marqueeItems = [...testimonials, ...testimonials]

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2)
    }
  }, [])

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-12 w-full max-w-[1240px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_70px_rgba(0,0,0,0.58)] sm:px-8 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_10%_0%,rgba(255,255,255,0.08),transparent_46%),radial-gradient(60%_45%_at_90%_18%,rgba(34,211,238,0.08),transparent_48%),radial-gradient(55%_45%_at_50%_100%,rgba(249,115,22,0.08),transparent_52%)]" />
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
                Testimonials
              </Motion.p>
              <Motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
                className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-[2.8rem]"
              >
                Trusted By People Building Real Authority
              </Motion.h2>
            </div>

            <Motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
              className="max-w-2xl font-body text-sm leading-relaxed text-gray-300 sm:text-base lg:justify-self-end"
            >
              A moving wall of proof, built with the same infinite-scroll behavior already used above, plus a
              featured video-style testimonial card to give the section more energy.
            </Motion.p>
          </div>

          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-[#0b0b0f] to-transparent md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-[#0b0b0f] to-transparent md:block" />

            <div className="md:hidden overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-4 snap-x snap-mandatory">
                {testimonials.map((item, index) => (
                  <div key={item.name} className="snap-start">
                    <TestimonialCard item={item} featured={index === 0} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden overflow-hidden md:block">
              <div
                className="flex gap-4"
                style={{
                  animation: width ? `testimonialScroll ${width / 38}s linear infinite` : 'none',
                }}
              >
                <div ref={trackRef} className="flex gap-4 pr-4">
                  {marqueeItems.map((item, index) => (
                    <TestimonialCard key={`${item.name}-${index}`} item={item} featured={index % testimonials.length === 0} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes testimonialScroll {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(-${width}px,0,0); }
        }
      `}</style>
    </Motion.section>
  )
}

export default Testimonials
