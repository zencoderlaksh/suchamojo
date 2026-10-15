import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const ways = [
  {
    id: "01",
    title: "PERSONAL BRANDING",
    hook: "Be known for what you actually know.",
    description:
      "We help founders, professionals and leaders uncover their point of view, sharpen positioning and turn experience into a meaningful content presence. From content pillars and storytelling formats to LinkedIn, Instagram and YouTube direction.",
    bestFor: "Founders, CEOs, doctors, financial professionals and subject-matter experts.",
    cta: "BUILD MY PERSONAL BRAND",
    to: "/personal-branding",
  },
  {
    id: "02",
    title: "CONTENT STRATEGY",
    hook: "Less random content. More purpose behind every post.",
    description:
      "We build content universes, channel priorities, repeatable formats, editorial calendars and distribution workflows so every asset has a clear job, from awareness and trust to enquiries and community.",
    bestFor: "Businesses with ideas but no connected editorial system.",
    cta: "PLAN MY CONTENT",
    to: "/book-a-call?service=content-strategy",
  },
  {
    id: "03",
    title: "TEAM TRAINING & CAPACITY BUILDING",
    hook: "We've trained 30,000+ people in storytelling and content creation.",
    description:
      "Now we help companies, NGOs and institutions develop their own storytellers, video creators and content teams through practical, hands-on workshops.",
    bestFor: "Corporate teams, marketing departments, NGOs, field workers and institutions.",
    cta: "TRAIN YOUR TEAM",
    to: "/team-training",
  },
  {
    id: "04",
    title: "CREATIVE TALENT",
    hook: "The right people make the system work.",
    description:
      "Need a content strategist, writer, video editor, social media manager or production partner? We help define the role, evaluate creative fit and connect you with suitable talent for your content goals.",
    bestFor: "Growing teams that need specialist creative capacity.",
    cta: "FIND CREATIVE TALENT",
    to: "/book-a-call?service=creative-talent",
  },
];

const Feature = () => {
  return (
    <section id="four-ways" className="relative overflow-hidden px-4 py-16 font-body sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <p className="text-xs font-bold tracking-[0.24em] text-orange-700 uppercase">
              FOUR WAYS WE HELP
            </p>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
            Start where you are. Build what you need.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            One partner with four connected capabilities to scale your personal brand, content machine, and creative team.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ways.map((item, index) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] sm:p-9"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="absolute inset-y-0 left-0 w-1.5 bg-orange-500 opacity-60 transition duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-orange-100/50 blur-3xl transition duration-500 group-hover:scale-125" />

              <div className="relative z-10">
                {/* Badge Number & Title */}
                <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5">
                  <span className="text-xs font-black tracking-[0.15em] text-orange-600">
                    {item.id}
                  </span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span className="text-xs font-bold tracking-widest text-slate-800 uppercase">
                    {item.title}
                  </span>
                </div>

                {/* Subtitle / Hook */}
                <h3 className="font-heading text-xl sm:text-2xl font-black leading-snug text-slate-950">
                  {item.hook}
                </h3>

                {/* Full Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
                  {item.description}
                </p>

                {/* Best For Callout */}
                <div className="mt-6 rounded-2xl border border-slate-200/90 bg-slate-50/90 p-4">
                  <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-orange-700">
                    Best for:
                  </span>
                  <p className="mt-1 text-xs font-semibold text-slate-800 leading-relaxed">
                    {item.bestFor}
                  </p>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="relative z-10 mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-body text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white transition duration-300 group-hover:bg-[#f97316] group-hover:shadow-lg group-hover:shadow-orange-500/25"
                >
                  {item.cta}
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <span className="text-xs font-bold text-slate-300 group-hover:text-slate-400">
                  0{index + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
