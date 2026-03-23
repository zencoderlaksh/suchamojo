import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from '../../lib/motion'
import { FiArrowRight, FiCompass, FiHeart, FiLayers, FiUsers } from 'react-icons/fi'
import { abc1, ab2, ab3 } from '../../assets/image'

const VALUES = [
  {
    icon: FiCompass,
    title: 'Clarity Over Noise',
    body: 'The work is about finding the sharpest truth in your story, not adding more content for the sake of being visible.',
  },
  {
    icon: FiHeart,
    title: 'Identity Before Algorithms',
    body: 'A strong personal brand starts with who you are, what you believe, and how you want to be remembered.',
  },
  {
    icon: FiLayers,
    title: 'Strategy With Depth',
    body: 'Good brand building connects positioning, storytelling, and long-term trust instead of chasing short-term attention.',
  },
  {
    icon: FiUsers,
    title: 'Human-Centered Growth',
    body: 'The goal is a brand presence that feels more honest, more grounded, and more useful to the people it serves.',
  },
]

const TEAM_NOTES = [
  'A lean, senior-led setup built around strategy, storytelling, and execution support.',
  'Collaborative by design, with the founder staying close to the thinking and message quality.',
  'Expanded selectively depending on the kind of engagement, format, and client needs.',
]

const About = () => {
  return (
    <div className="relative overflow-hidden bg-[#f7f2eb] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(198,119,75,0.24),_transparent_38%),linear-gradient(180deg,_#f9efe4_0%,_#f7f2eb_60%,_#f3eee8_100%)]" />
      <div className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-[#1f4035]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-5rem] top-[38rem] h-72 w-72 rounded-full bg-[#d88663]/12 blur-3xl" />

      <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-[2.25rem] border border-white/60 bg-white/72 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10 lg:p-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-body text-[0.72rem] uppercase tracking-[0.32em] text-[#b25a37]">About</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[4.7rem]">
            The Story Behind the Mojo
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base leading-8 text-slate-600">
            Suchamojo was built from a simple belief: people trust what feels clear, human,
            and deeply lived. The brand exists to help founders, experts, and high-agency
            professionals communicate with more intention and become easier to remember for
            the right reasons.
          </p>
        </motion.div>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: 'easeOut' }}
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <img src={abc1} alt="Founder portrait" className="h-[24rem] w-full object-cover" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/70">
                <img src={ab2} alt="Suchamojo working session" className="h-44 w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/70">
                <img src={ab3} alt="Brand storytelling visual" className="h-44 w-full object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-[2rem] border border-[#eadfce] bg-[#fbf8f2] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          >
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">Founder</p>
            <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">A storyteller turned brand strategist.</h2>
            <div className="mt-6 space-y-5 font-body text-base leading-8 text-slate-600">
              <p>
                The work behind Suchamojo began in storytelling. Journalism, observation, and
                real-world human narratives shaped the instinct to listen closely, find what is
                true, and express it in a way that people can actually feel.
              </p>
              <p>
                Over time, that instinct moved into growth strategy, creator ecosystems, and
                personal branding. The common thread stayed the same: helping people articulate
                who they are with more honesty, structure, and conviction.
              </p>
              <p>
                Personal branding matters because it shapes trust before the introduction,
                before the meeting, and before the pitch. When your message sounds more like
                you, your work becomes easier to understand, easier to believe, and harder to
                forget.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="mt-20">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">Mission / Values</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl text-slate-950 sm:text-4xl">
            The principles shaping how Suchamojo builds brands with depth.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-[1.9rem] border border-white/60 bg-white/74 p-7 shadow-[0_16px_60px_rgba(15,23,42,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#203a32] text-white">
                  <Icon className="text-lg" />
                </div>
                <h3 className="mt-5 font-heading text-2xl text-slate-900">{title}</h3>
                <p className="mt-4 font-body text-sm leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-[#eadfce] bg-[#203a32] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-10">
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-white/60">Team</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl">Small by design, thoughtful in execution.</h2>
            <p className="mt-5 max-w-2xl font-body text-base leading-8 text-white/78">
              Suchamojo is not built like a bloated agency. It works more like a close strategic
              studio, keeping the thinking sharp, the message consistent, and the delivery
              aligned with the client&apos;s actual needs.
            </p>
          </div>

          <div className="space-y-4">
            {TEAM_NOTES.map((note) => (
              <div
                key={note}
                className="rounded-[1.6rem] border border-white/60 bg-white/74 p-6 text-sm leading-7 text-slate-600 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
              >
                {note}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2.25rem] border border-[#eadfce] bg-[#fbf8f2] px-7 py-10 shadow-[0_24px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">CTA</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-slate-950 sm:text-4xl">
            If the thinking behind the brand resonates, the next step is a conversation.
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-8 text-slate-600">
            Whether you need sharper positioning, a clearer story, or the right service path,
            we can use a call to figure out what makes the most sense for where you are now.
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
              Explore Services
            </Link>
          </div>
        </section>
      </section>
    </div>
  )
}

export default About
