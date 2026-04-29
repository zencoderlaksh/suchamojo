import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCompass,
  FiHeart,
  FiLayers,
  FiUsers,
} from "react-icons/fi";
import { abc1, ab2, ab3 } from "../../assets/image";
import { useAppStore } from "../../store/useAppStore";

const VALUES = [
  {
    icon: FiCompass,
    title: "Content is Identity",
    body: "Content is not creativity. Content is identity expressed well.",
  },
  {
    icon: FiHeart,
    title: "Your Voice",
    body: "Your voice is your unfair advantage.",
  },
  {
    icon: FiLayers,
    title: "The Future of Brands",
    body: "Personal brands will replace resumes, networks, and even companies.",
  },
  {
    icon: FiUsers,
    title: "Presence over Performance",
    body: "The best brands are not built on performance. They are built on presence.",
  },
];

const About = () => {
  const loadPageSeo = useAppStore((state) => state.loadPageSeo);

  useEffect(() => {
    loadPageSeo(
      "about",
      "About Suchamojo — Personal Branding Consultant, Storyteller, Growth Strategist India",
    ).then((seo) => {
      const fallbackDesc =
        "Suchamojo is a storyteller turned growth strategist who has trained 30,000+ creators across India. Learn how SuchaMojo builds personal brands rooted in identity and clarity.";
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

  return (
    <div className="relative overflow-hidden bg-[#f7f2eb] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(198,119,75,0.24),_transparent_38%),linear-gradient(180deg,_#f9efe4_0%,_#f7f2eb_60%,_#f3eee8_100%)]" />
      <div className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-[#1f4035]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-5rem] top-[38rem] h-72 w-72 rounded-full bg-[#d88663]/12 blur-3xl" />

      <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/60 bg-white/72 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10 lg:p-12">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.32em] text-[#b25a37]">
            About
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[4.7rem]">
            The Story Behind the Mojo.
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base leading-8 text-slate-600">
            I did not come up through the usual route.
            <br />
            <br />I started as a mobile journalist — one of the first in India —
            shooting stories on a phone in places that expensive cameras did not
            go. I covered stories for Hindustan Times, Al Jazeera, and a handful
            of outlets that genuinely changed how I saw people and their lives.
          </p>
        </div>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <img
                src={abc1}
                alt="Founder portrait"
                className="h-[24rem] w-full object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/70">
                <img
                  src={ab2}
                  alt="Suchamojo working session"
                  className="h-44 w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/70">
                <img
                  src={ab3}
                  alt="Brand storytelling visual"
                  className="h-44 w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#eadfce] bg-[#fbf8f2] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">
              Founder
            </p>
            <h2 className="mt-4 font-heading text-3xl text-slate-950 sm:text-4xl">
              Turning identity into influence.
            </h2>
            <div className="mt-6 space-y-5 font-body text-base leading-8 text-slate-600">
              <p>
                That work taught me something I have never forgotten: the most
                powerful thing a person can do is tell their story clearly.
                Because a clear story creates trust. And trust is what moves
                people.
              </p>
              <p>
                From journalism, I moved into creator communities — spending
                years at PLUC and LetMeBreathe, building India's earliest and
                most active creator ecosystems. I trained farmers, students,
                Bollywood professionals, startup founders, and first-generation
                entrepreneurs to turn their identity into influence.
              </p>
              <p>
                30,000+ creators. Across cities, communities, and industries.
                <br />
                Not as a coach. As someone who built alongside them.
              </p>
              <p>
                Today, SuchaMojo is a personal branding agency and enablement
                platform for founders, financial professionals, creators, and
                corporate leaders who want to be remembered — not just seen.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">
            What I believe
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl text-slate-950 sm:text-4xl">
            The principles shaping how Suchamojo builds brands with depth.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {VALUES.map(({ title, body }) => (
              <article
                key={title}
                className="rounded-[1.9rem] border border-white/60 bg-white/74 p-7 shadow-[0_16px_60px_rgba(15,23,42,0.05)]"
              >
                <h3 className="mt-5 font-heading text-2xl text-slate-900">
                  {title}
                </h3>
                <p className="mt-4 font-body text-sm leading-7 text-slate-600">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2.25rem] border border-[#eadfce] bg-[#fbf8f2] px-7 py-10 shadow-[0_24px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-[#b25a37]">
            CTA
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-slate-950 sm:text-4xl">
            We are not here to make you post more. We are here to help you say
            something that matters.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book-a-call"
              className="inline-flex items-center gap-2 rounded-full bg-[#203a32] px-6 py-3 font-body text-[0.7rem] uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#152923]"
            >
              Work With Me
              <FiArrowRight className="text-sm" />
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
};

export default About;
