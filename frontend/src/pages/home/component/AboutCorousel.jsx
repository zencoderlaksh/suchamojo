import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { abc1, ab2, ab3 } from "../../../assets/image/index";

const slides = [abc1, ab2, ab3];

const AboutCorousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-10 font-body sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-slate-200">
        <div className="relative min-h-115 sm:min-h-135">
          {slides.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="About visual"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${index === activeSlide
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
                }`}
            />
          ))}

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10 p-6 sm:p-10 lg:flex-row lg:items-center lg:p-14">
            <Link
              to="/about"
              className="inline-flex w-full max-w-130 items-center justify-between rounded-4xl border border-white/40 bg-black/35 px-6 py-6 text-white backdrop-blur-md transition duration-300 hover:bg-black/50 sm:px-8 sm:py-7"
            >
              <span className="font-heading text-xs font-semibold tracking-[0.18em] text-white/80">
                ABOUT US
              </span>
              <span className="font-heading text-4xl font-black leading-none sm:text-6xl">ABOUT</span>
            </Link>

            <div className="max-w-xl rounded-2xl bg-black/35 p-5 text-white backdrop-blur-sm sm:p-6">
              <p className="font-body text-sm leading-relaxed sm:text-base">
                <strong>Hi, I am Shubham Gupta — the founder and the face behind SuchaMojo.</strong>
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                <strong>I&apos;m Shubham Gupta — a storyteller turned growth strategist, based in Jaipur.</strong>
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                I started on the ground. Mobile journalism. Real people, real communities, real
                stories told on a phone before anyone called it content creation.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                That grounding taught me one thing early: clarity builds trust. And trust is what
                actually moves people.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                Over the years I trained <strong>30,000+ creators across India</strong> helping them use simple
                tools and honest narratives to show up with confidence and get noticed for the
                right reasons.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                From there I led Creator Relations and Growth at PLUC, co-founded LetMeBreathe,
                and spent years figuring out how purpose-driven stories scale in the digital age.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                Today through SuchaMojo, I work at the intersection of storytelling, personal
                branding, and growth strategy with founders, professionals, NGOs, and platforms
                who want to turn their expertise into visibility, trust, and real opportunity.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                No noise. No gimmicks. Just clarity.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                I do not help you post more.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed sm:text-base">
                I help you <strong>say something worth remembering.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCorousel;
