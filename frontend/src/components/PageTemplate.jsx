import React from 'react'
import { Link } from 'react-router-dom'
import { aboutImg, backgroundAlt, timeless } from '../assets/image'

const LinkCard = ({ item }) => (
  <Link
    to={item.path}
    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_45%)] opacity-70" />
    <div className="relative z-10">
      <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-gray-400">Explore</p>
      <h3 className="mt-3 font-heading text-2xl uppercase tracking-[0.08em] text-white">{item.title}</h3>
      <p className="mt-4 max-w-[34ch] font-body text-sm leading-relaxed text-gray-400">{item.summary}</p>
      <span className="mt-6 inline-flex text-xs uppercase tracking-[0.18em] text-gray-200 transition duration-300 group-hover:translate-x-1">
        View Page
      </span>
    </div>
  </Link>
)

const BulletList = ({ items }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {items.map((item) => (
      <div
        key={item}
        className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-5 text-sm leading-relaxed text-gray-300 backdrop-blur-sm"
      >
        {item}
      </div>
    ))}
  </div>
)

const PageTemplate = ({
  eyebrow,
  title,
  intro,
  points = [],
  collectionTitle,
  collectionLinks = [],
  fit,
  ctaTitle = 'Ready to build the right next step?',
  ctaBody = 'If this page matches what you need, the fastest path is to book a call and shape the engagement around your goals.',
  ctaLink = '/book-a-call',
  ctaLabel = 'Book a Call',
  note,
}) => {
  return (
    <div className="bg-[#050505] text-white">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:px-10 sm:py-14 lg:px-14 lg:py-18">
          <img src={backgroundAlt} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_32%)]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-body text-[0.72rem] uppercase tracking-[0.25em] text-gray-300">{eyebrow}</p>
              <h1 className="mt-5 font-heading text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[0.92] tracking-[0.04em] text-white">
                {title}
              </h1>
              <p className="mt-6 max-w-[48ch] font-body text-sm leading-relaxed text-gray-200 sm:text-base">
                {intro}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md sm:p-6">
              <div className="flex items-center gap-4">
                <img src={aboutImg} alt="Suchamojo" className="h-16 w-16 rounded-2xl object-cover" />
                <div>
                  <p className="font-heading text-xl uppercase tracking-[0.1em] text-white">Suchamojo</p>
                  <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-gray-300">
                    Story-led personal branding
                  </p>
                </div>
              </div>
              <p className="mt-5 font-body text-sm leading-relaxed text-gray-200">
                Identity first. Strategy second. Visibility with intent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.45)] sm:p-8">
            <p className="font-body text-[0.72rem] uppercase tracking-[0.22em] text-gray-400">What this page covers</p>
            <h2 className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white">Key Focus</h2>
            <div className="mt-6">
              <BulletList items={points} />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:p-8">
            <img src={timeless} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-black/75" />
            <div className="relative z-10">
              <p className="font-body text-[0.72rem] uppercase tracking-[0.22em] text-gray-400">Best fit</p>
              <h2 className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white">Who It Serves</h2>
              <p className="mt-6 max-w-[38ch] font-body text-sm leading-relaxed text-gray-200 sm:text-base">
                {fit || 'This page is designed for people who want a clearer message, stronger authority, and a more intentional digital presence.'}
              </p>
              {note ? <p className="mt-4 font-body text-sm leading-relaxed text-gray-300">{note}</p> : null}
            </div>
          </div>
        </div>
      </section>

      {collectionLinks.length ? (
        <section className="mx-auto w-full max-w-[1240px] px-4 py-2 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.45)] sm:p-8">
            <p className="font-body text-[0.72rem] uppercase tracking-[0.22em] text-gray-400">Page map</p>
            <h2 className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white">
              {collectionTitle || 'Explore More'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {collectionLinks.map((item) => (
                <LinkCard key={item.path} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:p-8">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.22em] text-gray-400">Next step</p>
          <h2 className="mt-4 font-heading text-3xl uppercase tracking-[0.08em] text-white">{ctaTitle}</h2>
          <p className="mt-4 max-w-[52ch] font-body text-sm leading-relaxed text-gray-200 sm:text-base">{ctaBody}</p>
          <Link
            to={ctaLink}
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-body text-[0.72rem] uppercase tracking-[0.2em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gray-200"
          >
            {ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default PageTemplate
