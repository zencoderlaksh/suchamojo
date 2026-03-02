import { c1, c2, c3, c4 } from "../../../assets/image/index";

const consultationCards = [
  {
    id: 1,
    eyebrow: "ART DIRECTION",
    title: "BEYOND TIME",
    image: c1,
    tint: "from-[#3d0709]/78 via-[#9e2418]/38 to-[#120909]/20",
    panel: "bg-[#2b1411]/58 ring-1 ring-[#ea7d5f]/35",
  },
  {
    id: 2,
    eyebrow: "BRAND IDENTITY",
    title: "BRAND REDEFINE",
    image: c2,
    tint: "from-[#062f2c]/78 via-[#138b77]/34 to-[#091514]/20",
    panel: "bg-[#112928]/58 ring-1 ring-[#63d8c4]/35",
  },
  {
    id: 3,
    eyebrow: "AD CAMPAIGN",
    title: "EVERY SECOND",
    image: c3,
    tint: "from-[#311207]/80 via-[#a44b18]/34 to-[#140b07]/22",
    panel: "bg-[#2a180f]/60 ring-1 ring-[#df9c57]/35",
  },
  {
    id: 4,
    eyebrow: "ART DIRECTION",
    title: "TIMELESS MASTERY",
    image: c4,
    tint: "from-[#080808]/82 via-[#1f1f1f]/40 to-[#070707]/28",
    panel: "bg-[#201a18]/58 ring-1 ring-[#b7a49a]/30",
  },
];

const Consultation = () => {
  return (
    <section id="consultation" className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="pulse-soft pointer-events-none absolute right-8 top-8 h-44 w-44 rounded-full bg-orange-300/15 blur-3xl" />
      <div className="mx-auto w-full max-w-4xl rounded-md p-1.5 sm:p-2">
        <h2 className="reveal-up mb-8 text-center text-2xl font-extrabold tracking-wide text-slate-900 sm:mb-10 sm:text-3xl">
          Schedule Free Consultation
        </h2>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {consultationCards.map((card, index) => (
            <article
              key={card.id}
              className="reveal-up group relative mx-auto w-full max-w-96 overflow-hidden rounded-[1.7rem] aspect-4/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_38px_rgba(0,0,0,0.22)]"
              style={{ animationDelay: `${index * 110 + 100}ms` }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover saturate-110 contrast-110 transition duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-linear-to-t ${card.tint}`} />
              <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/0 to-white/0 transition duration-500 group-hover:from-white/0 group-hover:to-white/15" />

              <div className={`absolute left-1/2 top-1/2 flex aspect-square w-[64%] max-w-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[1.4rem] px-4 py-4 text-center backdrop-blur-md ${card.panel}`}>
                <p className="mb-2 text-[0.5rem] tracking-[0.16em] text-white/80 sm:text-[0.56rem]">
                  {card.eyebrow}
                </p>
                <h3 className="text-[1.05rem] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-white sm:text-[1.25rem]">
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Consultation;
