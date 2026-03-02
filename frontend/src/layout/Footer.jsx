import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="reveal-up mt-0 px-4 pb-2 text-gray-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-t-[2.2rem] border border-white/20 bg-black px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-7 md:grid-cols-[1.2fr_0.7fr_0.8fr]">
          <div className="max-w-md">
            <p className="mb-6 text-sm tracking-[0.18em] text-gray-400 sm:text-base">Suchamojo</p>
            <h2 className="mb-4 text-[1.4rem] leading-none text-white sm:text-[1.7rem]">Story-led Personal Branding</h2>
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
              I help founders, creators, and high-agency professionals<br /> build personal brands rooted
              in identity,<br /> clarity, and long-term trust.
            </p>
          </div>

          <div>
            <ul className="font-display font-normal space-y-3 text-[1rem] leading-[1.2] text-white sm:space-y-3.5 sm:text-[1.15rem]">
              <li><Link to="/" className="font-display font-normal transition duration-300 hover:pl-1 hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="font-display font-normal transition duration-300 hover:pl-1 hover:text-gray-300">About</Link></li>
              <li><Link to="/services" className="font-display font-normal transition duration-300 hover:pl-1 hover:text-gray-300">Services</Link></li>
              <li><Link to="/work" className="font-display font-normal transition duration-300 hover:pl-1 hover:text-gray-300">Work</Link></li>
              <li><Link to="/contact" className="font-display font-normal transition duration-300 hover:pl-1 hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 !font-light text-[1.35rem] leading-none text-white sm:text-[1.6rem]">Social Media</h4>
            <div className="flex gap-3 text-base text-gray-300">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                <FaXTwitter className="float-slow cursor-pointer rounded-full border border-gray-500 p-1.5 text-2xl transition duration-300 hover:scale-110 hover:border-gray-300 hover:text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram className="float-slow cursor-pointer rounded-full border border-gray-500 p-1.5 text-2xl transition duration-300 hover:scale-110 hover:border-gray-300 hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn className="float-slow cursor-pointer rounded-full border border-gray-500 p-1.5 text-2xl transition duration-300 hover:scale-110 hover:border-gray-300 hover:text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <FaYoutube className="float-slow cursor-pointer rounded-full border border-gray-500 p-1.5 text-2xl transition duration-300 hover:scale-110 hover:border-gray-300 hover:text-white" />
              </a>
            </div>
            <div className="mt-6 space-y-1 text-xs font-light text-gray-400 sm:text-sm">
              <p>Presence over performance.</p>
              <p>Identity over algorithms.</p>
            </div>
          </div>
        </div>

        <div className="mt-9 pt-3 text-center">
          <h1 className="text-5xl leading-none tracking-tight text-gray-300 sm:text-6xl md:text-7xl">
            Suchamojo
          </h1>
          <p className="mt-4 text-xs text-gray-500">Copyright Suchamojo. All rights reserved.</p>
          <p className="mt-1 text-xs text-gray-500">Built with intent.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
