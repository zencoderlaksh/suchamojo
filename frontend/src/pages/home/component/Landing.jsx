import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  heroBannerUpdated,
  heroShowreelPhoto,
  contentHeroBts,
  productionEngineSuite,
  storyboardingGrid,
  trainingHeroCreating,
  trainingCorporateStudio,
  trainingNgoField,
  trainingCorporateSpec,
  trainingHeroSpec,
  engineSuitePhoto,
  client1,
  client2,
  client3,
  s9,
  s5,
  abc1,
  ab2,
  ab3,
  j1,
  j2,
  j3,
} from "../../../assets/image/index";

// Optimized pool of crisp, authentic photography (200KB - 1.4MB)
// Heavy uncompressed files (10MB-25MB) were removed to ensure silky-smooth 60-120fps scrolling
const PHOTO_POOL = [
  heroBannerUpdated,
  heroShowreelPhoto,
  contentHeroBts,
  trainingHeroCreating,
  productionEngineSuite,
  trainingCorporateStudio,
  trainingNgoField,
  trainingCorporateSpec,
  trainingHeroSpec,
  storyboardingGrid,
  engineSuitePhoto,
  client1,
  client2,
  client3,
  s9,
  s5,
  abc1,
  ab2,
  ab3,
  j1,
  j2,
  j3,
];

// Initial layout for 15 grid tiles (5 columns x 3 rows)
// Center tile (index 7) permanently anchors the signature hero banner of the founder with microphones
const INITIAL_TILES = [
  // Column 1
  heroShowreelPhoto,
  trainingCorporateStudio,
  j1,
  // Column 2
  contentHeroBts,
  trainingHeroCreating,
  client1,
  // Column 3 (Center)
  storyboardingGrid,
  heroBannerUpdated, // Key centerpiece tile
  productionEngineSuite,
  // Column 4
  trainingNgoField,
  client2,
  s9,
  // Column 5
  engineSuitePhoto,
  j2,
  trainingCorporateSpec,
];

const Landing = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  // Dynamic image state for each tile to enable Sphere Digital's subtle cross-fade cycle
  const [tiles, setTiles] = useState(INITIAL_TILES);
  const [fadingIndices, setFadingIndices] = useState([]);

  // Ref tracking viewport visibility to completely pause RAF when scrolled off-screen
  const isVisibleRef = useRef(true);

  // IntersectionObserver: automatically disconnect RAF and intervals when hero is off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Mouse movement inertia parallax (hardware-accelerated translate3d with lerp damping)
  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMouseActive = false;
    let idleAngle = 0;
    let rafId;

    const handleMouseMove = (e) => {
      // Only process mouse move if the hero is visible in viewport
      if (!isVisibleRef.current) return;

      const containerRect = container.getBoundingClientRect();
      const isInside =
        e.clientX >= containerRect.left &&
        e.clientX <= containerRect.right &&
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom;

      if (isInside) {
        isMouseActive = true;
        const gridRect = grid.getBoundingClientRect();
        const extraWidth = Math.max(80, gridRect.width - containerRect.width);
        const extraHeight = Math.max(60, gridRect.height - containerRect.height);

        // Normalize cursor position from -0.5 (left/top) to 0.5 (right/bottom)
        const normX = Math.max(
          -0.5,
          Math.min(0.5, (e.clientX - containerRect.left) / containerRect.width - 0.5)
        );
        const normY = Math.max(
          -0.5,
          Math.min(0.5, (e.clientY - containerRect.top) / containerRect.height - 0.5)
        );

        targetX = normX * extraWidth;
        targetY = normY * extraHeight;
      }
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    // Smooth 60/120fps animation loop with zero CPU overhead when scrolled off-screen
    const animate = () => {
      if (isVisibleRef.current) {
        if (!isMouseActive) {
          // Gentle harmonic drift when idle or on touch screens
          idleAngle += 0.008;
          targetX = Math.sin(idleAngle) * 20;
          targetY = Math.cos(idleAngle * 0.7) * 14;
        }

        currentX += 0.05 * (targetX - currentX);
        currentY += 0.05 * (targetY - currentY);

        // Hardware-accelerated 3D transform (translate3d) prevents layout repainting
        grid.style.transform = `translate3d(calc(-50% - ${currentX.toFixed(1)}px), calc(-50% - ${currentY.toFixed(1)}px), 0px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Ambient photo-cycle: periodically cross-fades 1 secondary tile to another authentic photo
  // Pauses automatically when scrolled off-screen
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVisibleRef.current) return;

      // Pick 1 random tile index from 0..14 except centerpiece founder tile (index 7)
      const eligibleIndices = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];
      const targetIndex =
        eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];

      setFadingIndices([targetIndex]);

      setTimeout(() => {
        setTiles((prev) => {
          const next = [...prev];
          const currentImg = next[targetIndex];
          const available = PHOTO_POOL.filter(
            (img) => !next.includes(img) && img !== currentImg
          );
          if (available.length > 0) {
            next[targetIndex] =
              available[Math.floor(Math.random() * available.length)];
          } else {
            next[targetIndex] =
              PHOTO_POOL[Math.floor(Math.random() * PHOTO_POOL.length)];
          }
          return next;
        });

        setTimeout(() => {
          setFadingIndices([]);
        }, 80);
      }, 350);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="text-slate-100 overflow-x-hidden bg-[#07080c]">
      <section className="w-full relative">
        {/* Banner Container: Expansive, dark-themed, with signature rounded bottom */}
        <div
          ref={containerRef}
          id="hero-banner"
          className="relative min-h-[92vh] sm:min-h-[95vh] lg:min-h-[98vh] w-full overflow-hidden rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[4.5rem] bg-[#0c0d14] border-b border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between [contain:paint_layout]"
        >
          {/* ========================================================= */}
          {/* BACKGROUND: Interactive Parallax Image Grid (Sphere Digital) */}
          {/* NO BLUR: Images remain crisp, high-definition & vibrant   */}
          {/* ========================================================= */}
          <div
            ref={gridRef}
            className="absolute top-1/2 left-1/2 pointer-events-none select-none will-change-transform grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-[140vw] sm:w-[125vw] lg:w-[118vw] max-w-[1950px] p-4 sm:p-6 [contain:paint_layout] [backface-visibility:hidden] [transform-style:preserve-3d]"
            style={{ transform: "translate3d(-50%, -50%, 0px)" }}
          >
            {tiles.map((src, index) => {
              const isCenterpiece = index === 7;
              const isFading = fadingIndices.includes(index);

              return (
                <div
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-500 bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.45)] [contain:paint] ${
                    isCenterpiece
                      ? "border-orange-500/40 ring-2 ring-orange-500/20"
                      : "border-white/10"
                  } ${isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                >
                  {/* Crystal-Clear Image: Absolutely NO blur or fog */}
                  <img
                    src={src}
                    alt={
                      isCenterpiece
                        ? "Founder & studio session"
                        : "Everything Content documentary and workshop footage"
                    }
                    className="w-full h-full object-cover object-center pointer-events-none select-none filter-none"
                    loading={isCenterpiece || index < 5 ? "eager" : "lazy"}
                    decoding="async"
                  />

                  {/* Subtle dark border gradient for card depth without obscuring image */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/5 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* LIGHTING & CONTRAST VIGNETTES (Sphere Digital Styling)    */}
          {/* Top & bottom fades + soft central radial vignette         */}
          {/* ========================================================= */}
          <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-[#0a0c12] to-transparent pointer-events-none z-[2]" />
          <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/70 to-transparent pointer-events-none z-[2]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,12,18,0.78)_0%,rgba(10,12,18,0.42)_55%,rgba(10,12,18,0.1)_100%)] pointer-events-none z-[3]" />

          {/* ========================================================= */}
          {/* STATIC FOREGROUND CONTENT (Minimalist, Iconic, Uncluttered)*/}
          {/* ========================================================= */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-10 lg:p-14 min-h-[92vh] sm:min-h-[95vh] lg:min-h-[98vh]">
            
            {/* Top Row: Minimalist Eyebrow */}
            <div className="flex items-center justify-start gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-slate-950/60 px-4 py-1.5 backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <p className="font-body text-[0.65rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.24em] text-orange-400">
                  PERSONAL BRANDS • BETTER CONTENT • STRONGER TEAMS
                </p>
              </div>
            </div>

            {/* Center Content: Bold Minimalist Headline & Direct Actions */}
            <div className="my-auto py-6 sm:py-8 text-center max-w-5xl mx-auto flex flex-col items-center">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.15rem] font-black uppercase tracking-tight text-white leading-[1.12] drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)]">
                Everything you need to <br />
                <span className="text-[#f97316] drop-shadow-[0_6px_25px_rgba(249,115,22,0.45)]">
                  make content work.
                </span>
              </h1>

              {/* Minimalist Subtitle: Clean & uncluttered */}
              <p className="mt-4 sm:mt-5 font-body text-xs sm:text-sm lg:text-base font-medium text-slate-200 max-w-xl mx-auto leading-relaxed drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
                Build a personal brand people trust. Create content with a clear strategy. Train your team to execute.
              </p>

              {/* Minimalist Action CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/book-a-call"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f97316] px-7 py-3.5 font-body text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-orange-500/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#ea580c] hover:shadow-orange-500/40 hover:scale-[1.02]"
                >
                  Book a Free Discovery Call
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-white/20 bg-slate-950/60 px-7 py-3.5 font-body text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 hover:shadow-xl"
                >
                  Explore How We Work
                </a>
              </div>
            </div>

            {/* Bottom Row: Corner Taglines (Sphere Digital Reference Style) */}
            <div className="flex items-end justify-between gap-4 pb-12 sm:pb-16 lg:pb-14">
              <div className="hidden sm:block text-left">
                <p className="font-heading text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white leading-tight">
                  Globally Connected.
                </p>
                <p className="font-body text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Personally Focused.
                </p>
              </div>

              <div className="hidden sm:block text-right">
                <p className="font-heading text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white leading-tight">
                  Founder-Led Documentary.
                </p>
                <p className="font-body text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Real Team Workshops.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
