import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useInView } from "../../../lib/motion";

const industryCards = [
  {
    tag: "Leadership",
    title: "Founders & CEOs",
    description: "Turn expertise into visibility and conversations.",
    to: "/industries/founders",
  },
  {
    tag: "Healthcare",
    title: "Doctors & Healthcare Professionals",
    description: "Communicate credibility with clarity and care.",
    to: "/industries/doctors",
  },
  {
    tag: "Finance",
    title: "Finance Professionals & MFDs",
    description: "Explain complex topics in useful, compliant ways.",
    to: "/industries/mutual-fund-distributors",
  },
  {
    tag: "Teams & Capability",
    title: "Businesses & Marketing Teams",
    description: "Build repeatable content systems and internal capability.",
    to: "/services",
  },
  {
    tag: "Social Impact",
    title: "Nonprofits & Purpose-Led Organisations",
    description: "Show the people and impact behind the work.",
    to: "/about",
  },
];

const IndustriesServe = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mt-12 w-full max-w-[1400px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_70px_rgba(0,0,0,0.58)] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_8%_0%,rgba(255,255,255,0.09),transparent_48%),radial-gradient(55%_45%_at_88%_15%,rgba(34,211,238,0.08),transparent_50%),radial-gradient(60%_55%_at_50%_100%,rgba(249,115,22,0.08),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">
                WHO WE WORK WITH
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-[2.6rem] leading-[1.08]">
                Different industries. One constant: good stories build trust.
              </h2>
            </div>

            <p className="max-w-xl font-body text-sm leading-relaxed text-gray-300 sm:text-base lg:justify-self-end">
              Your personal brand is not just a profile—it is a business asset. While audiences and compliance rules change across fields, one truth remains: authenticity, strategic positioning, and clear communication earn lasting authority.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {industryCards.map((industry, index) => (
              <Motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.08 + index * 0.06,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <Link
                  to={industry.to}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/[0.06]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_42%)] opacity-75" />
                  <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-orange-500/10 blur-2xl transition duration-500 group-hover:scale-125" />

                  <div className="relative z-10">
                    <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 font-body text-[0.62rem] uppercase tracking-[0.16em] text-orange-300 font-semibold">
                      {industry.tag}
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-bold uppercase leading-snug tracking-wide text-white">
                      {industry.title}
                    </h3>
                    <p className="mt-2.5 font-body text-xs leading-relaxed text-gray-400">
                      {industry.description}
                    </p>
                  </div>

                  <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gray-300 transition duration-300 group-hover:text-orange-400 group-hover:translate-x-1">
                    Explore →
                  </span>
                </Link>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </Motion.section>
  );
};

export default IndustriesServe;
