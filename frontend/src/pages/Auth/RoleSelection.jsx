import { Link } from "react-router-dom";
import { Heart, Store } from "lucide-react";

const RoleSelection = () => {
  const setRole = (role) => {
    localStorage.setItem("role", role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-soft.png')] bg-cover px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">

        <h2 className="text-2xl font-semibold text-[#9E3A4A]">
          Get Started
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Choose your role to continue
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">

          {/* COUPLE */}
          <Link
            to="/signup?role=couple"
            onClick={() => setRole("couple")}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border hover:border-pink-400 transition"
          >
            <Heart className="text-pink-500" size={32} />
            <span className="font-medium text-gray-700">Couple</span>
            <p className="text-xs text-gray-500 text-center">
              Plan & manage your wedding
            </p>
          </Link>

          {/* VENDOR */}
          <Link
            to="/signup?role=vendor"
            onClick={() => setRole("vendor")}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border hover:border-pink-400 transition"
          >
            <Store className="text-pink-500" size={32} />
            <span className="font-medium text-gray-700">Vendor</span>
            <p className="text-xs text-gray-500 text-center">
              Offer wedding services
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
