import React from "react";

const testimonials = [
  {
    name: "Ananya R.",
    text: "MindCare gave me a safe place to talk about things I had been carrying for years.",
  },
  {
    name: "Rahul M.",
    text: "The process was simple, private and comfortable. I finally feel more confident.",
  },
  {
    name: "Priya S.",
    text: "Finding the right counselor changed everything for me.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f1f8f6] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold text-emerald-600">
            TESTIMONIALS
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            What our clients say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-7 shadow-sm"
            >
              <div className="text-lg text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-5 leading-7 text-slate-600">
                "{item.text}"
              </p>

              <p className="mt-6 font-bold">
                {item.name}
              </p>

              <p className="text-sm text-slate-500">
                Verified Client
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
