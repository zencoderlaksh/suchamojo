import React from "react";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/20 bg-[#111317] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-8">
      <div className="pulse-soft pointer-events-none absolute -top-14 -left-10 h-44 w-44 rounded-full bg-orange-400/35 blur-3xl" />
      <div className="pulse-soft pointer-events-none absolute -right-8 -bottom-12 h-48 w-48 rounded-full bg-cyan-400/25 blur-3xl" />

      <div className="relative">
        <p className="mb-8 text-center text-xs font-semibold tracking-[0.24em] text-gray-300">
          CONTACT US.25
        </p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-100">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            />
            <p className="mt-2 text-xs text-gray-400">How you&apos;d like to be addressed.</p>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-100">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            />
            <p className="mt-2 text-xs text-gray-400">Where I can reach you.</p>
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-100">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (___) ___-____"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            />
            <p className="mt-2 text-xs text-gray-400">Only if you prefer a quick call.</p>
          </div>

          <Link
            to="/contact"
            className="mt-2 block w-full rounded-full bg-linear-to-r from-white to-gray-100 px-6 py-3 text-center text-sm font-semibold tracking-wide text-[#111317] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:from-gray-100 hover:to-white"
          >
            Schedule Free Consultation
          </Link>

          <div className="pt-1 text-center text-xs text-gray-400">
            <p>I personally review every request.</p>
            <p>If we&apos;re not a fit, I&apos;ll tell you honestly.</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
