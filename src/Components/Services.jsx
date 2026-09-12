// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/services")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch services");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setServices(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching services:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <section className="bg-white py-20">
//         <div className="text-center text-slate-600">
//           Loading services...
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-white py-20">
//       <div className="mx-auto max-w-7xl px-6">

//         {/* Heading */}
//         <div className="mx-auto max-w-2xl text-center">
//           <p className="font-semibold text-emerald-600">
//             OUR SERVICES
//           </p>

//           <h2 className="mt-3 text-4xl font-bold text-slate-900">
//             Support for every step
//           </h2>

//           <p className="mt-4 text-slate-600">
//             Professional counseling designed around your unique needs.
//           </p>
//         </div>

//         {/* Service Cards */}
//         <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {services.map((service) => (
//             <div
//               key={service._id}
//               className="rounded-3xl border border-slate-100 bg-[#f8fcfb] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
//             >

//               {/* Icon */}
//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
//                 {service.icon || "🧠"}
//               </div>

//               {/* Title */}
//               <h3 className="mt-6 text-xl font-bold text-slate-900">
//                 {service.title}
//               </h3>

//               {/* Description */}
//               <p className="mt-3 leading-7 text-slate-600">
//                 {service.description}
//               </p>

//               {/* Learn More */}
//               <Link
//                 to={`/services/${service._id}`}
//                 className="mt-6 inline-block font-semibold text-emerald-600 transition hover:text-emerald-800"
//               >
//                 Learn more →
//               </Link>

//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Services;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../Service/axiosInst";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_PUBLIC_API_URL}/api/services`)
      .then((response) => {
        console.log("Fetched services:", response);
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="text-center text-slate-600">
          Loading services...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-emerald-600">
            OUR SERVICES
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Support for every step
          </h2>

          <p className="mt-4 text-slate-600">
            Professional counseling designed around your unique needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {Array.isArray(services) && services.map((service) => (
            <div
              key={service._id}
              className="rounded-3xl border border-slate-100 bg-[#f8fcfb] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                {service.icon || "🧠"}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 leading-7 text-slate-600">
                {service.description}
              </p>

              {/* Learn More */}
              <Link
                to={`/services/${service._id}`}
                className="mt-6 inline-block font-semibold text-emerald-600 transition hover:text-emerald-800"
              >
                Learn more →
              </Link>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;