import React from "react";
import { useNavigate, Link } from "react-router-dom";
import FlowingMenu from "../../../components/FlowingMenu";

// Curated high-resolution imagery for SuchAMojo's signature pillars
const defaultItems = [
  {
    text: "Personal Branding",
    link: "/personal-branding",
    meta: "FOUNDERS & LEADERS",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&h=400&fit=crop&auto=format",
  },
  {
    text: "Content Creation",
    link: "/content-creation",
    meta: "CINEMATIC & REELS",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&h=400&fit=crop&auto=format",
  },
  {
    text: "Content Strategy",
    link: "/book-a-call?service=content-strategy",
    meta: "EDITORIAL CALENDARS",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&h=400&fit=crop&auto=format",
  },
  {
    text: "Team Training",
    link: "/team-training",
    meta: "IN-HOUSE STORYTELLING",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&h=400&fit=crop&auto=format",
  },
  {
    text: "Creative Talent",
    link: "/book-a-call?service=creative-talent",
    meta: "VETTED CREATIVES",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&h=400&fit=crop&auto=format",
  },
];

const FlowingMenuSection = ({
  items = defaultItems,
  title = "Curated Work & Capabilities",
  subtitle = "Hover over each track to explore our signature creative pillars.",
  id = "our-work",
}) => {
  const navigate = useNavigate();

  const handleItemClick = (item, index, event) => {
    if (item.link) {
      if (item.link.startsWith("/")) {
        event.preventDefault();
        navigate(item.link);
      } else if (item.link.startsWith("#")) {
        // Anchor link or placeholder
        if (item.link === "#") {
          event.preventDefault();
        }
      }
    }
  };

  return (
    <section
      id={id}
      className="relative mx-auto mt-14 sm:mt-20 w-full max-w-[1440px] px-4 font-body sm:px-6 lg:px-8"
    >
      {/* Outer Luxury Dark Canvas Frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-slate-800 bg-[#0c0a12] p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        {/* Ambient Top Glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        {/* Section Header */}
        <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <p className="font-body text-xs sm:text-[0.78rem] font-bold uppercase tracking-[0.24em] text-orange-400">
                Interactive Showcase
              </p>
            </div>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            <p className="mt-1 font-body text-xs sm:text-sm text-slate-400">
              {subtitle}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
            <span>Hover to reveal stream</span>
            <span className="text-orange-400">⚡</span>
          </div>
        </div>

        {/* FlowingMenu Interactive Stage */}
        <div className="relative z-10 h-[520px] sm:h-[580px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#120F17]">
          <FlowingMenu
            items={items}
            speed={55}
            stretch={0.6}
            magnet={0.25}
            followCursor={0.4}
            textColor="#ffffff"
            bgColor="#120F17"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#120F17"
            borderColor="rgba(255, 255, 255, 0.12)"
            direction="left"
            duration={0.5}
            bandInset={0}
            bandRadius={0}
            carryContent={false}
            dividers={true}
            dimInactive={true}
            align="center"
            showIndex={true}
            showArrow={true}
            imageShape="pill"
            intro={true}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Bottom Details & CTA Bar */}
        <div className="relative z-10 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-400 font-medium">
            Click any track to explore detailed case studies & engagement formats.
          </p>
          <Link
            to="/book-a-call"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-slate-900 shadow-lg transition duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
          >
            <span>Book a Discovery Call</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlowingMenuSection;

