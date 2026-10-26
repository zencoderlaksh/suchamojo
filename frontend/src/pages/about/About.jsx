import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowLeft,
  FiPlus,
  FiX,
  FiCheck,
} from "react-icons/fi";
import {
  motion as Motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "../../lib/motion";
import { abc1, ab2, ab3 } from "../../assets/image";
import { heroMedia } from "../../lib/imagekit";
import { useAppStore } from "../../store/useAppStore";

// Timeline Milestones matching Sphere Digital "Our History" slider (Screenshot 1)
const HISTORY_ITEMS = [
  {
    year: "2016",
    title: "Mobile Journalism Frontlines",
    description:
      "One of India's earliest mobile journalists, shooting stories on phones where heavy broadcast cameras couldn't go — covering grassroots realities for Hindustan Times and Al Jazeera.",
    image: heroMedia.dsc00237,
  },
  {
    year: "2019",
    title: "Creator Ecosystems",
    description:
      "Built India's pioneering storytelling ecosystems at PLUC and LetMeBreathe, helping diverse communities transform their stories into digital influence.",
    image: heroMedia.dsc00242,
  },
  {
    year: "2022",
    title: "30,000+ Creators Trained",
    description:
      "Conducted masterclasses and hands-on workshops across cities for founders, corporate teams, farmers, Bollywood creators, and student storytellers.",
    image: heroMedia.dsc00335,
  },
  {
    year: "Today",
    title: "Everything Content",
    description:
      "A strategic personal branding, content architecture, and creative enablement agency for leaders who want to be remembered — not just seen.",
    image: heroMedia.dsc00441,
  },
];

// Values Accordion items matching Sphere Digital (Screenshot 2 & 3)
const VALUES_ITEMS = [
  {
    id: "identity",
    title: "Content as Identity",
    summary:
      "Know our markets and know our customers. Be specialist. Be an expert.",
    details:
      "Content is not creativity for its own sake. Content is identity expressed with strategic precision. When you communicate who you actually are and what you genuinely know, you create irreplaceable authority.",
  },
  {
    id: "voice",
    title: "Your Unfair Advantage",
    summary:
      "Your lived experience is your moat in an AI-saturated world.",
    details:
      "Generic templates and algorithmic mimicry get ignored. Your raw experience, idiosyncratic lessons, and honest point of view are the only things competitors cannot duplicate.",
  },
  {
    id: "future",
    title: "The Future of Brands",
    summary:
      "People connect with people, not faceless corporate mastheads.",
    details:
      "Personal brands will replace static resumes, cold outreach, and bloated corporate websites. Today, audiences do business with individuals whose thinking they respect and follow.",
  },
  {
    id: "presence",
    title: "Presence Over Performance",
    summary:
      "Enduring authority is not built on vanity metrics or daily noise.",
    details:
      "We don't optimize for hollow virality. We engineer quiet, undeniable presence so that when your target audience needs an expert in your domain, your name is the only one they recall.",
  },
];

// Ribbon photo pool showcasing authentic photoshoot images
const RIBBON_IMAGES = [
  heroMedia.dsc00237,
  heroMedia.dsc00441,
  ab2,
  heroMedia.dsc00242,
  heroMedia.dsc00335,
  abc1,
  heroMedia.dsc00443,
  ab3,
  heroMedia.contentHeroBts,
  heroMedia.trainingCorporateStudio,
];

const About = () => {
  const loadPageSeo = useAppStore((state) => state.loadPageSeo);

  // Scroll Ribbon State
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  // Active Value Accordion State (open 1st item by default like Sphere)
  const [activeValue, setActiveValue] = useState("identity");

  // History Slider State
  const [historyIndex, setHistoryIndex] = useState(0);

  // Parallax Scroll Container for the 3 moving images (Screenshot 2 & 3)
  const valuesSectionRef = useRef(null);
  const { scrollYProgress: valuesScrollProgress } = useScroll({
    target: valuesSectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms: As user scrolls down, images float and move upwards!
  const yParallaxTop = useTransform(valuesScrollProgress, [0, 1], [40, -80]);
  const yParallaxCenter = useTransform(valuesScrollProgress, [0, 1], [90, -140]);
  const yParallaxBottom = useTransform(valuesScrollProgress, [0, 1], [30, -60]);

  // Section visibility hooks
  const heroRef = useRef(null);
  const historyRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const historyInView = useInView(historyRef, { once: true, amount: 0.15 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  useEffect(() => {
    loadPageSeo(
      "about",
      "About Everything Content — Personal Branding Consultant, Storyteller, Growth Strategist India",
    ).then((seo) => {
      const fallbackDesc =
        "Everything Content is built by a storyteller turned growth strategist who has trained 30,000+ creators across India. Discover how we build personal brands rooted in identity and clarity.";
      if (!seo || !seo.metaDescription) {
        let tag = document.querySelector('meta[name="description"]');
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("name", "description");
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", fallbackDesc);
      }
    });
  }, [loadPageSeo]);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  const handleNextHistory = () => {
    setHistoryIndex((prev) => (prev + 1) % HISTORY_ITEMS.length);
  };

  const handlePrevHistory = () => {
    setHistoryIndex(
      (prev) => (prev - 1 + HISTORY_ITEMS.length) % HISTORY_ITEMS.length,
    );
  };

  return (
    <div className="relative overflow-hidden bg-[#fbfbfd] text-[#1b1b1f] font-body selection:bg-orange-500 selection:text-white">
      {/* Subtle Ethereal Brushy Nebula Gradients across background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60rem] bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.06)_0%,transparent_45%),radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.06)_0%,transparent_40%),radial-gradient(circle_at_50%_60%,rgba(249,115,22,0.05)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute right-[-10rem] top-[40rem] h-[35rem] w-[35rem] rounded-full bg-purple-100/35 blur-3xl mix-blend-multiply" />
      <div className="pointer-events-none absolute left-[-8rem] top-[80rem] h-[35rem] w-[35rem] rounded-full bg-orange-100/35 blur-3xl mix-blend-multiply" />

      {/* ========================================================================= */}
      {/* SECTION 1: SPHERE DIGITAL HERO BANNER WITH SCROLLING PHOTO RIBBON         */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative mx-auto max-w-[1440px] px-4 pt-16 sm:pt-24 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <Motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="font-body text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              ABOUT EVERYTHING CONTENT
            </p>
          </Motion.div>

          {/* Sphere Digital Inspired Display Heading with Lavender Pill Highlight */}
          <Motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black uppercase tracking-tight text-[#1b1b1f] leading-[1.05]"
          >
            Our role is to lead with <br className="hidden sm:inline" />
            <span className="relative inline-block mt-2 sm:mt-0">
              <span className="relative z-10 text-[#7c3aed] bg-[#ede9fe]/90 px-5 sm:px-7 py-1 rounded-full border border-[#ddd6fe] shadow-xs">
                expertise
              </span>
              <span className="absolute -inset-2 bg-purple-400/20 blur-xl rounded-full mix-blend-multiply pointer-events-none" />
            </span>
          </Motion.h1>

          {/* Subtitle Paragraph */}
          <Motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 font-body text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 font-medium max-w-2xl mx-auto"
          >
            The best brands are built on identity, not algorithmic tricks. We combine deep journalistic storytelling with strategic positioning so founders, leaders, and teams build lasting trust.
          </Motion.p>
        </div>

        {/* Continuous Scrolling Photo Ribbon (Sphere Digital Signature Element) */}
        <div className="relative mt-12 sm:mt-16 overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32 bg-gradient-to-r from-[#fbfbfd] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32 bg-gradient-to-l from-[#fbfbfd] to-transparent" />

          <div
            className="flex"
            style={{
              animation: trackWidth
                ? `ribbonScroll ${Math.max(25, trackWidth / 40)}s linear infinite`
                : "none",
            }}
          >
            <div ref={trackRef} className="flex gap-5 sm:gap-6 pr-6">
              {[...RIBBON_IMAGES, ...RIBBON_IMAGES].map((imgSrc, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] sm:aspect-[4/5] w-[180px] sm:w-[220px] lg:w-[250px] shrink-0 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)] group"
                >
                  <img
                    src={imgSrc}
                    alt={`Everything Content gallery item ${i + 1}`}
                    className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-[2rem] border border-black/5 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: OUR VALUES WITH PARALLAX MOVING IMAGES ON SCROLL (Screenshot 2 & 3) */}
      {/* ========================================================================= */}
      <section
        ref={valuesSectionRef}
        className="relative mx-auto mt-20 sm:mt-32 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          
          {/* LEFT: 3 Floating Organic Cutout Images Moving Up on Scroll (Parallax) */}
          <div className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[680px] w-full">
            
            {/* Image 1: Top-Left Landscape Pill */}
            <Motion.div
              style={{ y: yParallaxTop }}
              className="absolute left-0 top-0 w-[58%] sm:w-[55%] aspect-[16/11] overflow-hidden rounded-[2.2rem] sm:rounded-[2.6rem] border border-slate-200/90 bg-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.09)] z-10 transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={heroMedia.dsc00242}
                alt="Workshop and team culture"
                className="h-full w-full object-cover select-none pointer-events-none"
              />
            </Motion.div>

            {/* Image 2: Center-Right Portrait Pill (Stronger Parallax Float) */}
            <Motion.div
              style={{ y: yParallaxCenter }}
              className="absolute right-0 top-[20%] w-[58%] sm:w-[56%] aspect-[4/5] overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-slate-200/90 bg-slate-100 shadow-[0_24px_55px_rgba(15,23,42,0.13)] z-20 transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={heroMedia.dsc00441}
                alt="Founder session portrait"
                className="h-full w-full object-cover select-none pointer-events-none"
              />
            </Motion.div>

            {/* Image 3: Bottom-Left Square Pill */}
            <Motion.div
              style={{ y: yParallaxBottom }}
              className="absolute left-4 sm:left-6 bottom-4 sm:bottom-8 w-[48%] sm:w-[46%] aspect-square overflow-hidden rounded-[2.2rem] sm:rounded-[2.6rem] border border-slate-200/90 bg-slate-100 shadow-[0_18px_40px_rgba(15,23,42,0.1)] z-30 transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={abc1}
                alt="Creative founder direction"
                className="h-full w-full object-cover select-none pointer-events-none"
              />
            </Motion.div>

          </div>

          {/* RIGHT: Our Values Headline & Interactive Accordion (Screenshot 2 & 3) */}
          <div className="lg:pl-6 pt-4">
            <p className="font-body text-xs sm:text-[0.8rem] font-bold uppercase tracking-[0.24em] text-slate-500">
              OUR VALUES
            </p>

            <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-[2.6rem] font-black tracking-tight text-[#1b1b1f] leading-[1.15]">
              To create meaningful and engaging experiences for our people and our customers that enable growth and get results.
            </h2>

            {/* Accordion Container */}
            <div className="mt-10 sm:mt-12 divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
              {VALUES_ITEMS.map((item) => {
                const isOpen = activeValue === item.id;
                return (
                  <div key={item.id} className="py-6 sm:py-7">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveValue(isOpen ? null : item.id)
                      }
                      className="w-full flex items-center justify-between text-left group focus:outline-none"
                    >
                      <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#1b1b1f] group-hover:text-[#7c3aed] transition-colors duration-300">
                        {item.title}
                      </span>
                      
                      {/* Sphere Digital Circle Button with +/- (Screenshot 3) */}
                      <span
                        className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-all duration-300 shadow-xs ${
                          isOpen
                            ? "bg-slate-200 text-slate-900 rotate-90"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {isOpen ? (
                          <FiX className="h-5 w-5" />
                        ) : (
                          <FiPlus className="h-5 w-5" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <Motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pr-12">
                            <p className="font-body text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                              {item.summary}
                            </p>
                            <p className="mt-2 font-body text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                              {item.details}
                            </p>
                          </div>
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: OUR HISTORY INTERACTIVE SLIDER (Screenshot 1)                  */}
      {/* ========================================================================= */}
      <section
        ref={historyRef}
        className="relative mx-auto mt-24 sm:mt-36 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1b1b1f]">
              Our History
            </h2>
          </div>

          {/* Slider Progress Bar & Navigation Controls (Matching Screenshot 1) */}
          <div className="flex items-center gap-5">
            {/* Indicator Line Bar */}
            <div className="hidden sm:block w-32 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 transition-all duration-300"
                style={{
                  width: `${((historyIndex + 1) / HISTORY_ITEMS.length) * 100}%`,
                }}
              />
            </div>

            {/* Left / Right Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevHistory}
                aria-label="Previous history milestone"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-all duration-200 hover:bg-slate-200 hover:scale-105 active:scale-95 shadow-xs"
              >
                <FiArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextHistory}
                aria-label="Next history milestone"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-all duration-200 hover:bg-slate-200 hover:scale-105 active:scale-95 shadow-xs"
              >
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Cards Horizontal Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HISTORY_ITEMS.map((item, index) => {
            const isHighlighted = historyIndex === index;
            return (
              <div
                key={item.year}
                onClick={() => setHistoryIndex(index)}
                className={`group cursor-pointer rounded-[2.2rem] bg-white border p-4 sm:p-5 transition-all duration-300 ${
                  isHighlighted
                    ? "border-purple-500/50 shadow-[0_20px_45px_rgba(124,58,237,0.12)] -translate-y-2 ring-2 ring-purple-500/20"
                    : "border-slate-200/80 shadow-[0_10px_28px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:-translate-y-1"
                }`}
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.8rem] bg-slate-100 mb-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Year in Bold Display */}
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-[#1b1b1f] group-hover:text-[#7c3aed] transition-colors">
                  {item.year}
                </h3>

                {/* Title */}
                <h4 className="mt-2 font-heading text-base font-bold text-slate-800 leading-snug">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="mt-2 font-body text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CUTOUT PURPLE GRADIENT SECTION "READY TO ROLL?" (Screenshot 4) */}
      {/* ========================================================================= */}
      <section
        ref={ctaRef}
        className="relative mx-auto mt-24 sm:mt-36 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[3rem] sm:rounded-[4.5rem] border border-purple-200/60 p-8 sm:p-14 lg:p-24 shadow-[0_30px_80px_rgba(124,58,237,0.1)]"
          style={{
            background:
              "linear-gradient(135deg, #c4b5fd 0%, #ddd6fe 30%, #bae6fd 70%, #fed7aa 100%)",
          }}
        >
          {/* Subtle light brushy overlay */}
          <div className="pointer-events-none absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl mix-blend-multiply" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-200/50 blur-3xl mix-blend-multiply" />

          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
            {/* Eyebrow */}
            <p className="font-body text-xs sm:text-[0.8rem] font-black uppercase tracking-[0.28em] text-slate-700">
              READY TO ROLL?
            </p>

            {/* Giant Sphere Digital Headline (Screenshot 4) */}
            <h2 className="mt-5 font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tight text-[#1b1b1f] leading-[1.08]">
              Discover your voice or plan your next move
            </h2>

            {/* Pill Button Group (Screenshot 4) */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                to="/book-a-call"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#16161b] px-8 sm:px-10 py-4 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white shadow-xl transition-all duration-300 hover:bg-orange-500 hover:scale-105 hover:shadow-orange-500/30"
              >
                <span>Book A Call</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#86efac] px-8 sm:px-10 py-4 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-slate-950 shadow-md transition-all duration-300 hover:bg-[#4ade80] hover:scale-105"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DUAL FEATURE CARDS (Screenshot 5)                              */}
      {/* ========================================================================= */}
      <section className="relative mx-auto mt-12 sm:mt-16 mb-20 sm:mb-28 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          
          {/* Card 1: Meet The Founder */}
          <Link
            to="/book-a-call"
            className="group relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden rounded-[2.5rem] bg-[#16161b] shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(15,23,42,0.2)]"
          >
            <img
              src={heroMedia.dsc00441}
              alt="Meet the Founder"
              className="h-full w-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Top-Right Circular White Diagonal Arrow Badge */}
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 1H11V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="11"
                    y1="1"
                    x2="1"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* Bottom Title */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Meet The Founder
              </h3>
            </div>
          </Link>

          {/* Card 2: Work with Us / Team Workshops */}
          <Link
            to="/team-training"
            className="group relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden rounded-[2.5rem] bg-[#16161b] shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(15,23,42,0.2)]"
          >
            <img
              src={heroMedia.trainingCorporateStudio}
              alt="Work with Everything Content"
              className="h-full w-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Top-Right Circular White Diagonal Arrow Badge */}
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 1H11V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="11"
                    y1="1"
                    x2="1"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* Bottom Title */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Work With Us
              </h3>
            </div>
          </Link>

        </div>
      </section>

      {/* Global CSS for the infinite photo ribbon marquee */}
      <style>{`
        @keyframes ribbonScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-${trackWidth}px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default About;
