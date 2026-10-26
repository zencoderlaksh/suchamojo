import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useInView } from "../../../lib/motion";
import { useAppStore } from "../../../store/useAppStore";

const CtaBanner = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const trackEvent = useAppStore((state) => state.trackEvent);

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mt-14 sm:mt-20 w-full max-w-[1440px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-orange-500/30 bg-[#0c0d12] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
        
        {/* Sphere Digital Glow Aura */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_85%_at_0%_0%,rgba(249,115,22,0.25),transparent_45%),radial-gradient(60%_70%_at_100%_0%,rgba(168,85,247,0.18),transparent_45%),linear-gradient(135deg,rgba(249,115,22,0.06),rgba(255,255,255,0.02))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.04),transparent)] opacity-70" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">
              NEXT STEPS
            </div>
            
            <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-[2.9rem] leading-[1.08]">
              You don't need more content. <br />
              <span className="text-[#f97316]">You need content that works.</span>
            </h2>

            <p className="mt-4 max-w-xl font-body text-sm sm:text-base leading-relaxed text-slate-300 font-medium">
              Tell us what you're building, where you're stuck, and what kind of support you need. We'll help you figure out the right next step.
            </p>
          </div>

          <div className="shrink-0 lg:justify-self-end">
            <Link
              to="/book-a-call"
              onClick={() =>
                trackEvent("schedule_free_consultation_click", {
                  source_page: "homepage_final_cta",
                })
              }
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#f97316] px-8 py-4 sm:px-9 sm:py-5 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_34px_rgba(249,115,22,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#ea580c] hover:shadow-[0_20px_45px_rgba(249,115,22,0.5)]"
            >
              <span>Book Your Free Discovery Call</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  className="h-3.5 w-3.5 text-white"
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
            </Link>
          </div>
        </div>
      </div>
    </Motion.section>
  );
};

export default CtaBanner;
