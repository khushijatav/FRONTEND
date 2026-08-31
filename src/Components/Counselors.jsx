import React from "react";

const counselors = [
  {
    name: "Dr. Sarah Johnson",
    role: "Clinical Psychologist",
    experience: "8+ years experience",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Dr. Michael Lee",
    role: "Mental Health Counselor",
    experience: "6+ years experience",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Emily Williams",
    role: "Relationship Therapist",
    experience: "7+ years experience",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80",
  },
];

const Counselors = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold text-emerald-600">
            OUR COUNSELORS
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Meet our professionals
          </h2>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {counselors.map((counselor) => (
            <div
              key={counselor.name}
              className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={counselor.image}
                alt={counselor.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold">
                  {counselor.name}
                </h3>

                <p className="mt-1 font-medium text-emerald-600">
                  {counselor.role}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  {counselor.experience}
                </p>

                <button className="mt-5 w-full rounded-xl border border-emerald-200 py-3 font-semibold text-emerald-700 hover:bg-emerald-50">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Counselors;
