import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaPlus,
  FaMinus,
  FaPlay,
  FaPause,
  FaFilm,
  FaWandMagicSparkles,
  FaYoutube,
  FaBolt,
  FaBuilding,
  FaBullhorn,
  FaLightbulb,
  FaCamera,
  FaSliders,
  FaGears,
  FaUsers,
  FaHandshake,
  FaLayerGroup,
  FaExpand,
  FaVolumeHigh,
} from "react-icons/fa6";
import {
  s1,
  s2,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s9,
  heroShowreelPhoto,
  storyboardDiagram,
  engineSuitePhoto,
  contentHeroBts,
  storyboardingGrid,
  productionEngineSuite,
} from "../../assets/image/index";

// Section 01 Hero Formats
const heroFormats = [
  "UGC",
  "Brand Films",
  "Launch Videos",
  "AI Videos",
  "YouTube",
  "Social Media Content",
  "Corporate Films",
];

// Showreel quick clips tabs
const showreelClips = [
  {
    id: "master",
    label: "Master Reel 2026",
    tag: "Brand & Commercials",
    duration: "02:18",
    image: heroShowreelPhoto,
    desc: "A montage of our highest-impact brand films, studio commercials, and creator campaigns.",
  },
  {
    id: "ugc",
    label: "UGC Shoots",
    tag: "High Conversion",
    duration: "00:45",
    image: s1,
    desc: "Real people, unboxings, product demonstrations and relatable creator stories.",
  },
  {
    id: "brand",
    label: "Brand Films",
    tag: "Cinematic Grade",
    duration: "01:50",
    image: s8,
    desc: "High-production founder announcements, product launches, and company stories.",
  },
  {
    id: "interviews",
    label: "Interviews & Podcasts",
    tag: "Thought Leadership",
    duration: "03:10",
    image: s7,
    desc: "Multi-camera studio interviews, founder talks, and engaging dialogue formats.",
  },
  {
    id: "ai",
    label: "AI Creative Output",
    tag: "Next-Gen Creative",
    duration: "00:55",
    image: s3,
    desc: "AI-assisted conceptual visualisations, stylized graphics, and futuristic frames.",
  },
  {
    id: "youtube",
    label: "YouTube Shows",
    tag: "Bingeable Series",
    duration: "04:20",
    image: s4,
    desc: "Episodic YouTube shows, educational series, high-CTR thumbnails and pacing.",
  },
];

// Section 02 Problem Points
const ambitions = [
  "A product to launch",
  "A campaign to run",
  "A story to tell",
  "A YouTube channel you've wanted to start",
  "An entire social media calendar waiting for videos",
];

const bottlenecks = [
  "Who writes the script?",
  "Who shoots it?",
  "Who finds the creators?",
  "Who edits the footage?",
  "Who manages revisions?",
  "Who delivers on time?",
];

// Section 03 Everything We Create - Visual Portfolio Grid with Looping Video Previews
const capabilities = [
  {
    num: "01",
    title: "UGC & Creator-Led Content",
    tagline: "Real people. Relatable stories. Content that feels natural.",
    description:
      "We help brands develop creator-led videos, product demonstrations, testimonials, explainers and UGC-style advertising creatives. From creator briefs and scripting to coordination and editing, we bring the pieces together.",
    formats: [
      "UGC ads",
      "Product demos",
      "Testimonials",
      "Unboxings",
      "Creator explainers",
      "App walkthroughs",
    ],
    image: s1,
    icon: FaUsers,
    aspect: "9:16 / 4:5",
    fps: "60 FPS",
    badge: "UGC Engine",
  },
  {
    num: "02",
    title: "Brand Films & Launch Videos",
    tagline: "Your big moment deserves more than a basic announcement.",
    description:
      "We create product launches, brand introduction films, campaign videos and visual stories that explain what makes your business worth noticing. From the first concept to the final film.",
    formats: [
      "Launch films",
      "Product videos",
      "Brand stories",
      "Campaign films",
      "Promotional videos",
      "Event launch content",
    ],
    image: s2,
    icon: FaFilm,
    aspect: "16:9 / 2.39:1",
    fps: "24 FPS Anamorphic",
    badge: "Cinema Grade",
  },
  {
    num: "03",
    title: "AI-Powered Video Content",
    tagline: "Big creative ideas don't always need big production setups.",
    description:
      "We combine AI-assisted creative workflows with human storytelling, art direction and editing to explore concepts, generate visuals and develop video content more efficiently.",
    formats: [
      "AI-assisted product visuals",
      "Conceptual videos",
      "Animated explainers",
      "Campaign visualisations",
      "Creative social videos",
    ],
    image: s3,
    icon: FaWandMagicSparkles,
    aspect: "Dynamic Multi-Aspect",
    fps: "AI Interpolated",
    badge: "Next-Gen AI",
  },
  {
    num: "04",
    title: "YouTube & Long-form Video",
    tagline: "You talk. We handle YouTube.",
    description:
      "From channel strategy and show development to scripting, shooting, editing, thumbnails and publishing support, we help companies build a long-form video presence.",
    formats: [
      "Founder-led shows",
      "Podcasts",
      "Interviews",
      "Educational series",
      "Explainers",
      "Company YouTube channels",
    ],
    image: s4,
    icon: FaYoutube,
    aspect: "16:9 4K HDR",
    fps: "4K 60 FPS",
    badge: "Long-Form",
  },
  {
    num: "05",
    title: "Social Media & Short-form Content",
    tagline: "Your business has something to say every week. We help you say it consistently.",
    description:
      "From expert-led Reels to product-led content, we create repeatable video formats designed for Instagram, LinkedIn, YouTube Shorts and other relevant channels.",
    formats: [
      "Reels",
      "Shorts",
      "Social ads",
      "Interview clips",
      "Product explainers",
      "Behind-the-scenes videos",
    ],
    image: s5,
    icon: FaBolt,
    aspect: "9:16 Vertical",
    fps: "High-Bitrate",
    badge: "Social Engine",
  },
  {
    num: "06",
    title: "Corporate & Business Videos",
    tagline: "Some stories need clarity more than trends.",
    description:
      "We help businesses explain their products, people, processes and expertise through professional video content.",
    formats: [
      "Corporate films",
      "Manufacturing videos",
      "Employee stories",
      "Training videos",
      "Founder messages",
      "Recruitment films",
      "Internal communication videos",
    ],
    image: s6,
    icon: FaBuilding,
    aspect: "16:9 Clean Cut",
    fps: "4K Broadcast",
    badge: "Corporate",
  },
  {
    num: "07",
    title: "Event & Campaign Content",
    tagline: "Your event doesn't end when the lights go off.",
    description:
      "We help plan and capture launches, conferences, exhibitions, workshops and company events, turning important moments into useful content.",
    formats: [
      "Event teasers",
      "Live coverage",
      "Interviews",
      "Recap films",
      "Highlight Reels",
      "Post-event content",
    ],
    image: s7,
    icon: FaBullhorn,
    aspect: "Multi-Platform",
    fps: "Live Capture",
    badge: "Live Event",
  },
];

// Section 04 The Production Engine
const enginePillars = [
  {
    num: "01",
    title: "Strategy & Creative Direction",
    description: "The idea, audience, message, concept and visual direction.",
    icon: FaLightbulb,
    stage: "Pre-Production",
  },
  {
    num: "02",
    title: "Scripts & Storytelling",
    description: "Hooks, narratives, interview questions, storyboards and formats that make people care.",
    icon: FaFilm,
    stage: "Storyboarding",
  },
  {
    num: "03",
    title: "Video Production",
    description: "Camera crews, directors, producers, shoots and practical production planning.",
    icon: FaCamera,
    stage: "On-Set Capture",
  },
  {
    num: "04",
    title: "Editing & Post-production",
    description: "Video editing, motion graphics, sound, captions, packaging and final exports.",
    icon: FaSliders,
    stage: "Editing Suite",
  },
  {
    num: "05",
    title: "AI & Creative Technology",
    description: "AI-assisted visual development and production workflows, guided by human creative judgment.",
    icon: FaWandMagicSparkles,
    stage: "VFX & AI Pipeline",
  },
  {
    num: "06",
    title: "Publishing & Content Management",
    description: "Content calendars, platform-specific adaptation, scheduling and ongoing coordination when included in your scope.",
    icon: FaLayerGroup,
    stage: "Distribution",
  },
];

// Section 05 Built to Scale Models
const scaleModels = [
  {
    title: "Project-Based Creation",
    badge: "Fixed Scope",
    subtitle: "Launches & Signature Assets",
    description:
      "For launches, brand films, one-off campaigns, corporate videos and specific production requirements.",
    highlights: [
      "Full script-to-screen production",
      "Custom crew and creative direction",
      "Defined milestone deliverables",
    ],
  },
  {
    title: "Monthly Content Production",
    badge: "Retainer Engine",
    subtitle: "Always-On Content",
    description:
      "For businesses that need a consistent pipeline of Reels, Shorts, expert videos, product content and campaign creatives.",
    highlights: [
      "Scheduled monthly shoot blocks",
      "Fast turnaround batch editing",
      "Consistent platform presence",
    ],
  },
  {
    title: "End-to-End Content Partnership",
    badge: "Full Stack",
    subtitle: "Dedicated Studio Partner",
    description:
      "For brands that need ongoing strategy, creative direction, production, editing, publishing support and content coordination.",
    highlights: [
      "Strategic roadmap & content calendar",
      "Dedicated creative director & editors",
      "Full distribution & channel packaging",
    ],
  },
  {
    title: "Multi-location & High-volume Production",
    badge: "Enterprise",
    subtitle: "Nationwide & Distributed",
    description:
      "For organisations running campaigns or producing content across different teams, branches, markets or regions.",
    highlights: [
      "On-ground multi-city crew coordination",
      "Centralized post-production standards",
      "Scalable volume delivery pipeline",
    ],
  },
];

// Section 06 How We Work Steps
const pipelineSteps = [
  {
    step: "01",
    title: "Brief Us",
    description: "Tell us about your business, audience, content requirements, timeline and budget.",
    tag: "Kickoff",
  },
  {
    step: "02",
    title: "We Build the Creative Plan",
    description: "We develop concepts, formats, scripts, production requirements and a delivery plan.",
    tag: "Concept & Pre-Pro",
  },
  {
    step: "03",
    title: "Let's Create",
    description: "Our creative and production teams bring the approved ideas to life through shoots, creators, AI-assisted production or a combination of approaches.",
    tag: "Production",
  },
  {
    step: "04",
    title: "Edit, Review, Refine",
    description: "We shape the footage, refine the storytelling and complete agreed review rounds.",
    tag: "Post-Production",
  },
  {
    step: "05",
    title: "Deliver & Distribute",
    description: "We prepare the final content for the agreed platforms and support publishing or ongoing management where included.",
    tag: "Final Delivery",
  },
];

// Section 07 Who We Create For
const industries = [
  {
    title: "Startups & Founders",
    desc: "Launch videos, founder-led content, product explainers and social media.",
    icon: FaBolt,
  },
  {
    title: "Enterprise & Corporate Brands",
    desc: "Brand films, corporate communication, employee stories, internal videos and scalable content programmes.",
    icon: FaBuilding,
  },
  {
    title: "Consumer & D2C Brands",
    desc: "UGC, product demonstrations, creator-led content, campaign videos and advertising creatives.",
    icon: FaBullhorn,
  },
  {
    title: "Real Estate & Hospitality",
    desc: "Property walkthroughs, destination films, customer stories and promotional videos.",
    icon: FaCamera,
  },
  {
    title: "Healthcare & Education",
    desc: "Expert explainers, educational videos, institutional films and brand storytelling.",
    icon: FaLightbulb,
  },
  {
    title: "Manufacturing & B2B Companies",
    desc: "Factory films, process explainers, product demonstrations, leadership content and trade-show videos.",
    icon: FaGears,
  },
  {
    title: "Agencies & Marketing Teams",
    desc: "An external creative production partner to support campaigns, video requirements and content delivery.",
    icon: FaHandshake,
  },
];

// Section 08 Our Work Portfolio
const portfolioCategories = [
  "All Work",
  "Brand & Launch Films",
  "UGC & Creator Content",
  "YouTube & Long-form",
  "Reels & Short-form",
  "Corporate & Business",
  "AI-Assisted Creative",
];

const portfolioItems = [
  {
    category: "Brand & Launch Films",
    client: "NextWave Tech",
    title: "Product Launch: The Next Generation Operating Canvas",
    objective: "Introduce a high-growth tech platform with a bold, cinematic founder-led film.",
    delivered: "Concept, script, 4K multi-camera studio shoot, 3D title design, sound mix & launch cuts.",
    image: s8,
    duration: "02:15",
    tag: "Brand Film",
  },
  {
    category: "UGC & Creator Content",
    client: "Aura Skincare",
    title: "Real Routines: 12-Creator D2C UGC Performance Campaign",
    objective: "Drive conversion and genuine social proof through authentic creator demonstration videos.",
    delivered: "Creator sourcing, hooks & scripting, creator coordination, batch editing & ad variations.",
    image: s1,
    duration: "00:45",
    tag: "UGC Campaign",
  },
  {
    category: "YouTube & Long-form",
    client: "The Growth Blueprint",
    title: "Founder Masterclass Series: Episode 01 to 08",
    objective: "Establish deep authority with high-retention episodic video podcast discussions.",
    delivered: "Studio lighting, multi-cam capture, dynamic chaptering, YouTube packaging & high-CTR thumbnails.",
    image: s4,
    duration: "28:40",
    tag: "YouTube Show",
  },
  {
    category: "Reels & Short-form",
    client: "Venture FinTech",
    title: "Explainers That Stick: 30 Short-Form Insights in 30 Days",
    objective: "Simplify complex market knowledge into bingeable Instagram Reels and LinkedIn clips.",
    delivered: "Monthly batch shoot day, fast-cut typography, hook testing, motion captions & daily schedule.",
    image: s5,
    duration: "00:58",
    tag: "Social Engine",
  },
  {
    category: "Corporate & Business",
    client: "Apex Industrial Corp",
    title: "Precision at Scale: Advanced Manufacturing Documentary",
    objective: "Showcase world-class plant capabilities to international B2B clients and investors.",
    delivered: "On-site industrial cinematography, drone flythroughs, engineer interviews & corporate cut.",
    image: s6,
    duration: "04:30",
    tag: "Corporate Doc",
  },
  {
    category: "AI-Assisted Creative",
    client: "FutureRetail Labs",
    title: "The Virtual Storefront: AI-Generated Concept Film",
    objective: "Visualize a futuristic retail environment before physical construction was complete.",
    delivered: "AI visual workflows, art-directed style transfer, sound design & cinematic color grade.",
    image: s3,
    duration: "01:20",
    tag: "AI Creative",
  },
];

// Section 10 FAQ
const faqs = [
  {
    q: "Can you manage everything from idea to final video?",
    a: "Yes. We can handle concept development, scripting, production, editing and delivery depending on your project scope.",
  },
  {
    q: "Can you create content every month for our brand?",
    a: "Yes. We can structure a monthly content production arrangement around agreed formats, volume, timelines and workflows.",
  },
  {
    q: "Do you create UGC and creator-led content?",
    a: "Yes. We can help with creator briefs, sourcing and coordination, production and editing. Creator fees and usage rights are agreed separately.",
  },
  {
    q: "Can you make AI-generated videos?",
    a: "We support AI-assisted creative production where the format and technology are suitable. The exact visual style and workflow are determined during planning.",
  },
  {
    q: "Can you manage our entire YouTube channel?",
    a: "We can support strategy, show development, production, editing, packaging and publishing, with responsibilities agreed before kickoff.",
  },
  {
    q: "Do you shoot outside Jaipur?",
    a: "We can plan production in other locations subject to crew availability, travel requirements and the agreed budget.",
  },
  {
    q: "How much does video production cost?",
    a: "Pricing depends on the creative concept, length, production requirements, locations, talent, editing complexity and content volume. Share your brief to receive a scoped proposal.",
  },
  {
    q: "Can you guarantee views, leads or viral content?",
    a: "No. We focus on creative quality, agreed deliverables and a sound content process. Distribution and business outcomes depend on several factors.",
  },
];

const ContentCreation = () => {
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [openFaq, setOpenFaq] = useState(null);
  const [activeClip, setActiveClip] = useState(showreelClips[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showRefDeck, setShowRefDeck] = useState(false);

  useEffect(() => {
    document.title = "Video & Content Creation Agency for Brands | Everything Content";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "From UGC and brand films to launch videos, AI content, YouTube and social media, Everything Content helps brands and businesses create video content at scale."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const filteredPortfolio =
    activeCategory === "All Work"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 selection:bg-orange-500 selection:text-white">
      {/* Background Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[650px] w-[650px] rounded-full bg-orange-500/10 blur-[150px]" />
        <div className="absolute top-[35%] -right-40 h-[750px] w-[750px] rounded-full bg-blue-500/10 blur-[170px]" />
        <div className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10">
        {/* =========================================================
            SECTION 01: HERO SECTION
        ========================================================= */}
        <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-400">
                  CONTENT CREATION FOR BRANDS, BUSINESSES & TEAMS
                </span>
              </div>

              {/* Headline */}
              <h1 className="mt-6 font-heading text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
                You Imagine It. <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  We Create It.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-lg font-normal leading-relaxed text-slate-300 sm:text-xl max-w-3xl mx-auto">
                From your first brand video to a full-scale content operation, we bring together the strategy, creative minds, production teams and technology to make it happen.
              </p>

              {/* Formats Strip */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {heroFormats.map((format, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wide text-slate-200 backdrop-blur-sm"
                  >
                    {format}
                  </span>
                ))}
              </div>

              {/* Scope statement */}
              <p className="mt-6 text-sm font-medium leading-relaxed text-slate-400 sm:text-base max-w-2xl mx-auto">
                One video or a hundred. One campaign or an entire content calendar. <br />
                <span className="font-semibold text-slate-200">
                  We make content creation easier, faster and more exciting for your business.
                </span>
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/book-a-call?service=content-creation"
                  className="inline-flex items-center gap-2.5 rounded-full bg-orange-500 px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_32px_rgba(249,115,22,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_18px_40px_rgba(249,115,22,0.5)]"
                >
                  <span>LET'S CREATE SOMETHING</span>
                  <FaArrowRight className="text-xs" />
                </Link>

                <a
                  href="#production-showreel"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <FaPlay className="text-[10px] text-orange-400" />
                  <span>EXPLORE OUR WORK</span>
                </a>
              </div>

              {/* Footnote pill */}
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Done with you. Done for you. Built to scale.</span>
              </div>
            </div>

            {/* =========================================================
                INSERTION 1: FULL-WIDTH PRODUCTION SHOWREEL
                (Based on Client Directive: "Hero: Full-width production showreel.
                 Use quick clips from UGC shoots, brand films, interviews, AI creative output and YouTube")
            ========================================================= */}
            <div id="production-showreel" className="mt-14 scroll-mt-24">
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-4 sm:p-6 shadow-[0_32px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
                {/* Control bar / HUD Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-red-400 border border-red-500/30 font-bold">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      REC [4K PRORES RAW]
                    </span>
                    <span className="text-slate-400 hidden sm:inline">ISO 800 • 5600K • f/2.0</span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1.5 text-orange-400">
                      <span className="h-2 w-2 rounded-full bg-orange-400" />
                      <span className="font-bold">TIMECODE: 00:02:18:04</span>
                    </div>
                    <button
                      onClick={() => setShowRefDeck(!showRefDeck)}
                      className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/10"
                    >
                      <span>{showRefDeck ? "Hide Brief Card" : "View Client Deck Spec"}</span>
                    </button>
                  </div>
                </div>

                {/* Main Video / Showreel Viewport */}
                <div className="relative mt-4 aspect-video sm:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl">
                  <img
                    src={activeClip.image}
                    alt={activeClip.label}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                  {/* Corner Camera Crosshairs */}
                  <div className="pointer-events-none absolute inset-6 border border-white/15">
                    <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-orange-500" />
                    <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-orange-500" />
                    <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-orange-500" />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-orange-500" />
                  </div>

                  {/* Audio Equalizer visual wave in center-right */}
                  <div className="absolute top-6 right-6 hidden md:flex items-end gap-1 h-8 rounded-lg bg-black/60 px-3 py-1.5 border border-white/10 backdrop-blur-md">
                    <span className="h-3 w-1 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="h-5 w-1 bg-emerald-400 rounded-full animate-pulse delay-75" />
                    <span className="h-7 w-1 bg-emerald-400 rounded-full animate-pulse delay-150" />
                    <span className="h-4 w-1 bg-emerald-400 rounded-full animate-pulse delay-100" />
                    <span className="h-6 w-1 bg-amber-400 rounded-full animate-pulse delay-200" />
                    <span className="h-3 w-1 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-300 ml-1.5">CH 1/2</span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="group flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-orange-500/90 text-white shadow-[0_0_50px_rgba(249,115,22,0.6)] backdrop-blur-sm transition duration-300 hover:scale-110 hover:bg-orange-500 cursor-pointer"
                    >
                      {isPlaying ? (
                        <FaPlay className="ml-1 text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110" />
                      ) : (
                        <FaPause className="text-2xl sm:text-3xl" />
                      )}
                    </button>
                    <p className="mt-4 font-heading text-lg sm:text-2xl font-black uppercase tracking-wider text-white drop-shadow-md">
                      {activeClip.label} • {activeClip.duration}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md drop-shadow">
                      {activeClip.desc}
                    </p>
                  </div>

                  {/* Bottom Timeline Scrubber */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-1.5">
                      <span className="font-bold text-orange-400">{activeClip.tag}</span>
                      <span>01:14 / {activeClip.duration}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                      <div className="h-full w-[48%] rounded-full bg-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Showreel Selector Tabs */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      Quick Clips From Across Our Engine:
                    </p>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Select clip to preview
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                    {showreelClips.map((clip) => (
                      <button
                        key={clip.id}
                        onClick={() => setActiveClip(clip)}
                        className={`group relative flex flex-col items-start rounded-xl border p-2.5 text-left transition duration-300 cursor-pointer ${
                          activeClip.id === clip.id
                            ? "border-orange-500 bg-orange-500/15 shadow-md shadow-orange-500/20"
                            : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-[10px] font-mono text-orange-400 font-bold">
                          {clip.duration}
                        </span>
                        <span className="mt-1 text-xs font-bold text-white leading-tight">
                          {clip.label}
                        </span>
                        <span className="text-[9px] text-slate-400 mt-0.5 truncate w-full">
                          {clip.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Client Reference Deck Spec Dropdown */}
                {showRefDeck && (
                  <div className="mt-4 rounded-2xl border border-white/15 bg-white p-4 text-slate-900 transition duration-300">
                    <div className="flex items-center justify-between mb-3 border-b pb-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Client Directive: Full-Width Production Showreel
                      </p>
                      <button
                        onClick={() => setShowRefDeck(false)}
                        className="text-xs font-bold text-slate-500 hover:text-black"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <img
                      src={contentHeroBts}
                      alt="Hero Showreel Reference"
                      className="rounded-xl w-full max-h-96 object-contain border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 02: THE PROBLEM
        ========================================================= */}
        <section className="relative border-y border-white/10 bg-gradient-to-b from-[#0B0F17] to-[#070A0F] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-red-400 uppercase">
                  SECTION 02: THE PROBLEM
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Great Ideas Shouldn't Get Stuck in Production.
              </h2>
            </div>

            {/* Visual Problem & Bottleneck Grid */}
            <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left Column: What You Have */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md lg:col-span-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                    Your Ambition
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-black text-white">
                    You have big momentum to create:
                  </h3>
                  <div className="mt-6 space-y-3">
                    {ambitions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-sm font-medium text-slate-300"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-[10px] font-bold text-orange-400">
                          0{idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
                  Ready to show up consistently and tell stories that matter.
                </div>
              </div>

              {/* Middle Column: The Production Wall */}
              <div className="relative rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-950/20 to-black/60 p-8 backdrop-blur-md lg:col-span-4 flex flex-col justify-between shadow-[0_16px_40px_rgba(239,68,68,0.1)]">
                <div>
                  <span className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 uppercase tracking-widest border border-red-500/30">
                    The Production Bottleneck
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-black text-red-100">
                    Then come the questions that stop projects:
                  </h3>
                  <div className="mt-6 space-y-2.5">
                    {bottlenecks.map((b, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-950/30 p-2.5 text-xs sm:text-sm font-medium text-red-200"
                      >
                        <span className="text-red-400">✕</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-red-500/20 text-xs font-semibold text-red-300">
                  Coordinating 5 disjointed freelancers stalls velocity.
                </div>
              </div>

              {/* Right Column: The Solution */}
              <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-black/60 p-8 backdrop-blur-md lg:col-span-4 flex flex-col justify-between shadow-[0_16px_40px_rgba(16,185,129,0.1)]">
                <div>
                  <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/30">
                    The Everything Content Way
                  </span>
                  <h3 className="mt-4 font-heading text-xl sm:text-2xl font-black text-white">
                    You focus on building your business.
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                    That's where <span className="font-bold text-emerald-400">Everything Content</span> comes in.
                  </p>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                    We handle the people, process and production that bring your content to life. From scriptwriting and talent sourcing to high-end shoots, rapid edits and on-time delivery.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Your Single Creative Partner
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    One brief. Zero coordination headaches. Finished videos that convert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 03: EVERYTHING WE CREATE
            (Includes INSERTION 2: Visual Portfolio Grid with Looping Previews
             AND the Storyboarding Creative Blueprint Showcase)
        ========================================================= */}
        <section id="capabilities" className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-orange-400 uppercase">
                  SECTION 03: EVERYTHING WE CREATE
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                If It Needs Content, We're In.
              </h2>
              <p className="mt-4 text-base font-medium text-slate-300 sm:text-lg">
                Whether you're launching a product, building a brand or trying to show up consistently, we help you create content in the format your audience needs.
              </p>
            </div>

            {/* Visual Portfolio Grid: Looping Video Preview Cards */}
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <article
                    key={item.num}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-lg backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] ${
                      index === 6 ? "md:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    {/* Visual Looping Video Preview Container */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                      {/* Looping indicator badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-1 text-[9px] font-mono font-bold text-orange-400 border border-white/10 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-ping" />
                        <span>LOOPING PREVIEW</span>
                      </div>

                      <div className="absolute top-3 right-3 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-white border border-white/10 backdrop-blur-md">
                        {item.fps}
                      </div>

                      {/* Center Play Button on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl transform scale-90 group-hover:scale-100 transition">
                          <FaPlay className="ml-1 text-sm" />
                        </div>
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-300">
                        <span className="font-bold text-white">{item.badge}</span>
                        <span className="text-slate-400">{item.aspect}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="relative mt-5 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          <IconComponent className="text-base" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-orange-400 font-bold">
                            CATEGORY {item.num}
                          </span>
                          <h3 className="font-heading text-lg font-black text-white leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-xs font-semibold text-orange-300">
                        {item.tagline}
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-slate-300 font-normal">
                        {item.description}
                      </p>

                      {/* Format tags */}
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {item.formats.slice(0, 4).map((fmt, i) => (
                            <span
                              key={i}
                              className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-slate-300"
                            >
                              {fmt}
                            </span>
                          ))}
                          {item.formats.length > 4 && (
                            <span className="rounded-md border border-white/5 bg-orange-500/10 px-2 py-0.5 text-[9px] font-bold text-orange-400">
                              +{item.formats.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action link */}
                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                      <Link
                        to="/book-a-call?service=content-creation"
                        className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-orange-400 transition hover:text-orange-300 uppercase"
                      >
                        <span>Start this format</span>
                        <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Scoped proposal
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* =========================================================
                INSERTION 2 (PART B): STORYBOARDING PRECISION SHOWCASE
                (Based on Client Directive: "Storyboarding - Services: Visual portfolio grid")
            ========================================================= */}
            <div className="mt-20 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Left Storyboard Details */}
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                    <span>Pre-Production Blueprint</span>
                  </div>
                  <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Every High-Performing Film Begins on the Storyboard.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    We map every hook, transition, camera angle, and narrative beat before a single camera starts rolling. Zero guesswork on set. Zero wasted budget.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-xs text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 font-bold text-[10px]">
                        ✓
                      </span>
                      <div>
                        <p className="font-bold text-white">24-Frame Visual Pacing Grid</p>
                        <p className="text-[11px] text-slate-400">Ensures dynamic pacing and seamless viewer retention through every second.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-xs text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 font-bold text-[10px]">
                        ✓
                      </span>
                      <div>
                        <p className="font-bold text-white">Script & Hook Alignment</p>
                        <p className="text-[11px] text-slate-400">Visuals directly support emotional hooks, key value propositions, and calls to action.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/book-a-call?service=content-creation"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300"
                    >
                      <span>Explore our storyboarding process</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>

                {/* Right Storyboard Image Showcase */}
                <div className="lg:col-span-7">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white p-2 sm:p-4 shadow-2xl">
                    <img
                      src={storyboardDiagram}
                      alt="Storyboarding Visual Grid"
                      className="w-full rounded-xl object-contain"
                    />
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-600 px-1">
                      <span>STORYBOARD FRAME SEQUENCE (SHOTS 01-24)</span>
                      <span className="font-bold text-orange-600">DIRECTOR APPROVED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section CTA */}
            <div className="mt-14 text-center">
              <Link
                to="/book-a-call?service=content-creation"
                className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_32px_rgba(249,115,22,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_18px_40px_rgba(249,115,22,0.5)]"
              >
                <span>TELL US WHAT YOU WANT TO CREATE</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 04: THE PRODUCTION ENGINE
            (Includes INSERTION 3: Post-Production Control Suite & Process Showcase)
        ========================================================= */}
        <section className="relative border-y border-white/10 bg-[#090D14] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-blue-400 uppercase">
                  SECTION 04: THE PRODUCTION ENGINE
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                One Creative Partner. <br />
                <span className="text-blue-400">An Entire Content Team.</span>
              </h2>
              <p className="mt-4 text-base font-medium text-slate-300 sm:text-lg">
                You shouldn't have to coordinate five different vendors to produce one great video. We bring together the creative and production capabilities your project needs.
              </p>
            </div>

            {/* =========================================================
                INSERTION 3: PRODUCTION ENGINE SHOWCASE (CONTROL SUITE)
                (Based on Client Directive: "Production engine: Show the process")
            ========================================================= */}
            <div className="mt-14 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900 to-black p-5 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                {/* Editing Suite Image Frame */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                    <img
                      src={engineSuitePhoto}
                      alt="Production Control Suite & Editing Workflow"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* On-Screen Suite Badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/70 p-3 backdrop-blur-md text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-bold text-white">DAVINCI RESOLVE SUITE</span>
                      </div>
                      <span className="text-orange-400">4K DCI TIMELINE • DOLBY 5.1 AUDIO</span>
                    </div>
                  </div>
                </div>

                {/* Right Process Explanation */}
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-[10px] font-bold text-blue-300 uppercase tracking-widest border border-blue-500/30">
                    Studio Workstation in Action
                  </div>
                  <h3 className="mt-3 font-heading text-2xl font-black text-white">
                    Show the Process: Where Story Meets Precision
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Behind every finished reel or commercial is our dedicated post-production engine. We handle color science, audio waveforms, pacing, sound design, and typography under one roof.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                      <p className="text-xs font-bold text-blue-300">DaVinci Studio Color Grading</p>
                      <p className="text-[11px] text-slate-400">Broadcast-grade color consistency across every scene and lighting condition.</p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                      <p className="text-xs font-bold text-blue-300">Multitrack Sound Design & Mastering</p>
                      <p className="text-[11px] text-slate-400">Crisp voice leveling, bespoke sound effects, and licenced music cues that drive rhythm.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Engine Pillars Grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enginePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="group relative rounded-3xl border border-white/10 bg-slate-900/40 p-7 backdrop-blur-sm transition duration-300 hover:border-blue-400/40 hover:bg-slate-900/80"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                        <Icon className="text-lg" />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300 rounded-md bg-blue-500/10 px-2 py-0.5 border border-blue-500/20">
                        {pillar.stage}
                      </span>
                    </div>

                    <h3 className="mt-6 font-heading text-xl font-black text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Banner Statement */}
            <div className="mt-12 rounded-3xl border border-white/15 bg-gradient-to-r from-blue-950/40 via-slate-900 to-orange-950/40 p-8 text-center backdrop-blur-md">
              <p className="font-heading text-lg font-black uppercase tracking-wider text-white sm:text-2xl">
                One brief. One coordinated process. Multiple creative possibilities.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 05: BUILT TO SCALE
        ========================================================= */}
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-purple-400 uppercase">
                  SECTION 05: BUILT TO SCALE
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                One Video Today. A Hundred Tomorrow.
              </h2>
              <p className="mt-4 text-base font-medium text-slate-300 sm:text-lg">
                Different businesses need different levels of production. Some need one important launch film. Others need a steady flow of social videos. And growing businesses may need complete content operations across multiple formats, platforms or locations. We build the production approach around your actual requirements.
              </p>
            </div>

            {/* 4 Scaling Cards */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {scaleModels.map((model, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-7 backdrop-blur-md transition duration-300 hover:border-purple-400/40 hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300 border border-purple-500/30">
                        {model.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                    </div>

                    <h3 className="mt-5 font-heading text-xl font-black text-white">
                      {model.title}
                    </h3>
                    <p className="text-xs font-semibold text-purple-300 mt-1">
                      {model.subtitle}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-slate-300">
                      {model.description}
                    </p>

                    <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                      {model.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <FaCheck className="mt-0.5 text-purple-400 shrink-0 text-[10px]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <Link
                      to="/book-a-call?service=content-creation"
                      className="text-xs font-bold text-purple-300 hover:text-white uppercase tracking-wider inline-flex items-center gap-1.5"
                    >
                      <span>Inquire model</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note & CTA */}
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center max-w-4xl mx-auto">
              <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed">
                We plan the crew, workflow, editorial standards and production capacity around the project.
                <br />
                <span className="font-bold text-white">
                  Whether it's 5 videos or 50, we scope the right system before production begins.
                </span>
              </p>
              <div className="mt-6">
                <Link
                  to="/book-a-call?service=content-creation"
                  className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg transition duration-300 hover:bg-purple-700 hover:-translate-y-0.5"
                >
                  <span>DISCUSS YOUR CONTENT REQUIREMENTS</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 06: HOW WE WORK (Step Pipeline)
        ========================================================= */}
        <section className="relative border-y border-white/10 bg-[#090D14] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-orange-400 uppercase">
                  SECTION 06: HOW WE WORK
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                From "We Have an Idea" to "The Video Is Live."
              </h2>
              <p className="mt-4 text-base font-medium text-slate-300">
                One clear process, from creative brief to finished content.
              </p>
            </div>

            {/* 5-Step Pipeline Grid */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {pipelineSteps.map((s, idx) => (
                <div
                  key={s.step}
                  className="relative rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition duration-300 hover:border-orange-500/40 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-orange-400">
                      {s.step}
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-300 border border-white/10">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-black text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {s.description}
                  </p>

                  {idx < 4 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600 text-xs">
                      ▶
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 07: WHO WE CREATE FOR
        ========================================================= */}
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-emerald-400 uppercase">
                  SECTION 07: WHO WE CREATE FOR
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Every Business Has a Story Worth Creating.
              </h2>
            </div>

            {/* 7 Verticals Grid */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {industries.map((ind, idx) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition duration-300 hover:border-emerald-500/40 hover:-translate-y-1 ${
                      idx === 6 ? "sm:col-span-2 lg:col-span-3 xl:col-span-1" : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Icon className="text-base" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-black text-white">
                      {ind.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {ind.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 08: OUR WORK (Portfolio Showcase)
        ========================================================= */}
        <section id="our-work" className="relative border-y border-white/10 bg-[#090D14] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-orange-400 uppercase">
                  SECTION 08: OUR WORK
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Don't Just Take Our Word for It. Watch the Work.
              </h2>
              <p className="mt-4 text-base font-medium text-slate-300">
                A collection of content created across different formats, businesses and storytelling needs.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPortfolio.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-md transition duration-500 hover:border-orange-500/50 hover:-translate-y-2"
                >
                  <div>
                    {/* Visual Preview Frame */}
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black border border-white/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Play overlay button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/90 text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-orange-600">
                          <FaPlay className="ml-1 text-sm" />
                        </div>
                      </div>

                      {/* Video stats */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono font-bold text-white">
                        <span className="rounded bg-black/70 px-2 py-0.5 border border-white/10">
                          {item.tag}
                        </span>
                        <span className="rounded bg-black/70 px-2 py-0.5 border border-white/10">
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                        {item.client}
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-black text-white">
                        {item.title}
                      </h3>

                      <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Objective:
                        </p>
                        <p className="mt-1 text-xs text-slate-300">
                          {item.objective}
                        </p>
                      </div>

                      <div className="mt-3 rounded-xl border border-orange-500/20 bg-orange-950/20 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-orange-300">
                          Everything Content Delivered:
                        </p>
                        <p className="mt-1 text-xs text-slate-200">
                          {item.delivered}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <Link
                      to="/book-a-call?service=content-creation"
                      className="text-xs font-bold text-orange-400 hover:text-white uppercase tracking-wider inline-flex items-center gap-1.5"
                    >
                      <span>Create similar project</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-14 text-center">
              <Link
                to="/book-a-call?service=content-creation"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <span>EXPLORE OUR WORK</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 10: FREQUENTLY ASKED QUESTIONS
        ========================================================= */}
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-orange-400 uppercase">
                  SECTION 10: FREQUENTLY ASKED QUESTIONS
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Everything you need to know about working with our video and content production team.
              </p>
            </div>

            {/* Accordion */}
            <div className="mt-12 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md transition duration-300 hover:border-white/20"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-6 text-left cursor-pointer"
                    >
                      <span className="font-heading text-base sm:text-lg font-bold text-white pr-4">
                        {faq.q}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-orange-400 border border-white/10">
                        {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/10 px-6 pt-3 pb-6 text-sm leading-relaxed text-slate-300">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA: Your Next Big Content Idea Starts Here
        ========================================================= */}
        <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#090D14] to-black py-24 lg:py-32">
          {/* Spotlight Glows */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-orange-500/20 blur-[130px]" />

          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your Next Big Content <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Idea Starts Here.
              </span>
            </h2>

            {/* Staggered Content Concepts */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
              {[
                "A product launch.",
                "A YouTube series.",
                "A hundred Reels.",
                "A brand film.",
                "An AI-powered campaign.",
                "Or something nobody has tried before.",
              ].map((line, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-sm"
                >
                  {line}
                </span>
              ))}
            </div>

            <p className="mt-8 text-base font-medium text-slate-300 sm:text-xl">
              Whatever you're imagining, let's figure out how to create it.
            </p>

            {/* Action CTA */}
            <div className="mt-10">
              <Link
                to="/book-a-call?service=content-creation"
                className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-9 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_rgba(249,115,22,0.4)] transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-[0_24px_50px_rgba(249,115,22,0.6)]"
              >
                <span>LET'S CREATE SOMETHING</span>
                <FaArrowRight />
              </Link>
            </div>

            <p className="mt-6 text-xs sm:text-sm font-normal text-slate-400 max-w-xl mx-auto leading-relaxed">
              Tell us what you need, when you need it and what you're working with. We'll help you find the right production approach.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentCreation;
