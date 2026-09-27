const testimonials = [
  {
    name: "Ananya R.",
    role: "Working Professional",
    service: "Stress & Anxiety Management",
    text: "MindCare gave me a safe, non-judgmental space to talk about things I had been carrying silently for years. My counselor taught me practical grounding techniques that changed my daily work life.",
    rating: 5,
  },
  {
    name: "Rahul M.",
    role: "Postgraduate Student",
    service: "Career Guidance & Burnout",
    text: "The booking process was seamless, completely private and comfortable. After just 4 sessions, I felt more confident in making decisions and dealing with academic pressure.",
    rating: 5,
  },
  {
    name: "Priya & Siddharth S.",
    role: "Married 4 Years",
    service: "Couples Therapy",
    text: "Finding Emily through MindCare saved our relationship. We learned how to stop arguing reactively and actually understand each other's emotional triggers.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f1f8f6] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Real Stories, Real Healing
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            What our clients share
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Hear from individuals and couples whose lives were transformed through counseling.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-slate-100/80 transition hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {"★".repeat(item.rating)}
                </div>

                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {item.service}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="font-bold text-slate-900 text-sm">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">
                  {item.role} • <span className="text-emerald-600 font-semibold">Verified Client</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
