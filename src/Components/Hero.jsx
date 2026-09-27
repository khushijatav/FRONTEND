import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7f5] to-[#f7fbfa]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">

        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200/50">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Empathetic, confidential counseling support
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            A healthier mind begins with{" "}
            <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">
              one conversation.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Connect with certified psychologists and compassionate counselors who listen, understand, and guide you towards lasting emotional wellness.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <Link
              to="/contact?action=book"
              className="rounded-full bg-emerald-600 px-7 py-3.5 text-center font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 active:scale-95 text-sm"
            >
              Book an Appointment →
            </Link>

            <Link
              to="/services"
              className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-center font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition text-sm"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-slate-200/80 pt-8">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">10,000+</p>
              <p className="text-xs font-medium text-slate-500">Sessions Completed</p>
            </div>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            <div>
              <p className="text-2xl font-extrabold text-slate-900">50+</p>
              <p className="text-xs font-medium text-slate-500">Certified Experts</p>
            </div>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            <div>
              <p className="text-2xl font-extrabold text-emerald-700">4.9 / 5</p>
              <p className="text-xs font-medium text-slate-500">Client Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-[320px] bg-emerald-100 p-3 shadow-2xl ring-1 ring-emerald-200">
            <img
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1000&q=85"
              alt="Professional mental health counselor"
              className="h-[460px] w-full rounded-[320px] object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
