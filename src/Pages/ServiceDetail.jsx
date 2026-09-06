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