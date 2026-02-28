const featureCards = [
  {
    id: "01",
    tag: "1:1 CONSULTING",
    title: "Personal Brand & Content IP",
    highlight: "Build a content system that sounds like you.",
    description:
      "We clarify your identity, shape your narrative, and design repeatable content formats you can sustain.",
    tone: "from-rose-50 to-white",
  },
  {
    id: "02",
    tag: "TEAM TRAINING",
    title: "Content Systems for Teams",
    highlight: "Turn teams into clear, confident storytellers.",
    description:
      "We align founders, marketing, and operators on one narrative and one content direction.",
    tone: "from-emerald-50 to-white",
  },
  {
    id: "03",
    tag: "CREATIVE HIRING",
    title: "Hire creators who think, not just execute.",
    highlight: "Build creative teams that move your brand forward.",
    description:
      "I help you identify, evaluate, and structure creative roles that actually move your brand forward.",
    tone: "from-amber-50 to-white",
  },
  {
    id: "04",
    tag: "COHORT-BASED PROGRAMS",
    title: "Learn Together. Build in Public.",
    highlight: "For founders, freelancers, and high-agency professionals.",
    description:
      "A guided environment to build identity, content systems, and long-term brand clarity.",
    tone: "from-indigo-50 to-white",
  },
];

const Feature = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-[0.22em] text-slate-600">FEATURE</p>
          <h2 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">How We Work With You</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featureCards.map((card, index) => (
            <article
              key={card.id}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br ${card.tone} p-7 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#b8d71f]/60 hover:shadow-[0_20px_40px_rgba(15,23,42,0.14)] sm:p-8`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-[#b8d71f] opacity-70 transition duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-[#b8d71f]/10 blur-3xl transition duration-500 group-hover:scale-110" />

              <div className="relative z-10">
                <div className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                  <span className="text-sm font-bold tracking-[0.15em] text-slate-900">{card.id}</span>
                  <span className="ml-2 text-xs font-semibold tracking-[0.1em] text-slate-600">{card.tag}</span>
                </div>

                <h3 className="text-[1.7rem] font-extrabold leading-tight text-slate-900">{card.title}</h3>
                <p className="mt-4 text-lg font-semibold text-slate-800">{card.highlight}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{card.description}</p>

                <div className="mt-6 h-[2px] w-16 bg-[#b8d71f] transition-all duration-300 group-hover:w-28" />
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Strategic support</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition duration-300 group-hover:border-[#b8d71f] group-hover:text-slate-900">
                    +
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
