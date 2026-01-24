import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../../index"
import logo from "../../../assets/logo/logo.jpg";

const Navbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Features", link: "/features" },
    { name: "Testimonials", link: "/testimonials" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Wedding Planner Logo" className="h-9 w-9" />
          <span className="font-heading text-xl font-bold text-[#9E3A4A]">
            Wedding Planner
          </span>
        </Link>

        {/* Navigation Links */}
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
          <Link to="/auth-page">
            <Button size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
