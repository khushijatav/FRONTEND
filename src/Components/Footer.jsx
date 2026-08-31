import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-7 text-sm text-slate-500 md:flex-row">

        <p>
          © 2026 MindCare. All rights reserved.
        </p>

        <div className="flex gap-5">
          <a href="#" className="hover:text-emerald-600">
            Privacy
          </a>

          <a href="#" className="hover:text-emerald-600">
            Terms
          </a>

          <a href="#" className="hover:text-emerald-600">
            Help
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
