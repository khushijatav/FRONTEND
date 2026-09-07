import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();

  const services = {
    individual: {
      title: "Individual Counseling",
      description:
        "One-on-one sessions to help you understand yourself and overcome personal challenges.",
    },

    relationship: {
      title: "Relationship Counseling",
      description:
        "Build stronger relationships through better communication and understanding.",
    },

    stress: {
      title: "Stress Management",
      description:
        "Learn practical techniques to manage stress, anxiety and emotional pressure.",
    },

    family: {
      title: "Family Counseling",
      description:
        "Create healthier family relationships with professional guidance.",
    },
  };

  const service = services[id];

  if (!service) {
    return <h1 className="text-center mt-20">Service not found</h1>;
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">
        {service.title}
      </h1>

      <p className="text-lg text-gray-600">
        {service.description}
      </p>

      <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg">
        Book Session
      </button>
    </div>
  );
};

export default ServiceDetails;

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { BASE_URL } from "../.env";

// const ServiceDetails = () => {
//   const { id } = useParams();

//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           `${BASE_URL}/services/${id}`
//         );

//         if (!response.ok) {
//           throw new Error("Service not found");
//         }

//         const data = await response.json();

//         setService(data);
//       } catch (err) {
//         console.error("Error fetching service:", err);
//         setError("Unable to load service details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchService();
//   }, [id]);

//   // Loading
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8fcfb]">
//         <p className="text-lg text-gray-600">
//           Loading service details...
//         </p>
//       </div>
//     );
//   }

//   // Error
//   if (error || !service) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fcfb]">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Service not found
//         </h1>

//         <p className="mt-3 text-gray-600">
//           {error}
//         </p>

//         <Link
//           to="/services"
//           className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
//         >
//           ← Back to Services
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-[#f8fcfb] py-16">
//       <div className="mx-auto max-w-4xl px-6">

//         {/* Back Button */}
//         <Link
//           to="/services"
//           className="font-semibold text-emerald-600 hover:text-emerald-800"
//         >
//           ← Back to Services
//         </Link>

//         {/* Service Card */}
//         <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg md:p-12">

//           {/* Icon */}
//           <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 text-4xl">
//             {service.icon || "🧠"}
//           </div>

//           {/* Title */}
//           <h1 className="mt-8 text-4xl font-bold text-slate-900">
//             {service.title}
//           </h1>

//           {/* Description */}
//           <p className="mt-5 text-lg leading-8 text-slate-600">
//             {service.description}
//           </p>

//           {/* Book Session */}
//           <Link
//             to="/booking"
//             className="mt-8 inline-block rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
//           >
//             Book Session
//           </Link>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceDetails;