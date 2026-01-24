import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  IndianRupee,
  Bell,
  Search,
  LogOut,
   User
} from "lucide-react";

const VendorLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-rose-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-playfair font-bold text-pink-700 mb-10">
          Wedding Planner
        </h1>

        <nav className="space-y-3">
          <NavItem to="/vendor" icon={<LayoutDashboard />} label="Dashboard" />
          <NavItem to="/vendor/services" icon={<Briefcase />} label="Services" />
          <NavItem to="/vendor/bookings" icon={<Calendar />} label="Bookings" />
          <NavItem to="/vendor/earnings" icon={<IndianRupee />} label="Earnings" />
          <NavItem to="/vendor/profile" icon={<User />} label="Profile" />

        </nav>

        <button
          onClick={logout}
          className="mt-10 flex items-center gap-2 text-gray-500 hover:text-pink-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="bg-white px-8 py-4 shadow flex items-center justify-between">
          {/* Search */}
          <div className="flex items-center gap-3 bg-rose-50 px-4 py-2 rounded-xl w-96">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <Bell className="text-gray-500 cursor-pointer" />

            {/* Profile */}
            <div className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold">
              J
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        isActive
          ? "bg-pink-100 text-pink-700 font-medium"
          : "text-gray-600 hover:bg-pink-50"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default VendorLayout;
