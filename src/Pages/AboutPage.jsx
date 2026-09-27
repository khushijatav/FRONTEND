import { Link } from "react-router-dom";
import About from "../Components/About";
import Testimonials from "../Components/Testimonials";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f7fbfa]">
      <div className="border-b border-slate-100 bg-white py-14 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            About MindCare
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Mental Health Care Rooted in Empathy & Science
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-600 leading-relaxed">
            MindCare was founded with a singular purpose: to eliminate the stigma surrounding mental health counseling and make certified professional psychological support accessible to every person.
          </p>
        </div>
      </div>

      <About />

      {/* Core Values Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Our Core Principles</h2>
            <p className="mt-2 text-sm text-slate-600">The values that guide every therapy session</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-7 border border-slate-100">
              <span className="text-3xl">🔒</span>
              <h3 className="mt-4 font-bold text-slate-900 text-lg">Absolute Confidentiality</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Your conversations, personal notes, and identity remain strictly private under standard psychological ethical oaths.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-7 border border-slate-100">
              <span className="text-3xl">🤝</span>
              <h3 className="mt-4 font-bold text-slate-900 text-lg">Unconditional Acceptance</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                A non-judgmental environment where all thoughts, emotions, and life challenges are heard with patience and compassion.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-7 border border-slate-100">
              <span className="text-3xl">💡</span>
              <h3 className="mt-4 font-bold text-slate-900 text-lg">Evidence-Based Healing</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                We utilize proven modalities like CBT, ACT, Mindfulness, and Attachment-focused therapies with real measurable progress.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/counselors"
              className="inline-block rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow hover:bg-emerald-700 transition"
            >
              Meet Our Verified Counselors →
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default AboutPage;
