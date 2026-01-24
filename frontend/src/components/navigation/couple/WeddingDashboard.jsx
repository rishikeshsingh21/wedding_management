import React from "react";
import Countdown from "./Countdown";
import StatsCard from "./StatsCard";

const WeddingDashboard = ({ wedding }) => {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-[#9E3A4A]">
          Welcome, {wedding?.coupleName || "John & Emily"}!
        </h1>
        <p className="text-gray-600 mt-1">
          Your Wedding Day:{" "}
          <strong>{wedding?.weddingDate || "June 18, 2026"}</strong>
        </p>
      </div>

      {/* Countdown */}
      <Countdown weddingDate={wedding?.weddingDate} />

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatsCard title="Guests" value="120 Invited" sub="85 RSVP'd" />
        <StatsCard title="Budget" value="₹18,500 Spent" sub="₹25,000 Total" />
        <StatsCard title="Vendors" value="3 Booked" />
        <StatsCard title="To-Do List" value="3 Tasks Pending" />
      </div>
    </div>
  );
};

export default WeddingDashboard;
