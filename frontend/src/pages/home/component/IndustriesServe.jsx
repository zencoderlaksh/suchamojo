import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useInView } from "../../../lib/motion";

import foundersSvg from "../../../assets/sphere/founders.svg";
import doctorsSvg from "../../../assets/sphere/doctors.svg";
import financeSvg from "../../../assets/sphere/finance.svg";
import teamsSvg from "../../../assets/sphere/teams.svg";
import socialImpactSvg from "../../../assets/sphere/social-impact.svg";

const industryCards = [
  {
    title: "Founders & CEOs",
    to: "/industries/founders",
    svg: foundersSvg,
    accentGlow: "rgba(155, 135, 245, 0.35)",
  },
  {
    title: "Doctors & Healthcare",
    to: "/industries/doctors",
    svg: doctorsSvg,
    accentGlow: "rgba(254, 215, 170, 0.35)",
  },
  {
    title: "Finance & MFDs",
    to: "/industries/mutual-fund-distributors",
    svg: financeSvg,
    accentGlow: "rgba(96, 165, 250, 0.35)",
  },
  {
    title: "Marketing Teams",
    to: "/services",
    svg: teamsSvg,
    accentGlow: "rgba(74, 222, 128, 0.35)",
  },
  {
    title: "Nonprofits & Impact",
    to: "/about",
    svg: socialImpactSvg,
    accentGlow: "rgba(244, 114, 182, 0.35)",
  },
];

const IndustriesServe = () => {
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
      <div className="mb-8 sm:mb-10 text-left">
        {/* Eyebrow */}
        <p className="font-body text-xs sm:text-[0.8rem] font-bold uppercase tracking-[0.24em] text-slate-500">
          WHO WE WORK WITH
        </p>

        {/* Sphere Digital Inspired Display Heading with Multi-Color Aura */}
        <div className="relative mt-2 inline-block">
          {/* Colorful Pastel Nebula Aura behind "Industries" */}
          <div
            className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-full opacity-70 blur-3xl mix-blend-multiply"
            style={{
              background:
                "radial-gradient(circle at 65% 50%, rgba(56, 189, 248, 0.35) 0%, rgba(192, 132, 252, 0.3) 35%, rgba(251, 146, 60, 0.25) 70%, transparent 100%)",
            }}
          />

          <h2 className="relative font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1b1b1f] leading-none">
            Industries
          </h2>
        </div>
      </div>

      {/* Cards Grid: 5 columns matching Sphere Digital img-links format */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {industryCards.map((industry, index) => (
          <Motion.div
            key={industry.title}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.45,
              delay: 0.06 + index * 0.06,
              ease: "easeOut",
            }}
            className="h-full"
          >
            <Link
              to={industry.to}
              className="group flex h-full flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 focus:outline-none"
            >
              {/* Sphere Card Pill with authentic SVG artwork & animated button */}
              <div className="relative aspect-[345/194] w-full overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-[#16161b] shadow-[0_10px_28px_rgba(15,23,42,0.14)] transition-all duration-500 ease-out group-hover:shadow-[0_20px_45px_rgba(15,23,42,0.25)]">
                
                {/* Thematic SVG Graphic sitting on colored shelf line */}
                <img
                  src={industry.svg}
                  alt={industry.title}
                  className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />

                {/* Sphere Digital Top-Right White Arrow Badge */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-[#1b1b1f] shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                    <svg
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

                {/* Shelf Glow Effect on Hover */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: industry.accentGlow }}
                />
              </div>

              {/* Below Card: Minimalist Industry Title in Crisp Dark Font (Sphere Digital Style) */}
              <div className="mt-3.5 px-1 text-left">
                <h3 className="font-heading text-base sm:text-[1.05rem] font-bold text-[#1b1b1f] transition-colors duration-300 group-hover:text-orange-600">
                  {industry.title}
                </h3>
              </div>
            </Link>
          </Motion.div>
        ))}
      </div>
    </Motion.section>
  );
};

export default IndustriesServe;
