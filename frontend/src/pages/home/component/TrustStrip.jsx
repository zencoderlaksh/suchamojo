import React, { useRef, useState, useEffect } from "react";
import { motion as Motion, useInView } from "../../../lib/motion";

const CountUp = ({ end, duration = 1.6, delay = 0, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const isNum = typeof end === "number";
    if (!isNum) return;

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(easeOut * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setVal(end);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [inView, end, duration, delay]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

const proofs = [
  {
    num: 30000,
    suffix: "+",
    label: "Creators Trained",
    sub: "Across masterclasses, corporate workshops & intensive cohorts.",
    accent: "#f97316",
  },
  {
    num: 16,
    suffix: "+",
    label: "Cities with Active Work",
    sub: "Pan-India presence powering founders & executive brands.",
    accent: "#38bdf8",
  },
  {
    num: 400,
    suffix: "M+",
    label: "Campaign Views Reached",
    sub: "High-retention documentary reels & organic video distribution.",
    accent: "#a855f7",
  },
];

const TrustStrip = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-14 sm:mt-20 w-full max-w-[1440px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-16 shadow-[0_15px_45px_rgba(15,23,42,0.04)]">
        
        {/* Soft background light */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(249,115,22,0.06),transparent_70%),radial-gradient(circle_at_85%_75%,rgba(56,189,248,0.05),transparent_50%)]" />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-10 text-left">
            <p className="font-body text-xs sm:text-[0.8rem] font-bold uppercase tracking-[0.24em] text-slate-500">
              IMPACT BY THE NUMBERS
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#1b1b1f]">
              Built on real stories. Backed by execution.
            </h2>
          </div>

          {/* 3 Sphere Digital Style Stat Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {proofs.map((item, index) => (
              <Motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-[#f8fafc] p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:bg-white hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)]"
              >
                <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1b1b1f]">
                  <CountUp
                    end={item.num}
                    suffix={item.suffix}
                    delay={0.1 + index * 0.15}
                  />
                </div>
                <h3 className="mt-3 font-heading text-base sm:text-lg font-bold text-slate-800 uppercase tracking-wide group-hover:text-orange-600 transition-colors duration-300">
                  {item.label}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  {item.sub}
                </p>
                <div
                  className="mt-6 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-24"
                  style={{ background: item.accent }}
                />
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
