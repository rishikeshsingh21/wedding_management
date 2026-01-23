const Services = () => {
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-playfair font-semibold text-pink-800">
          My Services
        </h2>
        <button className="px-5 py-2 bg-pink-600 text-white rounded-xl">
          + Add Service
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <ServiceCard name="Photography" price="₹25,000" />
        <ServiceCard name="Cinematography" price="₹40,000" />
        <ServiceCard name="Album Design" price="₹15,000" />
      </div>
    </div>
  );
};

const ServiceCard = ({ name, price }) => (
  <div className="bg-white p-6 rounded-3xl shadow">
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-gray-500 mt-1">{price}</p>

    <div className="flex gap-4 mt-6">
      <button className="text-pink-600 font-medium">Edit</button>
      <button className="text-red-500 font-medium">Delete</button>
    </div>
  </div>
);

export default Services;
