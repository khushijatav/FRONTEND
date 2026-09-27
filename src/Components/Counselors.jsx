import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../Service/axiosInst";

const fallbackCounselors = [
  {
    _id: "c-1",
    name: "Dr. Sarah Johnson",
    role: "Clinical Psychologist",
    specialization: "Anxiety, Depression & CBT",
    experience: "8+ years experience",
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    fee: "₹1,500 / session",
    languages: ["English", "Hindi"],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    _id: "c-2",
    name: "Dr. Michael Lee",
    role: "Mental Health Counselor",
    specialization: "Stress Management & Burnout",
    experience: "6+ years experience",
    rating: 4.8,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    fee: "₹1,200 / session",
    languages: ["English", "Hindi"],
    availableDays: ["Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  {
    _id: "c-3",
    name: "Emily Williams",
    role: "Relationship Therapist",
    specialization: "Couples & Marriage Therapy",
    experience: "7+ years experience",
    rating: 4.9,
    reviewsCount: 115,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80",
    fee: "₹1,800 / session",
    languages: ["English", "Hindi"],
    availableDays: ["Mon", "Wed", "Thu", "Sat", "Sun"],
  },
];

const Counselors = ({ showHeader = true, limit = null }) => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [activeProfile, setActiveProfile] = useState(null);

  const specialties = [
    "All",
    "Anxiety & Depression",
    "Stress & Burnout",
    "Couples & Marriage",
    "Psychiatry",
  ];

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get("/api/counselors")
      .then((res) => {
        if (isMounted) {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setCounselors(res.data);
          } else {
            setCounselors(fallbackCounselors);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("Could not load counselors from API, using fallback:", err.message);
          setCounselors(fallbackCounselors);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCounselors = counselors
    .filter((c) => {
      if (selectedSpecialty === "All") return true;
      const spec = (c.specialization || "").toLowerCase();
      const role = (c.role || "").toLowerCase();
      const target = selectedSpecialty.toLowerCase();
      return spec.includes(target) || role.includes(target);
    })
    .slice(0, limit || counselors.length);

  return (
    <section className="bg-white py-16 md:py-20" id="counselors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {showHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              Verified Mental Health Experts
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Meet our compassionate counselors
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Every counselor at MindCare is certified, experienced, and dedicated to creating a safe and non-judgmental space.
            </p>

            {/* Specialization Filter */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    selectedSpecialty === spec
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-14 flex justify-center py-12">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          </div>
        )}

        {!loading && (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCounselors.map((counselor) => (
              <div
                key={counselor._id || counselor.name}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-200"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={
                        counselor.image ||
                        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80"
                      }
                      alt={counselor.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80";
                      }}
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur flex items-center gap-1">
                      ⭐ {counselor.rating || "4.9"} ({counselor.reviewsCount || 100}+)
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      {counselor.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-emerald-600">
                      {counselor.role || "Licensed Counselor"}
                    </p>

                    <p className="mt-2 text-xs font-medium text-slate-500">
                      🎯 {counselor.specialization}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5">
                        ⏳ {counselor.experience || "5+ yrs"}
                      </span>
                      {counselor.fee && (
                        <span className="rounded-md bg-emerald-50 font-bold text-emerald-800 px-2 py-0.5">
                          💰 {counselor.fee}
                        </span>
                      )}
                    </div>

                    {counselor.bio && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
                        {counselor.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex gap-2.5">
                  <button
                    onClick={() => setActiveProfile(counselor)}
                    className="flex-1 rounded-xl border border-emerald-200 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50 text-center"
                  >
                    View Profile
                  </button>

                  <Link
                    to={`/contact?counselor=${encodeURIComponent(counselor.name)}`}
                    className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 text-center flex items-center justify-center"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile Details Modal */}
        {activeProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveProfile(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={activeProfile.image}
                  alt={activeProfile.name}
                  className="h-16 w-16 rounded-2xl object-cover shadow"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{activeProfile.name}</h3>
                  <p className="text-xs font-semibold text-emerald-600">{activeProfile.role}</p>
                  <p className="text-xs text-slate-500 mt-0.5">⭐ {activeProfile.rating} ({activeProfile.reviewsCount} reviews)</p>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <p>
                  <span className="font-bold text-slate-800">Specialization:</span> {activeProfile.specialization}
                </p>
                {activeProfile.education && (
                  <p>
                    <span className="font-bold text-slate-800">Education:</span> {activeProfile.education}
                  </p>
                )}
                {activeProfile.languages && (
                  <p>
                    <span className="font-bold text-slate-800">Languages:</span> {activeProfile.languages.join(", ")}
                  </p>
                )}
                {activeProfile.availableDays && (
                  <p>
                    <span className="font-bold text-slate-800">Available Days:</span> {activeProfile.availableDays.join(", ")}
                  </p>
                )}
                <p>
                  <span className="font-bold text-slate-800">Session Fee:</span> {activeProfile.fee}
                </p>
                {activeProfile.bio && (
                  <p className="mt-2 text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{activeProfile.bio}"
                  </p>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to={`/contact?counselor=${encodeURIComponent(activeProfile.name)}`}
                  onClick={() => setActiveProfile(null)}
                  className="flex-1 rounded-xl bg-emerald-600 py-3 text-center text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
                >
                  Book Session with {activeProfile.name.split(" ")[0]}
                </Link>
                <button
                  onClick={() => setActiveProfile(null)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Counselors;
