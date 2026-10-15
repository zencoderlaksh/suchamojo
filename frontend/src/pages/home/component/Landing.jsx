import React from "react";
import { Link } from "react-router-dom";
import { heroBannerUpdated } from "../../../assets/image/index";

const Landing = () => {
  return (
    <main className="text-slate-900 overflow-x-hidden">
      <section className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[65vh] sm:min-h-[72vh] lg:min-h-[78vh] overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.04)] p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
          {/* Crystal Clear Hero Banner Background Image - No blur, no wash, no scrim */}
          <img
            src={heroBannerUpdated}
            alt="Founder-led documentary and studio content session"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />

          {/* Top Row: Eyebrow on left, Service line on right */}
          <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/25 bg-white/90 px-3.5 py-1 backdrop-blur-sm shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              <p className="font-body text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] text-orange-600">
                PERSONAL BRANDS. BETTER CONTENT. STRONGER TEAMS.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-[0.68rem] font-semibold text-slate-700 backdrop-blur-sm shadow-xs">
              <span>Personal Branding</span>
              <span className="text-orange-500">•</span>
              <span>Content Strategy</span>
              <span className="text-orange-500">•</span>
              <span>Team Training</span>
              <span className="text-orange-500">•</span>
              <span>Creative Talent</span>
            </div>
          </div>

          {/* Main 3-Column Content Grid: Left Content, Middle Empty for clear view of Founder, Right Content */}
          <div className="relative z-10 my-auto grid grid-cols-1 gap-6 py-6 lg:grid-cols-12 lg:items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-4 xl:col-span-4">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-[2.5rem] font-black uppercase tracking-tight text-slate-900 leading-[1.08]">
                Everything you need to make content work.
              </h1>

              {/* Mobile Service Line */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-semibold text-slate-600 lg:hidden">
                <span>Personal Branding</span>
                <span className="text-orange-500">•</span>
                <span>Content Strategy</span>
                <span className="text-orange-500">•</span>
                <span>Team Training</span>
                <span className="text-orange-500">•</span>
                <span>Creative Talent</span>
              </div>
            </div>

            {/* Middle Spacer: Completely clear so Founder & Microphones are 100% visible */}
            <div className="hidden lg:block lg:col-span-4 min-h-[300px]" />

            {/* Right Subheadline & Action Column */}
            <div className="flex flex-col gap-4 lg:col-span-4 xl:col-span-4 lg:items-end lg:text-right">
              <p className="font-body text-xs sm:text-sm lg:text-[0.92rem] font-medium leading-relaxed text-slate-800 max-w-sm">
                Build a personal brand people trust. Create content with a clear strategy. Train your team to execute. Find creative talent that gets it. One partner, four ways to grow.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto lg:justify-end">
                <Link
                  to="/book-a-call"
                  className="inline-flex items-center justify-center rounded-xl bg-[#f97316] px-5 py-2.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#ea580c] hover:shadow-orange-500/35"
                >
                  BOOK A FREE DISCOVERY CALL
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-5 py-2.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.15em] text-slate-800 backdrop-blur-xs transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white"
                >
                  EXPLORE HOW WE WORK
                </a>
              </div>

              {/* Visual Direction Subtext */}
              <p className="text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 font-medium max-w-sm">
                Founder-led documentary footage • Real team workshops • Behind-the-scenes production
              </p>
            </div>
          </div>

          {/* Bottom spacer for clean distance from bottom fixed pill navbar */}
          <div className="relative z-10 pt-2" />
        </div>
      </section>
    </main>
  );
};

export default Landing;
