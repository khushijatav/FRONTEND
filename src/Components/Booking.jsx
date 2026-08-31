import React from "react";

const Booking = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-[520px] bg-emerald-700 p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-2">

            <div>
              <p className="font-semibold text-emerald-200">
                BOOK A SESSION
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                Take the first step today.
              </h2>

              <p className="mt-5 leading-7 text-emerald-50">
                Choose a convenient time and connect with a
                counselor who understands you.
              </p>
            </div>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl px-4 py-3.5 text-slate-800 outline-none"
              />

              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl px-4 py-3.5 text-slate-800 outline-none"
              />

              <select className="w-full rounded-xl px-4 py-3.5 text-slate-600 outline-none">
                <option>Select service</option>
                <option>Individual Counseling</option>
                <option>Relationship Counseling</option>
                <option>Stress Management</option>
                <option>Family Counseling</option>
              </select>

              <button
                type="submit"
                className="w-full rounded-xl bg-white py-3.5 font-bold text-emerald-700 hover:bg-emerald-50"
              >
                Request a Session
              </button>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Booking;
