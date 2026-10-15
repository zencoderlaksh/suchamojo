import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaPlus,
  FaMinus,
  FaPlay,
  FaUsers,
  FaMobileScreenButton,
  FaCamera,
  FaWandMagicSparkles,
  FaLightbulb,
  FaGraduationCap,
  FaBuilding,
  FaHandshake,
  FaLocationDot,
  FaCertificate,
  FaBookOpen,
  FaCompass,
  FaFileLines,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa6";
import {
  c1,
  c2,
  c3,
  c4,
  abc1,
  ab2,
  ab3,
  s7,
  heroShowreelPhoto,
  aboutImg,
  trainingHeroCreating,
  trainingNgoField,
  trainingCorporateStudio,
} from "../../assets/image/index";

// Section 01 Hero Skills
const heroSkills = [
  "Video Storytelling",
  "Content Creation",
  "Mobile Journalism",
  "AI Tools",
  "Team Capacity Building",
];

// Section 02 The Big Idea (Knowledge Holders)
const knowledgeHolders = [
  { role: "Your employees", understanding: "understand your business and day-to-day wins." },
  { role: "Your field teams", understanding: "understand the communities and real people they work with." },
  { role: "Your teachers", understanding: "understand their students and transformative journeys." },
  { role: "Your sales teams", understanding: "understand your customers, objections and insights." },
  { role: "Your leadership team", understanding: "understands the vision, values and where the industry is going." },
];

// Section 03 The 4-Phase Experience Cycle
const experiencePhases = [
  {
    phase: "01",
    title: "Learn It.",
    tagline: "Core Storytelling Principles",
    description: "Understand the fundamentals through real-world examples, simple demonstrations and psychological hooks without academic jargon.",
    icon: FaLightbulb,
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
  },
  {
    phase: "02",
    title: "Try It.",
    tagline: "Live Hands-On Exercises",
    description: "Work on real stories right in the room. Interview colleagues, record test videos, frame shots and experiment with creative formats.",
    icon: FaMobileScreenButton,
    color: "from-rose-500/20 to-red-500/20",
    border: "border-rose-500/30",
  },
  {
    phase: "03",
    title: "Create It.",
    tagline: "Finished Production Output",
    description: "Turn ideas into actual, publish-ready content using practical tools, accessible smartphone gear and streamlined editing workflows.",
    icon: FaCamera,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    phase: "04",
    title: "Keep Doing It.",
    tagline: "Sustainable Internal Systems",
    description: "Leave with the confidence, templates, editorial calendars and repeatable processes to continue creating independently long after we leave.",
    icon: FaCalendarCheck,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
];

// Section 04 Who We Train Programs
const trainingPrograms = [
  {
    id: "01",
    title: "Corporate & Marketing Teams",
    hook: "Turn your employees into your strongest content creators.",
    summary:
      "Your team knows your business better than any outside agency. We train marketing professionals, communications teams, HR departments and internal subject-matter experts to identify stories and turn them into engaging content.",
    focusPoints: [
      "Corporate storytelling and employee-led content",
      "Video creation for LinkedIn, Instagram and YouTube",
      "Founder and leadership video communication",
      "Content planning, scripting and production",
      "Internal content workflows and approvals",
      "AI tools for faster content creation",
    ],
    idealFor: "Businesses, enterprises, marketing departments, communications teams and growing startups.",
    cta: "TRAIN MY COMPANY TEAM",
    serviceParam: "corporate-team-training",
    image: trainingCorporateStudio,
    accent: "orange",
    isCorporate: true,
  },
  {
    id: "02",
    title: "NGOs & Development Organisations",
    hook: "Your impact deserves to be seen, heard and understood.",
    summary:
      "Every development organisation is surrounded by powerful stories. A community member whose life has changed. A field worker making a difference. A programme that deserves to be understood. We train NGO staff, field coordinators, communication teams and community storytellers to document and communicate their work with accuracy, dignity and confidence.",
    focusPoints: [
      "Impact storytelling and programme documentation",
      "Smartphone filmmaking for field teams",
      "Community interviewing and ethical consent",
      "Documentary storytelling and human narratives",
      "Beneficiary and participant stories",
      "Social media storytelling for NGOs",
      "Evidence-led communication and field documentation",
    ],
    idealFor: "NGOs, foundations, CSR teams, social enterprises and development-sector organisations.",
    cta: "BUILD OUR STORYTELLING CAPACITY",
    serviceParam: "ngo-storytelling",
    image: trainingNgoField,
    accent: "emerald",
    isNgo: true,
  },
  {
    id: "03",
    title: "Video Storytelling & Mobile Journalism",
    hook: "You don't need expensive cameras to tell powerful stories.",
    summary:
      "A smartphone can become a remarkably useful storytelling tool when you know how to use it. We train participants to find stories, conduct interviews, shoot sequences and create meaningful videos using accessible equipment.",
    focusPoints: [
      "Finding and developing authentic stories",
      "Smartphone videography fundamentals",
      "Camera angles, framing and cinematic composition",
      "Practical lighting and clean mobile audio",
      "Interviewing techniques and on-camera presence",
      "Scriptwriting and visual pacing",
      "Mobile editing on accessible editing apps",
      "Creating explainers, short docs and social reels",
    ],
    idealFor: "Students, journalists, communication professionals, field teams, creators and institutions.",
    cta: "EXPLORE VIDEO STORYTELLING TRAINING",
    serviceParam: "mobile-journalism",
    image: abc1,
    accent: "blue",
  },
  {
    id: "04",
    title: "Build Your In-House Content Team",
    hook: "Stop depending on one person for every post, video and creative decision.",
    summary:
      "We help organisations develop a repeatable internal content creation process. Your people learn what content to create, how to create it, who approves it and how to keep the system running. This goes beyond a one-day workshop.",
    focusPoints: [
      "Team roles, responsibilities and creative ownership",
      "Content Universe and long-term editorial planning",
      "Systematic story and idea generation routines",
      "Weekly content production schedules and batch shoots",
      "Scriptwriting, filming and fast-turnaround editing",
      "Content review, brand compliance and quality checks",
      "Multi-platform repurposing and distribution",
      "Measuring engagement and improving output",
    ],
    idealFor: "Companies developing internal creative teams, startups, educational institutions and organisations reducing operational dependence on external agencies.",
    cta: "BUILD OUR CONTENT TEAM",
    serviceParam: "in-house-content-team",
    image: c2,
    accent: "purple",
  },
  {
    id: "05",
    title: "AI & Modern Content Creation",
    hook: "Make your team faster without making your content generic.",
    summary:
      "AI can help with research, scripting, ideation, repurposing and parts of the production process. We help your people understand where AI adds value, how to use it responsibly and where human creativity and judgment are essential.",
    focusPoints: [
      "AI-assisted content ideation and hook generation",
      "Rapid research and story structure development",
      "Scriptwriting, voice calibration and editing workflows",
      "Repurposing long-form webinars into short clips",
      "AI-assisted video, B-roll and visual workflows",
      "Prompt engineering and editorial quality review",
      "Practical content production systems for teams",
    ],
    idealFor: "Fast-moving marketing, communications and growth teams looking to multiply creative capacity.",
    cta: "TRAIN MY TEAM ON AI CONTENT",
    serviceParam: "ai-content-training",
    image: heroShowreelPhoto,
    accent: "amber",
  },
];

// Section 05 Curriculum Modules
const curriculumModules = [
  {
    num: "Module 01",
    title: "Finding Stories",
    description: "Discover useful stories hiding in your daily work, people, products, customer conversations and frontline experiences.",
    icon: FaCompass,
  },
  {
    num: "Module 02",
    title: "Storytelling Fundamentals",
    description: "Learn hooks, 3-act narrative structures, audience psychology and ways to explain complex or technical ideas simply.",
    icon: FaBookOpen,
  },
  {
    num: "Module 03",
    title: "Smartphone Video Production",
    description: "Master framing, rule of thirds, practical lighting, crisp mobile audio, composition and practical on-the-go shooting techniques.",
    icon: FaMobileScreenButton,
  },
  {
    num: "Module 04",
    title: "Interviewing & On-Camera Confidence",
    description: "Learn how to ask questions that elicit deep answers, overcome camera shyness and speak naturally on camera.",
    icon: FaUsers,
  },
  {
    num: "Module 05",
    title: "Editing & Content Packaging",
    description: "Turn raw footage into tight short videos, explainers, interviews and social media content with captions and music.",
    icon: FaCamera,
  },
  {
    num: "Module 06",
    title: "Social Media & Distribution",
    description: "Understand how LinkedIn, Instagram, YouTube and internal channels operate and tailor formats for maximum engagement.",
    icon: FaChartLine,
  },
  {
    num: "Module 07",
    title: "AI for Content Creation",
    description: "Explore practical AI tools for research, scripting, repurposing and workflow acceleration while maintaining human judgment.",
    icon: FaWandMagicSparkles,
  },
  {
    num: "Module 08",
    title: "Building a Content System",
    description: "Create simple editorial calendars, creative briefs, approval workflows and review processes that teams continue using.",
    icon: FaCalendarCheck,
  },
];

// Section 06 How Our Training Works (5 Steps)
const trainingSteps = [
  {
    num: "01",
    title: "Understand Your Team",
    desc: "Before the programme, we understand your organisation, content challenges, team structure, existing skills and desired outcomes.",
  },
  {
    num: "02",
    title: "Design the Experience",
    desc: "We build a workshop or training programme around your actual working environment. A corporate marketing team and an NGO field team don't need the same exercises.",
  },
  {
    num: "03",
    title: "Learn by Doing",
    desc: "Participants practise interviewing, scripting, recording, editing and creating content through guided interactive activities.",
  },
  {
    num: "04",
    title: "Review Real Work",
    desc: "We review selected content created during the session, identify improvements and help participants build confidence through constructive feedback.",
  },
  {
    num: "05",
    title: "Build a Repeatable System",
    desc: "Where included in the programme, we help establish templates, responsibilities, workflows and a content plan your team can continue using.",
  },
];

// Section 07 Training Formats
const formats = [
  {
    title: "One-Day Practical Workshop",
    badge: "Intensive",
    duration: "1 Day (6–7 Hours)",
    desc: "Focused hands-on learning around a specific skill such as mobile video, storytelling or content creation.",
    highlights: ["Interactive exercises", "Live smartphone filming", "Immediate feedback session"],
  },
  {
    title: "Multi-Day Training Bootcamp",
    badge: "Deep Dive",
    duration: "2–3 Days",
    desc: "A deeper learning experience with multiple modules, practical field assignments, group challenges and participant feedback.",
    highlights: ["Full end-to-end production", "Advanced scripting & editing", "Team project presentations"],
  },
  {
    title: "30-Day Capacity-Building Programme",
    badge: "Comprehensive",
    duration: "4 Weeks Guided",
    desc: "A structured programme combining training, practical implementation, weekly content reviews and workflow development.",
    highlights: ["Weekly milestone reviews", "Real content publishing", "Dedicated coaching support"],
  },
  {
    title: "Train-the-Trainer Programme",
    badge: "Scale Multiplier",
    duration: "Specialized",
    desc: "Develop selected internal team members who can help others learn, practise and follow the organisation's content process.",
    highlights: ["Training manuals & guides", "Facilitation coaching", "Long-term internal capability"],
  },
  {
    title: "Custom Institutional Programmes",
    badge: "Tailored Scope",
    duration: "Custom Flexible",
    desc: "Training designed around specific teams, branches, field locations, communication requirements and learning objectives.",
    highlights: ["On-location or hybrid", "Curriculum tailored to sector", "Measurable capability metrics"],
  },
];

// Section 09 Post-Training Takeaways
const postTrainingItems = [
  "Videos and stories created by your team during the workshop",
  "Interviewing and storytelling frameworks & cheat sheets",
  "Mobile video production checklists for error-free shoots",
  "Scriptwriting and content planning worksheets",
  "A repeatable, sustainable weekly content workflow",
  "A practical 30-day publishing calendar",
  "Constructive feedback on selected participant work",
  "Guidance for building permanent internal content ownership",
];

// Section 10 FAQ
const faqs = [
  {
    q: "Do participants need prior content creation experience?",
    a: "No. We can build programmes for complete beginners as well as experienced communication and marketing professionals.",
  },
  {
    q: "Can you train employees who are not part of the marketing team?",
    a: "Yes. Some of the most valuable organisational stories come from field workers, sales teams, HR professionals and subject-matter experts.",
  },
  {
    q: "Do you conduct training for NGOs and foundations?",
    a: "Yes. We can design storytelling, mobile journalism, video documentation and capacity-building programmes for development-sector teams.",
  },
  {
    q: "Can you train our team to create content using smartphones?",
    a: "Yes. Phone-first video creation is a key part of our practical training approach. Most participants create finished videos using just their mobile phones.",
  },
  {
    q: "Can you help us build an internal content creation system?",
    a: "Yes. We can combine workshops with content strategy, workflow design and implementation support so your team can produce regularly.",
  },
  {
    q: "Is the training available online or offline?",
    a: "Both formats can be considered. Practical filming exercises and team requirements help determine the best approach, though in-person workshops offer the highest interactive engagement.",
  },
  {
    q: "How many people can attend?",
    a: "Participant capacity depends on the workshop format, trainers, learning objectives and amount of individual feedback required. We run intimate team workshops (10–25 people) as well as larger institutional cohort training.",
  },
  {
    q: "Can you customise the training for our industry?",
    a: "Yes. We adapt examples, exercises and learning objectives to the organisation and participants, whether you are in B2B tech, healthcare, finance, or rural development.",
  },
  {
    q: "How much does team training cost?",
    a: "Fees depend on the training format, number of participants, location, customisation and ongoing support. We prepare a detailed proposal after understanding your requirements.",
  },
];

const TeamTraining = () => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Content Creation & Video Storytelling Training for Teams | Everything Content";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "30,000+ people trained. Everything Content offers hands-on video storytelling, content creation, mobile journalism and capacity-building workshops for companies, NGOs and institutions."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 selection:bg-orange-500 selection:text-white font-body">
      {/* Background Soft Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-[130px]" />
        <div className="absolute top-[45%] -right-32 h-[600px] w-[600px] rounded-full bg-amber-100/50 blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[140px]" />
      </div>

      <div className="relative z-10">
        {/* =========================================================
            SECTION 01: HERO SECTION
        ========================================================= */}
        <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-7">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-600" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
                    30,000+ PEOPLE TRAINED. COUNTLESS STORIES WAITING TO BE TOLD.
                  </span>
                </div>

                {/* Headline */}
                <h1 className="mt-6 font-heading text-4xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  We've Trained 30,000+ People to Tell Better Stories. <br />
                  <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                    Your Team Could Be Next.
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700 font-medium max-w-2xl">
                  Your organisation is full of people with knowledge, ideas and stories worth sharing. We help them become confident storytellers, video creators and content champions through practical, hands-on training.
                </p>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  From corporate teams and marketing departments to NGOs, field workers and institutions, we make content creation something your people can actually do.
                </p>

                {/* Skills Strip */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {heroSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-slate-200 bg-white/80 px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/book-a-call?service=team-training"
                    className="inline-flex items-center gap-2.5 rounded-full bg-orange-600 px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_32px_rgba(234,88,12,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-[0_18px_40px_rgba(234,88,12,0.45)]"
                  >
                    <span>TRAIN YOUR TEAM</span>
                    <FaArrowRight className="text-xs" />
                  </Link>

                  <a
                    href="#who-we-train"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-900 shadow-sm backdrop-blur-sm transition duration-300 hover:border-slate-400 hover:bg-white hover:-translate-y-0.5"
                  >
                    <span>EXPLORE OUR WORKSHOPS</span>
                  </a>
                </div>

                {/* Footnote */}
                <p className="mt-5 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Real skills. Real practice. Content your team can create long after the workshop ends.</span>
                </p>
              </div>

              {/* Right Column: High-Energy Workshop Grid Showcase */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md">
                  {/* Floating Stats Badges */}
                  <div className="absolute -top-4 -left-4 z-20 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
                    <p className="text-2xl font-black text-orange-600">30,000+</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">People Trained</p>
                  </div>

                  <div className="absolute -bottom-4 -right-4 z-20 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
                    <p className="text-2xl font-black text-slate-900">16 Cities</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Across India</p>
                  </div>

                  {/* Main Workshop Visual Collage */}
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900">
                      <img
                        src={trainingHeroCreating}
                        alt="People creating on smartphones, not sitting in a classroom"
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25" />

                      <div className="absolute top-3 left-3 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                        Live Field Practice
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-black/60 p-2.5 backdrop-blur-md text-white">
                        <p className="text-xs font-bold">People creating, not sitting in a classroom</p>
                        <p className="text-[10px] text-slate-300">Hands-on mobile filming, interviewing & storytelling in action</p>
                      </div>
                    </div>

                    {/* Secondary Strip */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200">
                        <img src={c3} alt="Workshop circle" className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase">
                          Workshop Circles
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200">
                        <img src={abc1} alt="Mobile storytelling session" className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase">
                          Mobile Video
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 02: THE BIG IDEA
        ========================================================= */}
        <section className="relative border-y border-slate-200 bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 02: THE BIG IDEA
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                Your Organisation Is Already Full of Storytellers. <br />
                <span className="text-orange-600">They Just Need the Right Training.</span>
              </h2>
            </div>

            {/* Knowledge Holders Grid */}
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {knowledgeHolders.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/10 text-xs font-black text-orange-600">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 font-heading text-base font-black text-slate-900">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {item.understanding}
                  </p>
                </div>
              ))}
            </div>

            {/* The Gap & Solution Box */}
            <div className="mt-12 rounded-3xl border border-slate-200 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-8 sm:p-12 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-orange-200/60 pb-6 lg:pb-0 lg:pr-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                    The Current Reality
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-black text-slate-900">
                    How much of that knowledge actually becomes content?
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                    Usually, very little. Not because people don't have stories. Because nobody has shown them how to identify, capture and communicate those stories without fear or friction.
                  </p>
                </div>

                <div className="lg:col-span-6 lg:pl-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                    What We Change
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-black text-slate-900">
                    Everyday professionals become confident communicators.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                    We help your people create using the tools they already have in their pocket. Sometimes, all it takes is a smartphone, the right questions and a little confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 03: THE EXPERIENCE
        ========================================================= */}
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 03: THE EXPERIENCE
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                No Eight-Hour Lectures. <br />
                <span className="text-orange-600">We Make You Create.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                We believe the best way to learn content creation is to actually create content. That's why our workshops are designed around participation, experimentation and practical exercises.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Your team doesn't just listen to someone explain video storytelling. They learn how to interview, write, shoot, present, edit and publish. They make mistakes, get feedback, try again and discover their creative abilities.
              </p>
            </div>

            {/* 4-Phase Experience Cycle */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {experiencePhases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div
                    key={phase.phase}
                    className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange-300"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xl font-black text-orange-600">
                          {phase.phase}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                          <Icon className="text-base" />
                        </div>
                      </div>

                      <h3 className="mt-5 font-heading text-2xl font-black text-slate-950">
                        {phase.title}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mt-1">
                        {phase.tagline}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {phase.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span>Hands-on activity</span>
                      <FaArrowRight className="text-[10px]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Punchline Statement */}
            <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-center text-white shadow-xl">
              <p className="font-heading text-lg sm:text-2xl font-black uppercase tracking-wide text-orange-400">
                The goal isn't to make everyone an influencer.
              </p>
              <p className="mt-1 text-sm sm:text-lg font-medium text-slate-200">
                It's to make everyone in your organisation a better, clearer, and more confident storyteller.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 04: WHO WE TRAIN
        ========================================================= */}
        <section id="who-we-train" className="relative border-y border-slate-200 bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 04: WHO WE TRAIN
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                From Boardrooms to Villages. <br />
                <span className="text-orange-600">Stories Are Everywhere.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                We design training programmes for different people, organisations and communication needs.
              </p>
            </div>

            {/* 5 Distinct Program Cards */}
            <div className="mt-16 space-y-12">
              {trainingPrograms.map((prog, idx) => (
                <div
                  key={prog.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-10 shadow-sm transition duration-300 hover:border-orange-300 hover:shadow-lg"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    {/* Left text & focus */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-orange-600 px-3 py-1 text-xs font-mono font-bold text-white">
                          PROGRAM {prog.id}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {prog.idealFor}
                        </span>
                      </div>

                      <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-black text-slate-950">
                        {prog.title}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-orange-600 mt-1">
                        {prog.hook}
                      </p>

                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                        {prog.summary}
                      </p>

                      {/* Training Focus Checklist */}
                      <div className="mt-6 border-t border-slate-200 pt-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                          Training Focus & Curriculum:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {prog.focusPoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                              <FaCheck className="mt-1 text-orange-600 shrink-0 text-xs" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-8">
                        <Link
                          to={`/book-a-call?service=${prog.serviceParam}`}
                          className="inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-7 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-md transition duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
                        >
                          <span>{prog.cta}</span>
                          <FaArrowRight className="text-[10px]" />
                        </Link>
                      </div>
                    </div>

                    {/* Right visual card */}
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md">
                        <img
                          src={prog.image}
                          alt={prog.title}
                          className="h-full w-full object-cover transition duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        
                        {/* Custom directive badges */}
                        {prog.isCorporate && (
                          <div className="absolute top-3 left-3 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                            Corporate Studio in Action
                          </div>
                        )}

                        {prog.isNgo && (
                          <div className="absolute top-3 left-3 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                            Real Field Storytelling
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-black/65 p-3 backdrop-blur-md text-white">
                          <p className="text-xs font-bold">{prog.title}</p>
                          {prog.isCorporate ? (
                            <p className="text-[10px] text-slate-300">
                              Show the Before & After: From struggling to create to producing repeatable videos & scripts
                            </p>
                          ) : prog.isNgo ? (
                            <p className="text-[10px] text-slate-300">
                              Real field storytelling: Interviewing participants & capturing ethical documentary stories
                            </p>
                          ) : (
                            <p className="text-[10px] text-slate-300">Practical hands-on cohort session</p>
                          )}
                        </div>
                      </div>

                      {/* Before / After Box for Corporate */}
                      {prog.isCorporate && (
                        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                          <div className="rounded-lg bg-red-50 p-2 border border-red-100">
                            <span className="font-bold text-red-700 block mb-1">Before Training</span>
                            <span className="text-slate-600 block leading-tight">Camera shyness, zero workflow, 3-week approval delays</span>
                          </div>
                          <div className="rounded-lg bg-emerald-50 p-2 border border-emerald-100">
                            <span className="font-bold text-emerald-700 block mb-1">After Training</span>
                            <span className="text-slate-700 block leading-tight">Fast scripts, confident on-camera leaders, weekly videos</span>
                          </div>
                        </div>
                      )}

                      {/* Field checklist box for NGO */}
                      {prog.isNgo && (
                        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-[11px]">
                          <p className="font-bold text-emerald-950 mb-1">Field Storytelling Standards</p>
                          <p className="text-slate-700 leading-tight">
                            Documenting projects with dignity, ethical consent protocols, and smartphone production suited for remote communities.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dedicated Procurement Tracks Notice (As recommended in client brief) */}
            <div className="mt-14 rounded-3xl border border-slate-200 bg-gradient-to-r from-orange-50 via-slate-50 to-emerald-50 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    Tailored Procurement & Invoicing Tracks
                  </span>
                  <h3 className="mt-3 font-heading text-xl sm:text-2xl font-black text-slate-900">
                    Need Separate Corporate L&D or NGO Sector Proposals?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
                    We know corporate enterprises and development-sector organisations have different buyers, budgets, compliance and procurement processes. We prepare scoped proposals tailored to your specific internal approvals.
                  </p>
                </div>
                <Link
                  to="/book-a-call?service=team-training"
                  className="shrink-0 rounded-full bg-orange-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-orange-700 transition"
                >
                  REQUEST TAILORED PROPOSAL
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 05: WHAT YOUR TEAM WILL LEARN
        ========================================================= */}
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 05: WHAT YOUR TEAM WILL LEARN
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                From "I Don't Know How" <br />
                <span className="text-orange-600">to "I Can Create This."</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                Our programmes can combine different modules based on your organisation's goals and existing workflow.
              </p>
            </div>

            {/* 8 Module Cards */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {curriculumModules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.num}
                    className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:border-orange-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                          {mod.num}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <Icon className="text-sm" />
                        </div>
                      </div>

                      <h3 className="mt-5 font-heading text-lg font-black text-slate-950">
                        {mod.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {mod.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400">
                      Module component
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 06: HOW OUR TRAINING WORKS
        ========================================================= */}
        <section className="relative border-y border-slate-200 bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 06: HOW OUR TRAINING WORKS
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                We Don't Just Conduct Workshops. <br />
                <span className="text-orange-600">We Build Capability.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-700">
                The workshop ends. The learning should continue.
              </p>
            </div>

            {/* 5 Process Steps */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {trainingSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className="relative rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm transition duration-300 hover:border-orange-300 hover:bg-white hover:shadow-md"
                >
                  <span className="font-mono text-3xl font-black text-orange-600">
                    {step.num}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-black text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {step.desc}
                  </p>

                  {idx < 4 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-300 text-xs">
                      ▶
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 07: TRAINING FORMATS
        ========================================================= */}
        <section id="training-formats" className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 07: TRAINING FORMATS
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                One Team or an Entire Organisation. <br />
                <span className="text-orange-600">We'll Design the Right Programme.</span>
              </h2>
            </div>

            {/* Formats Grid */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {formats.map((fmt, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 ${
                    idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-800">
                        {fmt.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{fmt.duration}</span>
                    </div>

                    <h3 className="mt-5 font-heading text-xl font-black text-slate-950">
                      {fmt.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {fmt.desc}
                    </p>

                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                      {fmt.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <FaCheck className="text-emerald-600 shrink-0 text-[10px]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      to="/book-a-call?service=team-training"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700"
                    >
                      <span>Inquire this format</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-slate-500">
              * Duration, participant capacity, location, resources and deliverables are confirmed in the proposal.
            </p>
          </div>
        </section>

        {/* =========================================================
            SECTION 08: MEET YOUR TRAINER
        ========================================================= */}
        <section className="relative border-y border-slate-200 bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Trainer Visual & Stats */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-3 shadow-2xl">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-slate-800">
                    <img
                      src={aboutImg}
                      alt="Shubham Gupta Trainer"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 rounded-xl bg-white/10 p-4 backdrop-blur-md text-white text-center">
                    <p className="font-heading text-lg font-black">Shubham Gupta</p>
                    <p className="text-xs text-orange-300">Journalist Turned Storytelling & Growth Strategist</p>
                  </div>
                </div>
              </div>

              {/* Right Trainer Narrative */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                    SECTION 08: MEET YOUR TRAINER
                  </span>
                </div>

                <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                  30,000+ People Trained. <br />
                  <span className="text-orange-600">One Belief: Everyone Has a Story.</span>
                </h2>

                <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                  <p>
                    My work began with a camera, a story and a curiosity about people. Over the years, I've worked in journalism, mobile storytelling, content strategy and creator training.
                  </p>
                  <p>
                    I've trained more than <span className="font-bold text-slate-950">30,000 people across 16 Indian cities</span>, helping participants discover how to tell stories and create content with the tools available to them.
                  </p>
                  <p className="rounded-2xl border border-orange-200 bg-orange-50/70 p-5 font-medium text-slate-900 italic">
                    "One thing that has stayed consistent throughout my training experience: You don't need to be a professional creator to tell an important story. You need curiosity, practice, guidance and the confidence to begin. That's what I want people to experience in our workshops."
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-2xl font-black text-slate-950">30k+</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Participants</p>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div>
                    <p className="text-2xl font-black text-slate-950">16</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Cities Trained In</p>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div>
                    <p className="text-2xl font-black text-slate-950">100%</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Hands-On Practice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 09: WHAT HAPPENS AFTER TRAINING?
        ========================================================= */}
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 09: WHAT HAPPENS AFTER TRAINING?
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                We Don't Want Your Team <br />
                <span className="text-orange-600">to Forget Everything by Monday.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                The real test of a workshop is what people can do after it ends. Our aim is to help participants leave with practical skills and materials they can actually use.
              </p>
            </div>

            {/* Checklist of Deliverables */}
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {postTrainingItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:border-emerald-300 hover:shadow-md"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    ✓
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 text-center max-w-3xl mx-auto">
              <p className="font-heading text-base sm:text-xl font-black text-emerald-950">
                What Success Looks Like
              </p>
              <p className="mt-2 text-sm sm:text-base text-emerald-800 leading-relaxed">
                Success means your people become more confident and capable of creating content without needing someone to hold their hand every time.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 10: FREQUENTLY ASKED QUESTIONS
        ========================================================= */}
        <section className="relative border-y border-slate-200 bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-800">
                  SECTION 10: FREQUENTLY ASKED QUESTIONS
                </span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                Everything you need to know about our team storytelling workshops and capacity-building programmes.
              </p>
            </div>

            {/* Accordion */}
            <div className="mt-12 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 transition duration-300 hover:border-slate-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-6 text-left cursor-pointer"
                    >
                      <span className="font-heading text-base sm:text-lg font-bold text-slate-900 pr-4">
                        {faq.q}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-orange-600 border border-slate-200 shadow-sm">
                        {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-200 bg-white px-6 pt-3 pb-6 text-sm leading-relaxed text-slate-700">
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
            FINAL SECTION: Your Team Has the Stories. We'll Help Them Tell Them.
        ========================================================= */}
        <section className="relative overflow-hidden bg-slate-950 py-24 lg:py-32 text-white">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-orange-600/20 blur-[130px]" />

          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your Team Has the Stories. <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                We'll Help Them Tell Them.
              </span>
            </h2>

            {/* Staggered lines */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
              {[
                "Somewhere in your organisation is a great interviewer.",
                "A natural presenter.",
                "A future video creator.",
                "A colleague who knows exactly how to explain your work.",
                "They might not know it yet. Let's help them discover it.",
              ].map((line, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-sm"
                >
                  {line}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/book-a-call?service=team-training"
                className="inline-flex items-center gap-3 rounded-full bg-orange-600 px-9 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_rgba(234,88,12,0.4)] transition duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-[0_24px_50px_rgba(234,88,12,0.6)]"
              >
                <span>LET'S TRAIN YOUR TEAM</span>
                <FaArrowRight />
              </Link>

              <Link
                to="/book-a-call?service=custom-workshop"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <span>DISCUSS A CUSTOM WORKSHOP</span>
              </Link>
            </div>

            <p className="mt-6 text-xs sm:text-sm font-normal text-slate-400 max-w-xl mx-auto leading-relaxed">
              Tell us about your organisation, the people you want to train and the skills you want them to develop.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamTraining;
