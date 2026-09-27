import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../Service/axiosInst";
import Booking from "../Components/Booking";

const fallbackDict = {
  individual: {
    title: "Individual Counseling",
    description: "One-on-one sessions for personal growth, self-awareness, and overcoming emotional difficulties in a confidential space.",
    category: "Individual Therapy",
    duration: "50 mins",
    price: "₹1,200",
    icon: "🧠",
    benefits: [
      "Confidential and safe 1-on-1 space",
      "Tailored coping strategies for daily life",
      "Goal-oriented emotional support",
      "Build resilience and self-awareness",
    ],
    targetAudience: "Adults, Teens, Young Professionals",
  },
  relationship: {
    title: "Relationship & Couples Therapy",
    description: "Supportive counseling for couples and partners to resolve conflicts, rebuild trust, and foster healthier communication.",
    category: "Couples & Family",
    duration: "60 mins",
    price: "₹1,800",
    icon: "💑",
    benefits: [
      "Constructive communication tools",
      "Conflict resolution without resentment",
      "Rebuilding trust and intimacy",
      "Pre-marital counseling guidance",
    ],
    targetAudience: "Couples, Married Partners, Pre-marital",
  },
  stress: {
    title: "Stress & Anxiety Management",
    description: "Evidence-based strategies using CBT and mindfulness to help you identify triggers, calm racing thoughts, and regain peace of mind.",
    category: "Mental Wellness",
    duration: "50 mins",
    price: "₹1,200",
    icon: "🌿",
    benefits: [
      "Cognitive Behavioral Therapy (CBT) techniques",
      "Mindfulness and breathing practices",
      "Panic and trigger response reduction",
      "Better sleep hygiene and relaxation",
    ],
    targetAudience: "Students, Working Professionals, Adults",
  },
  family: {
    title: "Family Counseling",
    description: "Helping family members understand each other's perspectives, heal grievances, and establish healthy relational boundaries.",
    category: "Couples & Family",
    duration: "60 mins",
    price: "₹2,000",
    icon: "🏡",
    benefits: [
      "Parent-child communication bridges",
      "Intergenerational conflict resolution",
      "Healthy boundary setting",
      "Strengthened household bonds",
    ],
    targetAudience: "Parents, Teens, Extended Families",
  },
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(() => fallbackDict[id] || null);
  const [loading, setLoading] = useState(() => !fallbackDict[id]);
  const [error, setError] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    // If already initialized from fallback dictionary, skip API fetch
    if (fallbackDict[id]) return;

    let isMounted = true;

    axiosInstance
      .get(`/api/services/${id}`)
      .then((res) => {
        if (isMounted) {
          setService(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("Could not fetch service by ID:", err.message);
          // Try to search if title matches or fallback
          axiosInstance
            .get("/api/services")
            .then((allRes) => {
              const matched = allRes.data?.find(
                (s) => s._id === id || s.title?.toLowerCase().includes(id.toLowerCase())
              );
              if (matched) {
                setService(matched);
              } else {
                setError("The requested service could not be found.");
              }
              setLoading(false);
            })
            .catch(() => {
              setError("The requested service could not be found.");
              setLoading(false);
            });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="text-sm font-medium text-slate-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
          🔍
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Service Not Found</h2>
        <p className="mt-2 text-sm text-slate-600">
          {error || "We could not find the details for this counseling program."}
        </p>
        <Link
          to="/services"
          className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
        >
          ← Back to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f7fbfa] min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-emerald-700">Services</Link>
          <span>/</span>
          <span className="text-slate-800 truncate">{service.title}</span>
        </div>

        {/* Main Details Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-3xl shadow-sm">
                {service.icon || "🧠"}
              </div>
              <div>
                <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  {service.category || "Therapy & Counseling"}
                </span>
                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {service.title}
                </h1>
              </div>
            </div>

            {/* Price & Duration Quick Stats */}
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <span className="text-xl font-bold text-emerald-700">
                {service.price || "₹1,200"}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ⏱ {service.duration || "50 mins"} per session
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              About This Program
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {service.description}
            </p>
          </div>

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Key Benefits & Outcomes
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl bg-emerald-50/50 p-3 border border-emerald-100/50">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Target Audience */}
          {service.targetAudience && (
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Suitable For:</span>
              <span>{service.targetAudience}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 border-t border-slate-100 pt-6">
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="w-full sm:w-auto rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
            >
              {showBookingForm ? "Hide Booking Form" : "Book This Session Now"}
            </button>

            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="w-full sm:w-auto text-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Book via Contact Page
            </Link>

            <Link
              to="/services"
              className="text-xs font-bold text-slate-500 hover:text-emerald-700 transition sm:ml-auto"
            >
              ← Back to All Services
            </Link>
          </div>
        </div>

        {/* Embedded Booking Form if Toggled */}
        {showBookingForm && (
          <div className="mt-10">
            <Booking defaultService={service.title} />
          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceDetail;