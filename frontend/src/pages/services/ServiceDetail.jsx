import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from '../../lib/motion'
import { FiArrowRight, FiCheck, FiMessageSquare, FiStar } from 'react-icons/fi'
import { serviceDetails, serviceLinks } from '../../data/siteStructure'

const ServiceDetail = () => {
  const { slug } = useParams()
  const detail = serviceDetails[slug]
  const relatedServices = serviceLinks.filter((service) => service.slug !== slug)

  if (!detail) {
    return <Navigate to="/services" replace />
  }

  return (
    <div className="relative overflow-hidden bg-[#f7f3ec] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(196,111,69,0.24),_transparent_38%),linear-gradient(180deg,_#f8efe5_0%,_#f7f3ec_58%,_#f3efe8_100%)]" />
      <div className="pointer-events-none absolute right-[-6rem] top-32 h-72 w-72 rounded-full bg-[#20463a]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-4rem] top-[34rem] h-64 w-64 rounded-full bg-[#d88e68]/12 blur-3xl" />

      <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-8 rounded-[2rem] border border-white/60 bg-white/72 p-7 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[1.3fr_0.7fr] lg:p-10"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div>
            <p className="font-body text-[0.72rem] uppercase tracking-[0.32em] text-[#b25a37]">
              {detail.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[4.25rem]">
              {detail.title}
            </h1>
            <p className="mt-5 max-w-2xl font-body text-base leading-8 text-slate-600">
              {detail.valueProp}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book-a-call"
                className="inline-flex items-center gap-2 rounded-full bg-[#203a32] px-6 py-3 font-body text-[0.7rem] uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#152923]"
              >
                Book a Call
                <FiArrowRight className="text-sm" />
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 font-body text-[0.7rem] uppercase tracking-[0.2em] text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:text-slate-950"
              >
                See All Services
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[#eadfce] bg-[#fbf8f2] p-6">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.28em] text-slate-500">
              Quick Snapshot
            </p>
            <p className="mt-4 font-heading text-2xl leading-tight text-slate-900">{detail.visual.title}</p>
            <div className="mt-6 space-y-3">
              {detail.visual.points.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#b25a37]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </aside>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {detail.points.map((point) => (
            <div
              key={point}
              className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5 text-sm leading-7 text-slate-700 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
            >
              {point}
            </div>
          ))}
        </div>

        <div className="mt-20 space-y-20">
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">What It Is</p>
              <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">
                Strategic support built for clear decisions and stronger brand signal.
              </h2>
              <div className="mt-6 space-y-5 font-body text-base leading-8 text-slate-600">
                {detail.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadfce] bg-[#203a32] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
              <p className="font-body text-[0.68rem] uppercase tracking-[0.3em] text-white/60">{detail.visual.label}</p>
              <h3 className="mt-5 font-heading text-3xl leading-tight">{detail.fit}</h3>
              <div className="mt-8 space-y-4">
                {detail.audience.map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-white/12 bg-white/6 px-4 py-4 text-sm leading-7 text-white/78">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">What You Get</p>
            <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">Clear deliverables, not vague support.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {detail.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[1.5rem] border border-white/60 bg-white/75 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f4e1d7] text-[#b25a37]">
                    <FiCheck className="text-lg" />
                  </div>
                  <p className="font-body text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">Who It&apos;s For</p>
            <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">Designed for the people and teams this service helps most.</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {detail.audience.map((item) => (
                <article
                  key={item}
                  className="rounded-[1.75rem] border border-white/60 bg-white/70 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]"
                >
                  <p className="font-body text-[0.68rem] uppercase tracking-[0.26em] text-slate-400">Ideal fit</p>
                  <h3 className="mt-4 font-heading text-2xl leading-tight text-slate-900">{item}</h3>
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">Process</p>
            <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">A simple three-step path to momentum.</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {detail.process.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.75rem] border border-[#eadfce] bg-[#fbf8f2] p-6"
                >
                  <p className="font-body text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Step {index + 1}</p>
                  <h3 className="mt-4 font-heading text-2xl text-slate-900">{step.title}</h3>
                  <p className="mt-4 font-body text-sm leading-7 text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">Results / Social Proof</p>
            <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">What people say after the work gets clearer.</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {detail.testimonials.map((item) => (
                <article
                  key={item.quote}
                  className="rounded-[1.9rem] border border-white/60 bg-white/75 p-7 shadow-[0_16px_50px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-center gap-2 text-[#b25a37]">
                    <FiStar />
                    <FiStar />
                    <FiStar />
                  </div>
                  <p className="mt-5 font-heading text-2xl leading-tight text-slate-900">&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-6 font-body text-sm uppercase tracking-[0.24em] text-slate-500">{item.author}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">FAQ</p>
              <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">A few questions people usually ask before booking.</h2>
              <div className="mt-8 space-y-4">
                {detail.faqs.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.5rem] border border-white/60 bg-white/75 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f4e1d7] text-[#b25a37]">
                        <FiMessageSquare className="text-lg" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl text-slate-900">{item.question}</h3>
                        <p className="mt-3 font-body text-sm leading-7 text-slate-600">{item.answer}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#eadfce] bg-[#fbf8f2] p-8 lg:sticky lg:top-28 lg:self-start">
              <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">Related Services</p>
              <div className="mt-6 space-y-4">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={service.path}
                    className="block rounded-[1.4rem] border border-white bg-white/90 px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
                  >
                    <p className="font-heading text-lg text-slate-900">{service.title}</p>
                    <p className="mt-2 font-body text-sm leading-6 text-slate-600">{service.summary}</p>
                  </Link>
                ))}
              </div>
            </aside>
          </section>

          <section className="rounded-[2.25rem] border border-[#eadfce] bg-[#203a32] px-7 py-10 text-white shadow-[0_24px_90px_rgba(15,23,42,0.16)] sm:px-10">
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-white/60">CTA</p>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-tight sm:text-4xl">
              If this feels like the right service, let&apos;s talk through scope, fit, and next steps.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book-a-call"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-[0.7rem] uppercase tracking-[0.2em] text-slate-900 transition duration-300 hover:-translate-y-0.5"
              >
                Book a Call
                <FiArrowRight className="text-sm" />
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/20 bg-white/8 px-6 py-3 font-body text-[0.7rem] uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/12"
              >
                Contact Instead
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail
