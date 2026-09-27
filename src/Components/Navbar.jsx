import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Counselors", to: "/counselors" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 transition hover:opacity-90"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-xl font-bold text-white shadow-sm shadow-emerald-200">
            ☘
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
              MindCare
            </h1>
            <p className="text-[11px] font-medium text-emerald-700 leading-none">
              Your mind matters
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-emerald-700 underline decoration-emerald-500 decoration-2 underline-offset-8"
                    : "text-slate-600 hover:text-emerald-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact?action=book"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
          >
            Book Session
          </Link>

          {/* Hamburger button for mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-100 bg-white px-6 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-base font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/contact?action=book"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block w-full rounded-xl bg-emerald-600 py-2.5 text-center font-semibold text-white shadow hover:bg-emerald-700"
            >
              Book Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
