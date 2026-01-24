import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpg";
import Button from "../../common/Button";
import CreateWeddingModal from "./CreateWeddingModal";

const CoupleNavbar = () => {
  const navigate = useNavigate();
  const [openWeddingModal, setOpenWeddingModal] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", link: "/couple" },
    { name: "My Bookings", link: "/couple/bookings" },
    { name: "Profile", link: "/couple/profile" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div
            onClick={() => navigate("/couple")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logo} alt="Wedding Planner Logo" className="h-9 w-9" />
            <span className="font-heading text-xl font-bold text-[#9E3A4A]">
              Wedding Planner
            </span>
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-[#D16C7C] border-b-2 border-[#D16C7C] pb-1"
                        : "text-gray-700 hover:text-[#D16C7C]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={() => setOpenWeddingModal(true)}>
              Create Wedding
            </Button>

            <Button variant="outline" size="sm" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <CreateWeddingModal
        isOpen={openWeddingModal}
        onClose={() => setOpenWeddingModal(false)}
      />
    </>
  );
};

export default CoupleNavbar;
