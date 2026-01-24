import { Users, CalendarDays, IndianRupee } from "lucide-react";
import RevenuePie from "./Component/RevenuePie";

const CARD_HEIGHT = "h-[220px]";

const VendorDashboard = () => {
  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-playfair font-semibold text-pink-800">
          Welcome back, John 👋
        </h2>
        <p className="text-gray-600 mt-1">
          Overview of your business performance
        </p>
      </div>

      {/* TOP ROW – SAME HEIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Pending Requests"
          value="3"
          subtitle="Requires action"
          icon={<Users />}
        />

        <StatCard
          title="Upcoming Bookings"
          value="2"
          subtitle="Next 7 days"
          icon={<CalendarDays />}
        />

        <StatCard
          title="Monthly Earnings"
          value="₹56,000"
          subtitle="This month"
          icon={<IndianRupee />}
        />

        {/* ✅ REPLACED PieCard WITH RevenuePie */}
        <RevenuePie />
      </div>

      {/* SECOND ROW */}
      <div className="grid md:grid-cols-2 gap-6">
        <RecentBookings />
        <EarningsBarChart />
      </div>
    </div>
  );
};

export default VendorDashboard;

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value, subtitle, icon }) => (
  <div
    className={`bg-white rounded-3xl shadow p-6 ${CARD_HEIGHT} flex flex-col justify-between`}
  >
    <div className="flex items-center gap-3 text-pink-600">
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>

    <div>
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>

    <button className="text-sm text-pink-600 font-medium self-start">
      View Details →
    </button>
  </div>
);

const RecentBookings = () => (
  <div className="bg-white rounded-3xl shadow p-8">
    <div className="flex justify-between mb-6">
      <h3 className="text-lg font-semibold text-pink-700">
        Recent Bookings
      </h3>
      <button className="text-sm text-pink-600">View all</button>
    </div>

    <BookingRow couple="Emily & John" date="18 Jun 2026" status="Confirmed" />
    <BookingRow couple="Priya & Rohit" date="1 Jul 2026" status="Pending" />
  </div>
);

const BookingRow = ({ couple, date, status }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-none">
    <div>
      <p className="font-medium">{couple}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <span
      className={`px-3 py-1 rounded-full text-xs ${
        status === "Confirmed"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  </div>
);

const EarningsBarChart = () => (
  <div className="bg-white rounded-3xl shadow p-8">
    <div className="flex justify-between mb-6">
      <h3 className="text-lg font-semibold text-pink-700">
        Earnings by Service
      </h3>
      <select className="text-sm border rounded-lg px-3 py-1">
        <option>This Month</option>
      </select>
    </div>

    <div className="flex items-end gap-10 h-48">
      <Bar label="Photo" height="70%" />
      <Bar label="Cinema" height="90%" />
      <Bar label="Album" height="55%" />
    </div>
  </div>
);

const Bar = ({ label, height }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-12 bg-pink-500 rounded-t-xl"
      style={{ height }}
    />
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);
