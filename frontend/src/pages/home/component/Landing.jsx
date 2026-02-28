import React from "react";
import { background } from "../../../assets/image/index";

const Landing = () => {
  return (
    <main className="text-slate-900 overflow-x-hidden">
      <section className="mx-auto w-full max-w-350 px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative min-h-[70vh] overflow-hidden rounded-3xl p-6 sm:min-h-[75vh] sm:p-10 lg:min-h-[80vh] lg:p-14">

          <img
            src={background}
            alt="Landing background"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />

          <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-3">

            <div className="lg:pt-16">
              <h1 className="text-[clamp(1.3rem,5vw,3.2rem)] font-black uppercase leading-[0.95] text-center lg:text-left">
                SUCHAMOJO
              </h1>
            </div>

            <div className="hidden lg:block" />

            <div className="text-center lg:text-right lg:pt-20">
              <p className="text-[clamp(0.85rem,2vw,1.2rem)] font-semibold">
                Story-led personal branding, built with clarity and intent.
              </p>
              <p className="mt-4 text-[clamp(0.8rem,1.6vw,1rem)]">
                For founders and creators who want to be remembered, not just seen.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
