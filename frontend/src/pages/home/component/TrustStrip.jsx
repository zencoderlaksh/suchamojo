import React, { useRef, useState, useEffect } from "react";
import { motion as Motion, useInView } from "../../../lib/motion";

const CountUp = ({ end, duration = 1.6, delay = 0, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
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
    label: "Creators trained",
    sub: "Across cohort masterclasses, workshops & intensive programs",
  },
  {
    num: 16,
    suffix: "",
    label: "Cities with active work",
    sub: "Pan-India presence helping founders & teams create content",
  },
  {
    num: 400,
    suffix: "M+",
    label: "Campaign views reached",
    sub: "Documentary footage, personal brand reels & editorial strategy",
  },
];

const TrustStrip = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-4 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 font-body"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_50px_rgba(0,0,0,0.4)] sm:p-10 lg:p-12">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(249,115,22,0.15),transparent_70%),radial-gradient(circle_at_85%_75%,rgba(103,232,249,0.08),transparent_50%)]" />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
            <div>
              <p className="font-body text-[0.68rem] uppercase tracking-[0.24em] text-orange-400 font-semibold">
                TRUST STRIP
              </p>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white">
                Built on real stories. Backed by hands-on execution.
              </h2>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-body text-[0.62rem] uppercase tracking-[0.16em] text-gray-400 backdrop-blur-sm">
              Proof placeholders to approve
            </span>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {proofs.map((item, index) => (
              <Motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                  <CountUp
                    end={item.num}
                    suffix={item.suffix}
                    delay={0.1 + index * 0.15}
                  />
                </div>
                <h3 className="mt-3 font-heading text-base sm:text-lg font-bold text-gray-100 uppercase tracking-wide">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed font-body">
                  {item.sub}
                </p>
                <div className="mt-4 h-0.5 w-10 bg-orange-500/80 transition-all duration-300 group-hover:w-20" />
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
