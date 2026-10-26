import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { FaPlay, FaStar } from "react-icons/fa6";
import { motion as Motion, useInView } from "../../../lib/motion";

const TestimonialCard = ({ item, featured = false }) => (
  <article
    className={`group relative shrink-0 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] ${
      featured
        ? "w-[320px] sm:w-[360px] lg:w-[400px]"
        : "w-[290px] sm:w-[320px] lg:w-[360px]"
    }`}
  >
    <div className="relative z-10 flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1b1b1f]">
            {item.name}
          </p>
          <p className="mt-1 font-body text-[0.72rem] uppercase tracking-[0.16em] text-slate-500">
            {item.role} • {item.industry}
          </p>
        </div>
        {featured ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm">
            <FaPlay className="ml-0.5 text-xs text-orange-500" />
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex gap-1 text-[0.8rem] text-amber-400">
        {Array.from({ length: item.rating || 5 }).map((_, index) => (
          <FaStar key={`${item.name}-${index}`} />
        ))}
      </div>

      <p className="mt-4 font-body text-xs sm:text-sm leading-relaxed text-slate-600">
        &ldquo;{item.quote}&rdquo;
      </p>

      {featured ? (
        <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/20 bg-orange-50 px-3 py-1 font-body text-[0.66rem] uppercase tracking-[0.16em] text-orange-600 font-bold">
          <FaPlay className="text-[0.6rem]" />
          Video Testimonial
        </div>
      ) : null}
    </div>
  </article>
);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [width, setWidth] = useState(0);
  const { testimonials, loadTestimonials } = useAppStore();
  const { list: testimonialsList, loading } = testimonials;

  useEffect(() => {
    if (testimonialsList.length === 0) {
      loadTestimonials();
    }
  }, []);

  const marqueeItems = [...testimonialsList, ...testimonialsList];

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, [marqueeItems.length]);

  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  if (loading) {
    return (
      <div className="py-16 px-4 text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (testimonialsList.length === 0) {
    return null;
  }

  return (
    <Motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mt-14 sm:mt-20 w-full max-w-[1440px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-slate-200/90 bg-white px-6 py-12 sm:px-10 sm:py-16 shadow-[0_15px_45px_rgba(15,23,42,0.04)]">
        <div className="relative z-10">
          <div className="mb-10 text-left">
            <p className="font-body text-xs sm:text-[0.8rem] font-bold uppercase tracking-[0.24em] text-slate-500">
              SOCIAL PROOF
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#1b1b1f]">
              Trusted by creators, founders & teams.
            </h2>
          </div>

          <div className="relative overflow-hidden">
            {/* Edge fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent" />

            <div
              className="flex"
              style={{
                animation: width ? `testimonialsScroll ${Math.max(25, width / 35)}s linear infinite` : "none",
              }}
            >
              <div ref={trackRef} className="flex gap-5 sm:gap-6 pr-6">
                {marqueeItems.map((item, index) => (
                  <TestimonialCard
                    key={`${item.name}-${index}`}
                    item={item}
                    featured={index % 3 === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes testimonialsScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-${width}px, 0, 0); }
        }
      `}</style>
    </Motion.section>
  );
};

export default Testimonials;
