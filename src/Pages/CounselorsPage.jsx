import Counselors from "../Components/Counselors";

const CounselorsPage = () => {
  return (
    <div className="bg-[#f7fbfa] min-h-screen">
      <div className="border-b border-slate-100 bg-white py-14 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            Our Certified Counselors
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Find the Right Therapist for You
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Meet our team of licensed clinical psychologists, relationship therapists, and mental wellness counselors. Schedule a private session in just a few clicks.
          </p>
        </div>
      </div>

      <Counselors showHeader={false} />
    </div>
  );
};

export default CounselorsPage;
