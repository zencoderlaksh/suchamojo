import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { beyond, time, timeless } from "../../../assets/image/index";

const slides = [beyond, time, timeless];

const AboutCorousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
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
              <span className="text-xs font-semibold tracking-[0.18em] text-white/80">
                ABOUT US .25
              </span>
              <span className="text-4xl font-black leading-none sm:text-6xl">ABOUT</span>
            </Link>

            <div className="max-w-xl rounded-2xl bg-black/35 p-5 text-white backdrop-blur-sm sm:p-6">
              <p className="text-sm leading-relaxed sm:text-base">
                I'm <strong>Suchamojo</strong> - a storyteller turned growth strategist.
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                I started in journalism, documenting real people and real moments.
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                Over time, I moved into building creator communities and shaping how
                people show up online.
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                Today, I work with founders, creators, and high-agency professionals
                to build <strong>personal brands rooted in identity</strong>, not trends.
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                I don't help you post more.
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                I help you <strong>say something worth remembering</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCorousel;
