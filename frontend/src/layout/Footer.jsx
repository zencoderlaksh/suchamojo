import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="reveal-up mt-12 rounded-t-[2.5rem] bg-black px-5 pt-12 pb-6 font-body text-gray-300 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand Column */}
          <div className="max-w-md">
            <p className="font-body text-xs font-bold uppercase tracking-[0.24em] text-orange-400">
              Everything Content
            </p>
            <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-extrabold leading-tight text-white uppercase">
              Everything you need to make content work.
            </h2>
            <p className="mt-4 font-body text-xs sm:text-sm leading-relaxed text-gray-400">
              We help founders, professionals, and organisations build personal brands people trust, develop clear content strategies, train teams to execute, and source creative talent.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
              <FaLocationDot className="text-orange-500 shrink-0" />
              <span>Jaipur, India • Remote & On-Location Engagements</span>
            </div>
          </div>

          {/* Services & Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-white">
              Capabilities
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/personal-branding" className="transition hover:text-orange-400 hover:pl-1">
                  Personal Branding
                </Link>
              </li>
              <li>
                <Link to="/book-a-call?service=content-strategy" className="transition hover:text-orange-400 hover:pl-1">
                  Content Strategy
                </Link>
              </li>
              <li>
                <Link to="/content-creation" className="transition hover:text-orange-400 hover:pl-1">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link to="/team-training" className="transition hover:text-orange-400 hover:pl-1">
                  Team Training
                </Link>
              </li>
              <li>
                <Link to="/book-a-call?service=creative-talent" className="transition hover:text-orange-400 hover:pl-1">
                  Creative Talent
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="transition hover:text-orange-400 hover:pl-1">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#our-work" className="transition hover:text-orange-400 hover:pl-1">
                  Our Work
                </a>
              </li>
              <li>
                <Link to="/book-a-call" className="font-bold text-orange-400 transition hover:text-orange-300 hover:pl-1">
                  Book a Free Discovery Call →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-white">
              Connect With Us
            </h3>
            
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="mailto:hello@everythingcontent.in"
                className="inline-flex items-center gap-2.5 text-sm text-gray-300 transition hover:text-white"
              >
                <FaEnvelope className="text-orange-500" />
                <span>hello@everythingcontent.in</span>
              </a>

              <div className="mt-2 flex gap-3 text-base text-gray-300">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-full border border-gray-700 p-2 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-white"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="rounded-full border border-gray-700 p-2 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-white"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="rounded-full border border-gray-700 p-2 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-white"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="rounded-full border border-gray-700 p-2 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-white"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-gray-400">
              <p className="font-semibold text-gray-200">Journalism-Led Content Strategy</p>
              <p className="mt-1">Presence over performance. Identity over algorithms.</p>
            </div>
          </div>
        </div>

        {/* Big Brand Title and Copyright */}
        <div className="mt-12 border-t border-gray-800/80 pt-8 text-center">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white/90">
            Everything Content
          </h1>
          <p className="mt-4 font-body text-xs text-gray-500">
            © 2026 Everything Content. All rights reserved. Built with intent. Jaipur, India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
