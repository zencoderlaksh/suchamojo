import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaPlus,
  FaMinus,
  FaCompass,
  FaLightbulb,
  FaPenNib,
  FaCalendarDays,
  FaImage,
} from "react-icons/fa6";
import { consultationDeckImg, aboutImg, problemImg } from "../../assets/image/index";

const storySources = [
  { num: "01", text: "Your first job." },
  { num: "02", text: "Your biggest mistake." },
  { num: "03", text: "That one conversation that changed how you think." },
  { num: "04", text: "The lesson you learned from a difficult client." },
  { num: "05", text: "Your unpopular opinion about your industry." },
  { num: "06", text: "The things you explain to people every single day." },
];

const pillars = [
  {
    num: "01",
    title: "Discover Your Brand Character",
    hook: "Who are you beyond your job title?",
    description:
      "We explore your personality, experiences, strengths, beliefs and perspective to build a personal brand that feels natural.",
    outcome: "Clear positioning, audience direction and an authentic brand voice.",
    icon: FaCompass,
  },
  {
    num: "02",
    title: "Build Your Content Universe",
    hook: "You don't need to invent something new every morning.",
    description:
      "We discover the themes, stories, questions and opinions that can become your signature content.",
    outcome: "Your Content Universe, story bank and repeatable content ideas.",
    icon: FaLightbulb,
  },
  {
    num: "03",
    title: "Find Your Creative Style",
    hook: "Love speaking but hate writing? Great. Prefer conversations over scripted videos? We can work with that.",
    description:
      "We'll experiment with formats until we find what comes naturally to you.",
    outcome: "Content formats, writing or speaking structures and sample content to create.",
    icon: FaPenNib,
  },
  {
    num: "04",
    title: "Make Content Part of Your Life",
    hook: "Personal branding shouldn't take over your calendar.",
    description:
      "Together, we'll create a practical content routine that fits around your work and life.",
    outcome: "A simple creation workflow, feedback system and 30-day content plan.",
    icon: FaCalendarDays,
  },
];

const experienceSteps = [
  {
    step: "Step 1",
    title: "We Talk",
    detail: "We start with conversations, stories, experiences and the things you genuinely care about.",
  },
  {
    step: "Step 2",
    title: "We Discover",
    detail: "We find the patterns, interesting ideas and unique perspectives hiding in those conversations.",
  },
  {
    step: "Step 3",
    title: "We Create",
    detail: "We experiment with hooks, stories, scripts, posts and videos until you find formats that feel comfortable.",
  },
  {
    step: "Step 4",
    title: "We Make It Repeatable",
    detail: "We build a content creation routine you can keep using without depending on daily inspiration.",
  },
];

const walkAwayItems = [
  "A personal brand direction that represents you.",
  "A Content Universe built around your expertise and experiences.",
  "A bank of stories and ideas you can return to.",
  "Content formats that match your personality.",
  "Practical posts, scripts or video ideas developed together.",
  "A simple 30-day plan to continue creating.",
  "More confidence in expressing yourself online.",
];

const audiences = [
  {
    title: "Founders and Entrepreneurs",
    desc: "You have built something meaningful. Let's tell the stories behind it.",
  },
  {
    title: "Doctors and Professionals",
    desc: "You have knowledge that can help people. Let's make it easier to understand.",
  },
  {
    title: "Finance Professionals",
    desc: "You explain complicated things every day. Let's turn those explanations into accessible, useful content.",
  },
  {
    title: "Leaders and Experts",
    desc: "You have experience, opinions and lessons. Let's give them a voice.",
  },
  {
    title: "First-Time Creators",
    desc: "You want to start but don't know how. Let's make the first step easier.",
  },
];

const faqs = [
  {
    q: "What if I've never created content?",
    a: "Perfectly fine. We begin with what you're comfortable with and build from there.",
  },
  {
    q: "What if I'm uncomfortable on camera?",
    a: "We won't force you into video. We'll explore writing, conversations, voice-led formats or other approaches that suit your strengths.",
  },
  {
    q: "Will you create all my content?",
    a: "This is a guided consulting programme. We'll develop ideas, formats and content together. Full production, editing and account management can be scoped separately.",
  },
  {
    q: "What if I don't have interesting stories?",
    a: "That's exactly what our conversations are designed to explore. Interesting content often comes from everyday experiences and expertise.",
  },
  {
    q: "How much time will I need?",
    a: "We'll agree on a realistic schedule based on your availability and goals before beginning.",
  },
  {
    q: "Will I get followers or clients?",
    a: "We help you build positioning, content skills and a consistent process. Audience and business growth depend on implementation and external factors, so we don't guarantee those outcomes.",
  },
  {
    q: "Can I create in Hindi or Hinglish?",
    a: "Yes, we can discuss the language and formats that feel most natural for you.",
  },
];

const noiseTags = [
  "Post more",
  "Be consistent",
  "Use hooks",
  "Follow trends",
  "Post daily",
  "Use AI",
  "Go viral",
  "Find your niche",
];

const PersonalBranding = () => {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title =
      "Personal Branding Made Fun | 1:1 Consulting | Everything Content";

    const upsertMeta = (selector, attrs, value) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        Object.entries(attrs).forEach(([key, attrValue]) =>
          tag.setAttribute(key, attrValue),
        );
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    upsertMeta(
      'meta[name="description"]',
      { name: "description" },
      "Personal branding doesn't have to be complicated. Discover your stories, find your voice and make content creation fun with 1:1 guidance from Shubham Gupta.",
    );

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] text-slate-900 font-body overflow-x-hidden pt-6 pb-20">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-orange-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.24em] text-orange-700">
                PERSONAL BRANDING, WITHOUT THE PRESSURE.
              </p>
            </div>

            {/* Headline */}
            <h1 className="mt-6 font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950 leading-[1.05]">
              We Make Content Creation Fun for You.
            </h1>

            {/* Subheadline */}
            <p className="mt-5 max-w-3xl mx-auto font-body text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-slate-700">
              You have stories, experiences and ideas worth sharing. We help you discover them, turn them into content and enjoy the process of showing up online.
            </p>

            {/* Core Value Statement */}
            <div className="mt-6 inline-block rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-3.5 shadow-xs">
              <p className="text-sm sm:text-base font-semibold text-slate-700">
                No forced personalities. No complicated strategies. No pressure to become someone you're not.
              </p>
              <p className="mt-1 text-sm sm:text-base font-bold text-orange-600">
                Just your stories, your voice and a content system that feels like you.
              </p>
            </div>

            {/* Consulting Badge */}
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                1:1 personal branding consulting with Shubham Gupta
              </span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/book-a-call?service=personal-branding"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f97316] px-8 py-4 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-orange-500/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#ea580c]"
              >
                LET'S BUILD YOUR PERSONAL BRAND
                <FaArrowRight className="text-xs" />
              </Link>
              <a
                href="#doctor-section"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/90 px-7 py-4 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-slate-900 transition duration-300 hover:bg-slate-900 hover:text-white hover:-translate-y-0.5"
              >
                SEE HOW THE FUN BEGINS
              </a>
            </div>

            {/* Client Hero Visual Placeholder */}
            <div className="mt-12 overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                <FaImage className="text-3xl text-slate-300" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Hero Visual Placement • Image provided by client
                </span>
                <span className="text-[0.68rem] text-slate-400">
                  Ready for high-res creative visual integration
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: YOUR CONTENT DOCTOR (1-Consultation Deck Section)
      ───────────────────────────────────────────────────────────── */}
      <section id="doctor-section" className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-900 bg-slate-950 p-6 shadow-2xl sm:p-10 lg:p-14 text-white">
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

          {/* Section Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-blue-400">
                1:1 Strategy Showcase
              </span>
              <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Your Content Doctor
              </h2>
            </div>
            <p className="max-w-md font-body text-xs sm:text-sm text-gray-400 sm:text-right mt-2 sm:mt-0">
              Very few people can tell you what to post, how to post, and where to post it in a way that actually works for you.
            </p>
          </div>

          {/* Full Presentation of 1-Consultation Deck Image */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl">
            <img
              src={consultationDeckImg}
              alt="Your Content Doctor - Shubham Gupta Consultation Deck"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Slide Narrative Subtext */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-heading text-lg sm:text-xl font-bold text-white">
                "Everyone on the internet is telling you how to create content. Very few people can tell you what to post, how to post, and where to post it, in a way that will actually work for you."
              </p>
              <p className="mt-2 font-body text-sm font-semibold text-orange-400">
                — That's where I come in.
              </p>
            </div>
            <Link
              to="/book-a-call?service=personal-branding"
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-orange-600 hover:-translate-y-0.5"
            >
              Consult with Shubham
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: THE PROBLEM (with Diagnosis Section)
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-red-600">
              THE PROBLEM
            </div>
            <h2 className="mt-4 font-heading text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-950 leading-[1.12]">
              You have so much to say. So why does creating content feel so difficult?
            </h2>

            <div className="mt-6 space-y-3 font-body text-base sm:text-lg text-slate-700">
              <p>You can talk about your work for hours.</p>
              <p>You can explain your ideas to your team, clients and friends.</p>
              <p className="font-semibold text-slate-900">
                But the moment someone asks you to make a LinkedIn post or record an Instagram Reel, everything changes.
              </p>
            </div>
          </div>

          {/* 4 Mental Roadblock Questions */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "What should I talk about?",
              "Will people find this interesting?",
              "What if I don't look good on camera?",
              "Do I really have to post every day?",
            ].map((q, idx) => (
              <div
                key={q}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs transition hover:border-orange-300 hover:bg-white"
              >
                <span className="font-heading text-xl font-black text-slate-300">
                  0{idx + 1}
                </span>
                <p className="mt-2 font-heading text-base font-bold text-slate-900 leading-snug">
                  "{q}"
                </p>
              </div>
            ))}
          </div>

          {/* Transition Paragraph */}
          <div className="mt-8 max-w-3xl">
            <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Here's the thing. You're not short of content. You just haven't discovered how much content already exists in your everyday life.
            </p>
            <p className="mt-2 font-heading text-lg font-bold text-orange-600">
              And that's where we come in.
            </p>
          </div>

          {/* Full Presentation of Problem.png */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-purple-300/80 bg-white p-3 sm:p-6 shadow-2xl">
            <img
              src={problemImg}
              alt="I diagnose the real problem - Shubham Gupta Problem Diagnosis"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Core Takeaway */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-heading text-xl font-black text-slate-900">
                I don't just give content ideas. I diagnose the real problem.
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
                I'm not here to hand you generic gyaan like everyone else on the internet. I help you build your own system, one that's built around how you think, talk, and work.
              </p>
            </div>
            <Link
              to="/book-a-call?service=personal-branding"
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-orange-600 hover:-translate-y-0.5"
            >
              Get Your Diagnosis
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: OUR PHILOSOPHY
      ───────────────────────────────────────────────────────────── */}
      <section id="philosophy" className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] p-6 shadow-2xl sm:p-10 lg:p-14 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.15),transparent_50%)]" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">
              OUR PHILOSOPHY
            </div>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              Your Life Is Full of Content. Let's Find It.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
              You don’t have to manufacture an artificial persona. Your real-world experiences hold the most compelling stories on the internet.
            </p>
          </div>

          {/* 6 Story Cards */}
          <div className="relative z-10 mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {storySources.map((item) => (
              <div
                key={item.num}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/[0.06]"
              >
                <span className="font-heading text-xs font-black tracking-widest text-orange-400">
                  {item.num}
                </span>
                <p className="mt-3 font-heading text-lg font-bold text-white leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Narrative synthesis */}
          <div className="relative z-10 mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
              All of this can become content.
            </h3>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-gray-300 max-w-4xl">
              We sit with you, ask interesting questions, connect the dots and help you discover stories you didn't even realise were worth telling.
              Think of it as a mix of a great conversation, a creative workshop and a personal branding strategy session.
            </p>
            <p className="mt-4 font-heading text-base sm:text-lg font-bold text-orange-400">
              You bring the stories. We help you find the magic in them.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: WHAT WE DO TOGETHER
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">
              WHAT WE DO TOGETHER
            </div>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
              Less Overthinking. More Creating.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
              Four structured phases to uncover your voice, build your library, and establish a repeatable routine.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/60 p-7 sm:p-9 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black tracking-widest text-orange-600">
                        {item.num}
                      </span>
                      <Icon className="text-xl text-slate-400 group-hover:text-orange-500 transition-colors" />
                    </div>

                    <h3 className="mt-5 font-heading text-xl sm:text-2xl font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-orange-600 leading-snug">
                      {item.hook}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                      You leave with:
                    </span>
                    <p className="mt-1 text-xs font-bold text-slate-800 leading-relaxed">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/book-a-call?service=personal-branding"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#f97316] px-8 py-4 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-orange-500/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#ea580c]"
            >
              LET'S FIND YOUR CONTENT STYLE
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: HOW THE EXPERIENCE WORKS
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] p-6 shadow-2xl sm:p-10 lg:p-14 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">
              THE EXPERIENCE
            </div>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              This Isn't Another Boring Consulting Programme.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-300 font-medium">
              It's a creative journey built around you.
            </p>
          </div>

          {/* 4 Steps timeline cards */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experienceSteps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <span className="inline-block rounded-lg bg-orange-500/20 px-2.5 py-1 text-xs font-black tracking-wider text-orange-400">
                  {s.step}
                </span>
                <h3 className="mt-4 font-heading text-xl font-black text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Guarantee banner */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm sm:text-base font-medium text-gray-300">
            No unnecessary jargon. No forcing you to copy creators you don't relate to. Just meaningful conversations, creative experiments and practical work.
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06: WHAT YOU WALK AWAY WITH
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">
              TANGIBLE DELIVERABLES
            </div>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950 leading-[1.08]">
              Not Just Content Ideas. A Whole New Way of Seeing Content.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
              By the end of our work together, the goal is for you to have:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {walkAwayItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-orange-300 hover:bg-white"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                  <FaCheck />
                </span>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/70 p-6 text-center">
            <p className="font-heading text-base sm:text-lg font-bold text-slate-900">
              Most importantly, we want you to stop treating content as a burden and start seeing it as an opportunity to share what you know.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 07: MEET YOUR CONTENT PARTNER
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-md">
                <img
                  src={aboutImg}
                  alt="Shubham Gupta"
                  className="h-80 w-full rounded-2xl object-cover"
                />
                <div className="mt-3 text-center">
                  <h3 className="font-heading text-xl font-black text-slate-900">
                    Shubham Gupta
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Founder of Suchamojo • Journalist turned Storytelling & Growth Strategist
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative Bio */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">
                MEET YOUR CONTENT PARTNER
              </div>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 leading-[1.1]">
                Hi, I'm Shubham. I Ask a Lot of Questions.
              </h2>

              <div className="mt-5 space-y-4 font-body text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                <p>
                  I'm Shubham Gupta, founder of Suchamojo and a journalist turned growth and storytelling strategist.
                </p>
                <p>
                  I started my career finding stories, interviewing people and helping audiences understand the world through content.
                </p>
                <p>
                  Over the years, I've trained thousands of creators and worked with founders, professionals and organisations on storytelling and content.
                </p>
                <div className="rounded-2xl border-l-4 border-orange-500 bg-orange-50/60 p-4 font-semibold text-slate-900">
                  And one thing I've learned is this: Most interesting people don't realise how interesting their stories actually are.
                </div>
                <p>
                  My job is to help you discover those stories, give them structure and turn them into content that feels authentic.
                </p>
                <p>
                  I won't ask you to become an influencer overnight. We'll start with who you are, what you know and what you're excited to share.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 08: WHO THIS IS FOR
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0b0f] p-6 shadow-2xl sm:p-10 lg:p-14 text-white">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-400">
              WHO THIS IS FOR
            </div>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              You Don't Need to Be a Creator to Start Creating.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300 font-medium">
              Designed for busy experts, leaders, and professionals with real expertise to share.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {audiences.map((aud) => (
              <div
                key={aud.title}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-orange-500/40 hover:bg-white/[0.06]"
              >
                <div>
                  <h3 className="font-heading text-base font-bold uppercase text-white leading-snug">
                    {aud.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-gray-400 leading-relaxed font-body">
                    {aud.desc}
                  </p>
                </div>
                <div className="mt-5 h-0.5 w-8 bg-orange-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 09: FAQ
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] sm:p-10 lg:p-14">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">
                FAQ
              </div>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
                Questions About Personal Branding?
              </h2>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.q} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 text-left font-heading text-base sm:text-lg font-bold text-slate-900 transition hover:text-orange-600"
                    >
                      <span>{item.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-xs">
                        {isOpen ? <FaMinus /> : <FaPlus />}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-3 font-body text-sm text-slate-600 leading-relaxed font-medium">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FINAL SECTION: CALL TO ACTION
      ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.6rem] border border-orange-500/30 bg-[#0d0d0d] px-6 py-12 text-center shadow-2xl sm:px-10 sm:py-16 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.3),transparent_65%)]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              You've Spent Years Building Your Experience.
              <br />
              <span className="text-orange-400">Let's Have Some Fun Sharing It.</span>
            </h2>

            <p className="mt-5 font-body text-base sm:text-lg text-gray-300 leading-relaxed font-medium">
              You don't need to become a different person to build a personal brand. You just need to discover your stories, find your style and start creating. We'll help you figure out the rest.
            </p>

            <div className="mt-8">
              <Link
                to="/book-a-call?service=personal-branding"
                className="inline-flex items-center gap-3 rounded-2xl bg-[#f97316] px-8 py-4 font-body text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl shadow-orange-500/35 transition duration-300 hover:-translate-y-0.5 hover:bg-[#ea580c]"
              >
                LET'S MAKE CONTENT FUN
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <p className="mt-4 text-xs uppercase tracking-wider text-gray-400 font-medium">
              Apply for a 1:1 personal branding consultation. If we're a good fit, we'll start with a free 20-minute discovery conversation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalBranding;
