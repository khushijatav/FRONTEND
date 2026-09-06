import React, { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
  });

  const [message, setMessage] = useState("");

  // Input change handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Booking request sent successfully!");

        setFormData({
          name: "",
          email: "",
          service: "",
        });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server connection error");
    }
  };

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        {/* Main Booking Card */}
        <div className="overflow-hidden rounded-3xl bg-emerald-700 shadow-xl">

          <div className="grid md:grid-cols-2">

            {/* Left Side */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">

              <p className="text-sm font-bold tracking-widest text-emerald-200">
                BOOK A SESSION
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Take the first step today.
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-emerald-50 md:text-lg">
                Choose a convenient time and connect with a counselor
                who understands you.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-200"></div>
                <p className="text-sm text-emerald-100">
                  Your information is kept private and secure.
                </p>
              </div>

            </div>

            {/* Right Side - Form */}
            <div className="bg-white p-8 md:p-10 lg:p-12">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Select Service
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">
                      Select a service
                    </option>

                    <option value="Individual Counseling">
                      Individual Counseling
                    </option>

                    <option value="Relationship Counseling">
                      Relationship Counseling
                    </option>

                    <option value="Stress Management">
                      Stress Management
                    </option>

                    <option value="Family Counseling">
                      Family Counseling
                    </option>
                  </select>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-bold text-white shadow-md transition hover:bg-emerald-800 active:scale-[0.98]"
                >
                  Request a Session
                </button>

                {/* Message */}
                {message && (
                  <div
                    className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${
                      message.includes("successfully")
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {message}
                  </div>
                )}

              </form>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Booking;