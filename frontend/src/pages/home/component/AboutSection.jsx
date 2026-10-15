import React, { useRef } from "react";
import { motion as Motion, useInView } from "../../../lib/motion";
import { Link } from "react-router-dom";
import { aboutImg } from "../../../assets/image/index";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="about"
      className="mx-auto mt-12 w-full max-w-[1400px] px-4 font-body sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
        {/* Soft background accents */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading and Core Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">
              ABOUT
            </div>

            <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-[2.6rem] leading-[1.08]">
              Built by storytellers. Designed for people who want to grow.
            </h2>

            <p className="mt-5 font-body text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
              Everything Content brings a journalism-led approach to modern content strategy. We believe the best content begins with listening, finding what is true and making it useful. We combine storytelling, growth thinking and practical team capability so your content is not dependent on one good idea or one person.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/book-a-call"
                className="inline-flex items-center justify-center rounded-2xl bg-[#f97316] px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md shadow-orange-500/25 transition duration-300 hover:bg-[#ea580c] hover:-translate-y-0.5"
              >
                Book a Free Discovery Call
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.16em] text-slate-800 transition duration-300 hover:bg-slate-900 hover:text-white hover:-translate-y-0.5"
              >
                Read Our Story
              </Link>
            </div>
          </div>

          {/* Right Column: Founder Note Card */}
          <div className="lg:col-span-5">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-orange-50/30 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={aboutImg}
                  alt="Shubham Gupta"
                  className="h-14 w-14 rounded-2xl border border-slate-200 object-cover shadow-xs"
                />
                <div>
                  <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-orange-600">
                    Founder Note (approval required)
                  </span>
                  <h3 className="font-heading text-lg font-black text-slate-900">
                    Shubham Gupta
                  </h3>
                  <p className="text-xs text-slate-500">
                    Storyteller & Growth Strategist
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200/80 pt-4">
                <p className="font-body text-sm leading-relaxed text-slate-700 italic">
                  “Led by Shubham Gupta, a storyteller turned growth strategist with experience training creators and building high-impact content campaigns.”
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between text-[0.68rem] tracking-[0.14em] uppercase text-slate-400 font-semibold">
                <span>Journalism-Led Strategy</span>
                <span>Jaipur, India</span>
              </div>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
