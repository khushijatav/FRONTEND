import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-[#f1f8f6] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

        <div className="relative">
          <div className="overflow-hidden rounded-[520px] bg-emerald-100 p-2 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85"
              alt="People talking in counseling session"
              className="h-full w-full rounded-[520px] object-cover"
            />
          </div>
        </div>

        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Why Choose MindCare?
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            You don't have to carry everything alone.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            We believe seeking help is the ultimate act of courage. MindCare brings verified, empathetic clinical psychologists and counselors directly to you — whether you prefer private online video calls or in-person therapy.
          </p>

          <div className="mt-8 space-y-3.5">
            {[
              "100% Confidential & Secure Patient Records",
              "RCI Licensed and Certified Clinical Psychologists",
              "Evidence-based treatments (CBT, Mindfulness, Emotion-Focused)",
              "Flexible scheduling across online and clinic sessions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                  ✓
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex items-center gap-4">
            <Link
              to="/about"
              className="rounded-full bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
            >
              Our Story & Mission
            </Link>

            <Link
              to="/counselors"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-emerald-500 transition"
            >
              Meet The Team
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
