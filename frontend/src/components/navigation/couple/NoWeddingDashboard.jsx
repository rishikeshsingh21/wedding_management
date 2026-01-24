import React, {useState} from "react";
import Button from "../../common/Button";
import CreateWeddingModal from "./CreateWeddingModal";

const services = [
  { name: "Photography", icon: "📸" },
  { name: "Venue", icon: "🏛️" },
  { name: "Mehendi", icon: "🌿" },
  { name: "DJ", icon: "🎧" },
  { name: "Catering", icon: "🍽️" },
];

const NoWeddingDashboard = () => {
    const [openWeddingModal, setOpenWeddingModal] = useState(false);
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#9E3A4A] mb-2">
        Start Planning Your Wedding
      </h1>
      <p className="text-gray-600 mb-8">
        Explore services and create your wedding to unlock full planning tools.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="font-medium text-gray-700">{service.name}</h3>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
            <Button size="md" onClick={() => setOpenWeddingModal(true)}>
              Create Wedding
            </Button>
      </div>
      <CreateWeddingModal
        isOpen={openWeddingModal}
        onClose={() => setOpenWeddingModal(false)}
      />
    </div>
    
  );
};

export default NoWeddingDashboard;
