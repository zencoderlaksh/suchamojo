import { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets/image/index.js";

const Header = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="w-full px-3 py-4 sm:px-4">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex w-full flex-nowrap items-center justify-between gap-3 rounded-2xl bg-gray-300 px-4 py-3 sm:px-6">
          <Link to="/" className="shrink-0" onClick={closeMenu}>
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-5 whitespace-nowrap text-sm font-semibold tracking-wide text-gray-700 lg:flex xl:gap-7 xl:text-base">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/projects">PROJECTS</Link>
            <Link to="/journal">JOURNAL</Link>
          </nav>

          <Link
            to="/contact"
            className="hidden shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold transition hover:scale-105 lg:block xl:px-5 xl:text-base"
          >
            CONTACT +
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? (
              <span className="text-lg font-semibold leading-none text-gray-700">X</span>
            ) : (
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-4 bg-current" />
                <span className="h-0.5 w-4 bg-current" />
                <span className="h-0.5 w-4 bg-current" />
              </span>
            )}
          </button>
        </div>

        {open && (
          <div className="mt-3 rounded-2xl bg-gray-300 p-4 lg:hidden">
            <nav className="flex flex-col items-center gap-4 font-semibold text-gray-700">
              <Link to="/" onClick={closeMenu}>
                HOME
              </Link>
              <Link to="/about" onClick={closeMenu}>
                ABOUT
              </Link>
              <Link to="/projects" onClick={closeMenu}>
                PROJECTS
              </Link>
              <Link to="/journal" onClick={closeMenu}>
                JOURNAL
              </Link>
              <Link to="/contact" onClick={closeMenu} className="rounded-full bg-white px-5 py-2">
                CONTACT +
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
