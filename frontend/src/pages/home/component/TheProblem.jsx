import React, { useRef } from "react";
import { motion as Motion, useInView } from "../../../lib/motion";
import { FaCompass, FaClock, FaUsers, FaArrowRight } from "react-icons/fa6";

const painPoints = [
  {
    num: "01",
    issue: "Stories worth telling",
    gap: "No clear positioning",
    detail: "You know your industry inside out, but translating that into authoritative content is a struggle.",
  },
  {
    num: "02",
    issue: "Great ideas",
    gap: "No consistent system",
    detail: "Inspiration strikes sporadically, but without an editorial engine, posting remains irregular.",
  },
  {
    num: "03",
    issue: "Existing team",
    gap: "Not enough content capability",
    detail: "Your marketing team knows the brand, but needs hands-on training in modern scripting, formats & video.",
  },
  {
    num: "04",
    issue: "Growing content operation",
    gap: "Without the right creative talent",
    detail: "Scaling requires sharp video editors, writers, and strategists who actually understand your niche.",
  },
];

const TheProblem = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-12 w-full max-w-[1400px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative z-10">
          {/* Eyebrow & Headline */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
              THE PROBLEM
            </div>
            <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-[1.08]">
              Content should move your business forward, not consume your entire week.
            </h2>
            <p className="mt-4 font-body text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
              You have stories worth telling, but no clear positioning. Ideas, but no consistent system. A team, but not enough content capability. Or a growing content operation without the right people.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item, idx) => (
              <Motion.div
                key={item.num}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg"
              >
                <span className="font-heading text-2xl font-black text-slate-300 group-hover:text-orange-500 transition-colors">
                  {item.num}
                </span>
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    {item.issue}
                  </p>
                  <p className="mt-1 font-heading text-lg font-bold text-slate-900 leading-snug">
                    {item.gap}
                  </p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </Motion.div>
            ))}
          </div>

          {/* Solution Callout */}
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 rounded-2xl border border-slate-900 bg-slate-950 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-orange-400">
                The Core Answer
              </span>
              <p className="mt-2 font-heading text-xl sm:text-2xl font-bold leading-relaxed text-gray-100">
                The answer isn't more random posting. It's the right strategy, people and process working together.
              </p>
            </div>
            <a
              href="#four-ways"
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-body text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-orange-500/30 transition duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
            >
              See How We Solve It <FaArrowRight className="text-xs" />
            </a>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default TheProblem;
