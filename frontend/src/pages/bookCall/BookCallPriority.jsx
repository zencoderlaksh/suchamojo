import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from '../../lib/motion'
import { FiArrowRight, FiCheckCircle, FiClock, FiShield } from 'react-icons/fi'

const BOOKING_EMBED_URL =
  'https://calendly.com/your-handle/brand-call?hide_event_type_details=1&hide_gdpr_banner=1'

const TRUST_SIGNALS = [
  {
    icon: FiClock,
    title: 'Fast, focused conversation',
    body: 'A short strategy call to understand your brand goals, current blockers, and what kind of support actually fits.',
  },
  {
    icon: FiCheckCircle,
    title: 'Clarity before commitment',
    body: 'You will leave knowing whether this is the right next move, even if the answer is not an immediate engagement.',
  },
  {
    icon: FiShield,
    title: 'No hard-sell energy',
    body: 'This page is intentionally simple so the conversation can stay centered on fit, trust, and useful next steps.',
  },
]

const BookCallPriority = () => {
  return (
    <div className="relative overflow-hidden bg-[#f7f1e8] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(218,119,72,0.28),_transparent_42%),radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.88),_transparent_28%),linear-gradient(180deg,_#f8efe3_0%,_#f7f1e8_62%,_#f3ede5_100%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-32 h-64 w-64 rounded-full bg-[#d16c42]/14 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[-4rem] h-72 w-72 rounded-full bg-[#203a32]/10 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-body text-[0.72rem] uppercase tracking-[0.34em] text-[#b45833]">
            Priority Booking Page
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[4.8rem]">
            Let&apos;s Talk About Your Brand
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-7 text-slate-600 sm:text-base">
            If you are ready to sharpen your positioning, visibility, or personal brand story,
            this is the direct path to a focused conversation about fit, priorities, and next
            steps.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 w-full max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_30px_120px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-4">
            <div className="rounded-[1.5rem] border border-[#eadfce] bg-[#fbf8f2] p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-[#eadfce] bg-white/90 px-4 py-3">
                <div>
                  <p className="font-heading text-lg text-slate-900">Book your brand clarity call</p>
                  <p className="font-body text-sm text-slate-500">
                    Choose a time that works for you and we&apos;ll take it from there.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-body text-[0.68rem] uppercase tracking-[0.2em] text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:text-slate-950"
                >
                  Need email instead
                  <FiArrowRight className="text-sm" />
                </Link>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white">
                <iframe
                  title="Book a call"
                  src={BOOKING_EMBED_URL}
                  className="h-[720px] w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid w-full max-w-5xl gap-4 lg:grid-cols-3"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: 'easeOut' }}
        >
          {TRUST_SIGNALS.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-[1.75rem] border border-white/70 bg-white/72 p-6 shadow-[0_16px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#203a32] text-white">
                <Icon className="text-lg" />
              </div>
              <h2 className="mt-4 font-heading text-xl text-slate-900">{title}</h2>
              <p className="mt-3 font-body text-sm leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default BookCallPriority
