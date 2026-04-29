import React from "react";
import { Link } from "react-router-dom";
import { l1 } from "../../../assets/image/index";

const Landing = () => {
  return (
    <main className="text-slate-900 overflow-x-hidden">
      <section className="mx-auto w-full max-w-350 px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative min-h-[70vh] overflow-hidden rounded-3xl p-6 sm:min-h-[75vh] sm:p-10 lg:min-h-[80vh] lg:p-14">
          <img
            src={l1}
            alt="Landing background"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />

          <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-3">
            <div className="lg:pt-16">
              <h1 className="font-heading text-[clamp(1.3rem,5vw,3.2rem)] font-black uppercase leading-[0.95] text-center lg:text-left font-light">
                Your Story Is Your Strongest Strategy.
              </h1>
            </div>

            <div className="hidden lg:block" />

            <div className="text-center lg:text-right lg:pt-20">
              <p className="font-body text-[clamp(0.85rem,2vw,1.2rem)] font-semibold">
                We help founders, creators, and ambitious professionals build
                personal brands that earn trust, open the right doors, and grow
                their business without sounding like everyone else.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-end">
                <Link
                  to="/book-a-call"
                  className="inline-flex min-w-[210px] items-center justify-center rounded-2xl bg-[#f97316] px-6 py-3 font-body text-[0.72rem] uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#ea580c]"
                >
                  Book a Free Call
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex min-w-[210px] items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-body text-[0.72rem] uppercase tracking-[0.18em] text-slate-900 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
