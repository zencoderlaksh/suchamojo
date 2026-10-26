import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useInView } from "../../../lib/motion";

const capabilities = [
  {
    id: "01",
    title: "Personal Branding",
    hook: "Be known for what you actually know.",
    description:
      "Uncover your point of view, sharpen positioning, and turn real expertise into an authoritative presence on LinkedIn, Instagram, and YouTube.",
    to: "/personal-branding",
    glowColor: "rgba(249, 115, 22, 0.45)",
    borderHover: "group-hover:border-orange-500/50",
  },
  {
    id: "02",
    title: "Content Strategy",
    hook: "Less random content. More strategic purpose.",
    description:
      "Build repeatable formats, editorial calendars, and distribution workflows so every post has a clear business job.",
    to: "/book-a-call?service=content-strategy",
    glowColor: "rgba(56, 189, 248, 0.45)",
    borderHover: "group-hover:border-sky-500/50",
  },
  {
    id: "03",
    title: "Team Training",
    hook: "Turn your team into in-house storytellers.",
    description:
      "Practical, hands-on masterclasses and workshops for marketing teams, NGOs, and corporate leaders to create high-impact video.",
    to: "/team-training",
    glowColor: "rgba(168, 85, 247, 0.45)",
    borderHover: "group-hover:border-purple-500/50",
  },
  {
    id: "04",
    title: "Creative Talent",
    hook: "The right minds to make the system work.",
    description:
      "Find vetted strategists, writers, video editors, and production specialists aligned with your brand's growth goals.",
    to: "/book-a-call?service=creative-talent",
    glowColor: "rgba(74, 222, 128, 0.45)",
    borderHover: "group-hover:border-emerald-500/50",
  },
];

const Feature = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mt-14 sm:mt-20 w-full max-w-[1440px] px-4 font-body sm:px-6 lg:px-8"
    >
      {/* Sphere Digital Minimalist Header on Light Canvas */}
      <div className="mb-10 sm:mb-12 text-left">
        <p className="font-body text-xs sm:text-[0.8rem] font-bold uppercase tracking-[0.24em] text-slate-500">
          WHAT WE DO
        </p>

        <div className="relative mt-2 inline-block">
          {/* Ethereal Colorful Blur Aura */}
          <div
            className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-full opacity-60 blur-3xl mix-blend-multiply"
            style={{
              background:
                "radial-gradient(circle at 60% 50%, rgba(249, 115, 22, 0.35) 0%, rgba(168, 85, 247, 0.3) 40%, rgba(56, 189, 248, 0.25) 75%, transparent 100%)",
            }}
          />
          <h2 className="relative font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1b1b1f] leading-none">
            Capabilities
          </h2>
        </div>

        <p className="mt-3 font-body text-sm sm:text-base text-slate-600 font-medium max-w-xl">
          Start where you are. Build what you need. One partner to scale your personal brand, content machine, and creative team.
        </p>
      </div>

      {/* 4 Sleek High-Contrast Sphere Digital Pill Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item, index) => (
          <Motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.45,
              delay: 0.06 + index * 0.08,
              ease: "easeOut",
            }}
            className="h-full"
          >
            <Link
              to={item.to}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-[#16161b] p-6 sm:p-7 shadow-[0_12px_32px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(15,23,42,0.24)] ${item.borderHover}`}
            >
              {/* Subtle top edge glow */}
              <div
                className="pointer-events-none absolute top-0 left-0 right-0 h-1 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: item.glowColor }}
              />

              <div>
                {/* Top row: Number and Circle Arrow Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-black tracking-[0.2em] text-slate-500 uppercase group-hover:text-white transition-colors duration-300">
                    {item.id}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1b1b1f] shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 1H11V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="11"
                        y1="1"
                        x2="1"
                        y2="11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-orange-400">
                  {item.title}
                </h3>

                {/* Punchy hook */}
                <p className="mt-2 font-body text-xs sm:text-[0.82rem] font-semibold text-slate-200 leading-snug">
                  {item.hook}
                </p>

                {/* Concise description */}
                <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>

              {/* Bottom Explore Cue */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400 transition-colors duration-300 group-hover:text-orange-400">
                <span>Explore</span>
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          </Motion.div>
        ))}
      </div>
    </Motion.section>
  );
};

export default Feature;
