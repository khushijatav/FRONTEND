import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-[#f1f8f6] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

        <div>
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85"
            alt="People talking"
            className="h-full w-full rounded-[520px] object-cover shadow-xl"
          />
        </div>

        <div>
          <p className="font-semibold text-emerald-600">
            WHY MINDCARE?
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            You don't have to figure everything out alone.
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            We believe asking for help is a sign of strength.
            Our platform connects you with qualified professionals
            who create a safe space for you to talk openly.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Licensed and experienced professionals",
              "Private and confidential conversations",
              "Flexible online sessions",
              "Personalized support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
                  ✓
                </span>

                <span className="font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="mt-8 inline-block rounded-full bg-emerald-600 px-7 py-3.5 font-semibold text-white hover:bg-emerald-700"
          >
            Learn More
          </Link>
        </div>

      </div>
    </section>
  );
};

export default About;
