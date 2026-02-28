import React from 'react'
import * as Motion from 'framer-motion'
import ct1 from '../../../assets/image/ct-1.svg'
import ct2 from '../../../assets/image/ct-2.svg'
import ct3 from '../../../assets/image/ct-3.svg'
import ct4 from '../../../assets/image/ct-4.svg'
import ct5 from '../../../assets/image/ct-5.svg'
import ct6 from '../../../assets/image/ct-6.svg'
import ct7 from '../../../assets/image/ct-7.svg'

const clients = [
  { name: 'Client 1', logo: ct1 },
  { name: 'Client 2', logo: ct2 },
  { name: 'Client 3', logo: ct3 },
  { name: 'Client 4', logo: ct4 },
  { name: 'Client 5', logo: ct5 },
  { name: 'Client 6', logo: ct6 },
  { name: 'Client 7', logo: ct7 },
]

const containerMotion = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
}

const cardMotion = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const Clients = () => {
  return (
    <Motion.motion.section
      id="clients"
      className="relative mx-auto mt-12 w-full max-w-[1240px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_26px_60px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10"
      variants={containerMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(56,189,248,0.09),transparent_45%),radial-gradient(130%_100%_at_100%_100%,rgba(148,163,184,0.08),transparent_50%)]" />

      <div className="relative z-10">
        <div className="mb-7 grid gap-4 md:grid-cols-[1fr_360px] md:items-end">
          <h2 className="font-mono text-3xl font-semibold uppercase tracking-[0.32em] text-white sm:text-4xl">
            CLIENTS
          </h2>
          <p className="max-w-[38ch] text-sm leading-relaxed text-slate-400 md:justify-self-end">
            Collaborations built around clarity, growth, and sharp positioning. Trusted by teams and
            founders across evolving digital categories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {clients.map((client) => (
            <Motion.motion.article
              key={client.name}
              variants={cardMotion}
              whileHover={{ y: -6, rotate: -0.6 }}
              className="group flex min-h-[170px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 ease-in-out hover:border-cyan-300/40 hover:bg-white/[0.07] hover:shadow-[0_0_26px_rgba(56,189,248,0.16),0_18px_30px_rgba(0,0,0,0.5)]"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-11 w-auto opacity-60 grayscale brightness-[2.2] transition duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-100"
              />
            </Motion.motion.article>
          ))}
        </div>
      </div>
    </Motion.motion.section>
  )
}

export default Clients
