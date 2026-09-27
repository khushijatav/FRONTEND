import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../Service/axiosInst";

const fallbackServices = [
  {
    _id: "srv-individual",
    title: "Individual Counseling",
    description: "One-on-one sessions for personal growth, emotional clarity, and overcoming life challenges.",
    icon: "🧠",
    category: "Individual Therapy",
    duration: "50 mins",
    price: "₹1,200",
  },
  {
    _id: "srv-couples",
    title: "Relationship & Couples Therapy",
    description: "Strengthen communication, resolve conflicts, and rebuild emotional trust together.",
    icon: "💑",
    category: "Couples & Family",
    duration: "60 mins",
    price: "₹1,800",
  },
  {
    _id: "srv-stress",
    title: "Stress & Anxiety Management",
    description: "Practical CBT tools and mindfulness to overcome overwhelm, panic, and persistent worry.",
    icon: "🌿",
    category: "Mental Wellness",
    duration: "50 mins",
    price: "₹1,200",
  },
  {
    _id: "srv-family",
    title: "Family Counseling",
    description: "Navigate family tensions and cultivate a safe, harmonious home environment.",
    icon: "🏡",
    category: "Couples & Family",
    duration: "60 mins",
    price: "₹2,000",
  },
];

const Services = ({ showHeader = true, limit = null }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Individual Therapy",
    "Couples & Family",
    "Mental Wellness",
    "Career & Growth",
  ];

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get("/api/services")
      .then((res) => {
        if (isMounted) {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setServices(res.data);
          } else {
            setServices(fallbackServices);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("Could not fetch services from API, using fallback data:", err.message);
          setServices(fallbackServices);
          setError("Viewing offline service catalog");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredServices = services
    .filter((s) => {
      if (selectedCategory === "All") return true;
      return s.category && s.category.toLowerCase() === selectedCategory.toLowerCase();
    })
    .slice(0, limit || services.length);

  return (
    <section className="bg-white py-16 md:py-20" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {showHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              Our Professional Services
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Support designed for every stage of your journey
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Personalized, confidential mental health and counseling support provided by certified therapists.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-14 flex justify-center py-12">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          </div>
        )}

        {/* Notice if offline */}
        {error && (
          <div className="mt-4 text-center text-xs text-amber-600 font-medium">
            ℹ️ {error}
          </div>
        )}

        {/* Services Grid */}
        {!loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-[#f8fcfb] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white hover:shadow-xl"
              >
                <div>
                  {/* Top row with icon & category badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl shadow-sm transition group-hover:scale-110">
                      {service.icon || "🧠"}
                    </div>
                    {service.category && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                        {service.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Fee & Duration */}
                  <div className="mt-5 flex items-center gap-3 text-xs font-semibold text-slate-500">
                    {service.duration && (
                      <span className="inline-flex items-center gap-1">
                        ⏱ {service.duration}
                      </span>
                    )}
                    {service.price && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        {service.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                  <Link
                    to={`/services/${service._id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1"
                  >
                    View Details <span>→</span>
                  </Link>

                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Services;