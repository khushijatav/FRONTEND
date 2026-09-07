import React from "react";
import Booking from "../Components/Booking";

const ContactPage = () => {
  return (
    <div className="bg-[#f7fbfa]">

      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold text-slate-900">
          Contact Us
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Ready to talk? Book a session with one of our
          professional counselors.
        </p>
      </div>

      <Booking />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">

          <div className="rounded-2xl bg-[#f1f8f6] p-6">
            <p className="text-2xl">📧</p>
            <h3 className="mt-3 font-bold">Email</h3>
            <p className="mt-2 text-slate-600">
              hello@mindcare.com
            </p>
          </div>

          <div className="rounded-2xl bg-[#f1f8f6] p-6">
            <p className="text-2xl">📞</p>
            <h3 className="mt-3 font-bold">Phone</h3>
            <p className="mt-2 text-slate-600">
              +91 98765 43210
            </p>
          </div>

          <div className="rounded-2xl bg-[#f1f8f6] p-6">
            <p className="text-2xl">📍</p>
            <h3 className="mt-3 font-bold">Location</h3>
            <p className="mt-2 text-slate-600">
              Bhopal, Madhya Pradesh
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;
