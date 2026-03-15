import React from "react";
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
              <p className="mt-6 font-body text-[clamp(0.58rem,1.2vw,0.8rem)] font-bold uppercase tracking-[0.2em] text-center lg:text-left">
                DESIGN STUDIO . LONDON
              </p>
            </div>

            <div className="hidden lg:block" />

            <div className="text-center lg:text-right lg:pt-20">
              <p className="font-body text-[clamp(0.85rem,2vw,1.2rem)] font-semibold">
                We help founders, financial professionals, and industry leaders build personal brands that earn trust,
              </p>
              <p className="mt-4 font-body text-[clamp(0.8rem,1.6vw,1rem)]">
                attract opportunity, and drive real growth.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
