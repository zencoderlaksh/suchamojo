import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "../lib/motion";
import aboutImg from "../assets/image/about.png";

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "PROJECTS", to: "/projects" },
  { label: "JOURNAL", to: "/journal" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

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

          {/* Avatar */}
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <img
              src={aboutImg}
              alt="About"
              className="h-14 w-14 rounded-xl object-cover transition duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center lg:flex">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="group relative px-4 py-2 font-pixel text-[9px] tracking-[0.15em] uppercase text-gray-800 transition duration-300 hover:-translate-y-0.5 hover:text-black"
              >
                {label}
                <span className="absolute -bottom-0 left-3 right-3 h-[2px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
              </Link>
            ))}
          </nav>

          {/* Contact button */}
          <Link
            to="/contact"
            className="hidden shrink-0 rounded-2xl bg-white/80 px-6 py-3 font-pixel text-[9px] tracking-[0.15em] uppercase text-gray-900 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white hover:shadow-md lg:block"
          >
            CONTACT +
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
            className="fixed bottom-24 left-4 right-4 z-40 rounded-2xl border border-white/40 bg-gray-200/30 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.14)] backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center gap-5">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={closeMenu}
                  className="font-pixel text-[9px] tracking-[0.15em] uppercase text-gray-800 transition duration-300 hover:text-black"
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={closeMenu}
                className="rounded-2xl bg-white/80 px-6 py-2.5 font-pixel text-[9px] tracking-[0.15em] uppercase text-gray-900 shadow-sm transition duration-300 hover:scale-105"
              >
                CONTACT +
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
