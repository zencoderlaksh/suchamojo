import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "../../../lib/motion";
import { FaPlus, FaMinus } from "react-icons/fa6";

const faqs = [
  {
    q: "Do you only work with individuals?",
    a: "No. We support individuals, businesses and internal teams.",
  },
  {
    q: "Can you help without taking over our social channels?",
    a: "Yes. Strategy and team training can be standalone engagements.",
  },
  {
    q: "Can you create the content too?",
    a: "Depending on the scope, we can support planning, production and distribution, or help your own team deliver.",
  },
  {
    q: "Can you help hire a creative team?",
    a: "Yes. We can help clarify roles and support creative talent sourcing. Final scope and hiring responsibilities are agreed case by case.",
  },
  {
    q: "How does pricing work?",
    a: "It depends on whether you need consulting, strategy, training or talent support. A discovery call helps identify the right starting point.",
  },
  {
    q: "Do you work outside Jaipur?",
    a: "We can support remote and on-location projects, depending on the engagement.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="mx-auto mt-12 w-full max-w-[1400px] px-4 font-body sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
        {/* Soft radial decor */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Everything You Need To Know
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
              Have questions about how we work? Here are straight answers to our most common queries.
            </p>
          </div>

          {/* Accordion list */}
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.q} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 text-left font-heading text-base sm:text-lg lg:text-xl font-bold text-slate-900 transition hover:text-orange-600"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-xs text-slate-600 transition group-hover:border-orange-500">
                      {isOpen ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <Motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 font-body text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                          {item.a}
                        </p>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 font-medium">
              Still have questions?{" "}
              <a href="/book-a-call" className="font-bold text-orange-600 hover:underline">
                Book a Free Discovery Call
              </a>{" "}
              and we'll walk you through our process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
