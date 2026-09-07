import React from "react";
import Services from "../Components/Services";

const ServicesPage = () => {
  return (
    <div className="bg-[#f7fbfa]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold text-slate-900">
          Our Services
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Professional mental health and counseling services
          designed around your needs.
        </p>
      </div>

      <Services />
    </div>
  );
};

export default ServicesPage;
