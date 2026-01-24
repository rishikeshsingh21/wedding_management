import { useState } from "react";
import { Button, Input } from "../../components";

const VendorProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Photography",
    email: "john@gmail.com",
    phone: "9876543210",
    service: "Wedding Photography",
    location: "Mumbai, India",
  });

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    alert("Profile updated (mock)");
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-playfair font-semibold text-pink-800 mb-2">
        My Profile
      </h2>
      <p className="text-gray-600 mb-8">
        View and update your vendor information
      </p>

      <form
        onSubmit={handleSave}
        className="bg-white p-8 rounded-3xl shadow space-y-6"
      >
        <Input
          label="Business / Vendor Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Service Type"
          name="service"
          value={profile.service}
          onChange={handleChange}
        />

        <Input
          label="Location"
          name="location"
          value={profile.location}
          onChange={handleChange}
        />

        <Button type="submit" className="mt-4">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default VendorProfile;
