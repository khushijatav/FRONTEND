import React from "react";
import About from "../components/About";

const AboutPage = () => {
  return (
    <div>
      <div className="bg-[#f7fbfa] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-slate-900">
            About MindCare
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            We are making professional mental health support
            easier and more accessible.
          </p>
        </div>
      </div>

      <About />
    </div>
  );
};

export default AboutPage;
