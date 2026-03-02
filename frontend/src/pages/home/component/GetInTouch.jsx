import React from "react";
import Form from "../../../components/Form";
import { backgroundAlt } from "../../../assets/image";

const GetInTouch = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <style>
        {`
          @keyframes touchFadeUp {
            from { opacity: 0; transform: translateY(26px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes touchGlow {
            0%, 100% { opacity: .35; transform: scale(1); }
            50% { opacity: .7; transform: scale(1.12); }
          }
          .touch-reveal {
            opacity: 0;
            animation: touchFadeUp .85s ease forwards;
          }
        `}
      </style>

      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-cover bg-center p-6 transition duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] sm:p-10 lg:p-14"
        style={{ backgroundImage: `url(${backgroundAlt})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-black/65" />

        <div
          className="pulse-soft pointer-events-none absolute -top-12 left-10 h-40 w-40 rounded-full bg-orange-400/30 blur-3xl"
          style={{ animation: "touchGlow 5.5s ease-in-out infinite" }}
        />
        <div
          className="pulse-soft pointer-events-none absolute -bottom-8 right-16 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl"
          style={{ animation: "touchGlow 6.2s ease-in-out infinite" }}
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="touch-reveal max-w-xl" style={{ animationDelay: "0.1s" }}>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gray-300">LET&apos;S TALK</p>
            <h2 className="mb-5 text-5xl font-black uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-6xl">
              Get In
              <br />
              Touch
            </h2>
            <p className="text-sm leading-relaxed text-gray-200 sm:text-base">
              Have a project in mind? Whether you&apos;re launching a brand, designing
              a product, or elevating your digital presence, we&apos;re here to shape
              your vision into something memorable.
            </p>
          </div>

          <div className="touch-reveal" style={{ animationDelay: "0.24s" }}>
            <div className="mx-auto max-w-xl">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
