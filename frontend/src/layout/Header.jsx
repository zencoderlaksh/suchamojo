import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "../lib/motion";
import aboutImg from "../assets/image/suchamojo_logo.png";

const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Our Work", to: "/#our-work" },
  { label: "About", to: "/about" },
];

const Header = ({ minimal = false }) => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  if (minimal) {
    return (
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[1.75rem] border border-white/60 bg-white/70 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-slate-900">
            <img
              src={aboutImg}
              alt="EVERYTHING CONTENT"
              className="h-11 w-11 rounded-xl object-cover"
            />
            <div>
              <p className="font-body text-[0.68rem] uppercase tracking-[0.24em] font-black text-slate-900">
                EVERYTHING CONTENT
              </p>
              <p className="font-heading text-xs text-slate-600 sm:text-sm">
                Discovery Call
              </p>
            </div>
          </Link>

          <Link
            to="/contact"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 font-body text-[0.65rem] uppercase tracking-[0.22em] text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
          >
            Contact Instead
          </Link>
        </div>
      </motion.header>
    );
  }

  return (
    <>
      {/* ── Bottom-fixed pill ── */}
      <motion.header
        className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/*
          Pure glassmorphism pill:
          • bg-gray-200/30  → base grey tint (looks grey on plain background)
          • backdrop-blur-xl → blurs whatever is behind; coloured panels bleed through
          • No JS needed — CSS does all the work
        */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-gray-200/30 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl">

          {/* Logo / Avatar */}
          <Link to="/" onClick={closeMenu} className="shrink-0 flex items-center gap-2.5 pr-1">
            <img
              src={aboutImg}
              alt="EVERYTHING CONTENT"
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl object-cover transition duration-300 hover:scale-105"
            />
            <span className="font-heading text-[10px] sm:text-xs font-black tracking-[0.16em] uppercase text-gray-900 hidden sm:inline-block">
              EVERYTHING CONTENT
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center lg:flex">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="group relative px-3.5 py-2 font-body text-[9px] tracking-[0.15em] uppercase text-gray-800 transition duration-300 hover:-translate-y-0.5 hover:text-black font-semibold"
              >
                {label}
                <span className="absolute -bottom-0 left-3 right-3 h-[2px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
              </Link>
            ))}
          </nav>

          {/* Book a Free Call CTA button */}
          <Link
            to="/book-a-call"
            className="hidden shrink-0 rounded-2xl bg-white/90 px-5 py-2.5 font-body text-[9px] font-bold tracking-[0.15em] uppercase text-gray-900 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white hover:shadow-md lg:block"
          >
            Book a Free Call
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 text-gray-800 backdrop-blur-sm transition duration-300 hover:scale-105 lg:hidden"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="text-base font-bold leading-none"
                >
                  ✕
                </motion.span>
              ) : (
                <motion.span
                  key="burger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-[5px]"
                >
                  <span className="h-[2px] w-4 bg-current" />
                  <span className="h-[2px] w-4 bg-current" />
                  <span className="h-[2px] w-4 bg-current" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 left-4 right-4 z-40 rounded-2xl border border-white/40 bg-gray-200/90 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.14)] backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center gap-5">
              <span className="font-heading text-xs font-black tracking-[0.16em] uppercase text-gray-900 border-b border-gray-300/60 pb-2 w-full text-center">
                EVERYTHING CONTENT
              </span>
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={closeMenu}
                  className="font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-800 transition duration-300 hover:text-black"
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/book-a-call"
                onClick={closeMenu}
                className="rounded-2xl bg-slate-900 px-6 py-2.5 font-body text-[10px] font-bold tracking-[0.15em] uppercase text-white shadow-sm transition duration-300 hover:scale-105 hover:bg-[#f97316]"
              >
                Book a Free Call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
