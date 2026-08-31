import React from "react";

const services = [
  {
    icon: "🧠",
    title: "Individual Counseling",
    description:
      "One-on-one sessions to help you understand yourself and overcome personal challenges.",
  },
  {
    icon: "❤️",
    title: "Relationship Counseling",
    description:
      "Build stronger relationships through better communication and understanding.",
  },
  {
    icon: "🌱",
    title: "Stress Management",
    description:
      "Learn practical techniques to manage stress, anxiety and emotional pressure.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Counseling",
    description:
      "Create healthier family relationships with professional guidance.",
  },
];

const Services = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-emerald-600">
            OUR SERVICES
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Support for every step
          </h2>

          <p className="mt-4 text-slate-600">
            Professional counseling designed around your unique needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-slate-100 bg-[#f8fcfb] p-7 transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                {service.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {service.description}
              </p>

              <button className="mt-6 font-semibold text-emerald-600">
                Learn more →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
