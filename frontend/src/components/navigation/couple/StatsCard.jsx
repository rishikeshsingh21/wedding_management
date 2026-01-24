import React from "react";

const StatsCard = ({ title, value, sub }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-lg font-semibold text-[#9E3A4A] mt-2">
        {value}
      </p>

      {sub && (
        <p className="text-sm text-gray-400 mt-1">
          {sub}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
