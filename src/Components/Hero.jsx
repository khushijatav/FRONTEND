import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#f7fbfa]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

        <div>
          <div className="mb-6 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            ● Your mental health matters
          </div>

          <h1 className="text-5xl font-bold leading-tight text-slate-900 sm:text-6xl">
            A healthier mind starts with{" "}
            <span className="text-emerald-600">
              one conversation.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Connect with experienced and compassionate counselors
            who are here to listen, understand and support you.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/counselors"
              className="rounded-full bg-emerald-600 px-7 py-3.5 text-center font-semibold text-white hover:bg-emerald-700"
            >
              Find Your Counselor →
            </Link>

            <Link
              to="/services"
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-center font-semibold text-slate-700 hover:border-emerald-300"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-10 flex gap-10">
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-slate-500">People helped</p>
            </div>

            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-slate-500">Counselors</p>
            </div>

            <div>
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-sm text-slate-500">Rating</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[520px] bg-emerald-100 p-3 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1000&q=85"
              alt="Counseling"
              className="h-full w-full rounded-[520px] object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
