
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white">
            ☘
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              MindCare
            </h1>
            <p className="text-xs text-slate-500">
              Your mind matters
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-slate-600 hover:text-emerald-600"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="font-medium text-slate-600 hover:text-emerald-600"
          >
            Services
          </Link>

          <Link
            to="/counselors"
            className="font-medium text-slate-600 hover:text-emerald-600"
          >
            Counselors
          </Link>

          <Link
            to="/about"
            className="font-medium text-slate-600 hover:text-emerald-600"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="font-medium text-slate-600 hover:text-emerald-600"
          >
            Contact
          </Link>
        </div>

        <Link
          to="/contact"
          className="rounded-full bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700"
        >
          Book Session
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

