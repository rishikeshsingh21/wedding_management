import React, { useEffect, useState } from "react";

const Countdown = ({ weddingDate }) => {
  const calculateTimeLeft = () => {
    const target = new Date(weddingDate || "2026-06-18").getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="bg-[#FCE8EC] rounded-xl p-6 text-center shadow-sm">
      <h2 className="text-[#9E3A4A] font-semibold mb-6">
        Wedding Countdown
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="text-2xl font-bold text-[#9E3A4A]">
              {value}
            </div>
            <div className="text-sm text-gray-500 capitalize">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
