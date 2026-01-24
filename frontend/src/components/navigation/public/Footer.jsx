import { Link } from "react-router-dom";
import { Facebook, Instagram, X } from "lucide-react";
import logo from "../../../assets/logo/logo.jpg"

const footerLinks = [
  { name: "About", path: "/about" },
  { name: "Features", path: "/features" },
  { name: "Terms", path: "/terms" },
  { name: "Privacy", path: "/privacy" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: Facebook, path: "/facebook" },
  { icon: Instagram, path: "/instagram" },
  { icon: X, path: "/twitter" },
];

const Footer = () => {
  return (
    <footer className="bg-[#FAF5F6] border-t border-[#E8DDE0]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo & Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#9E3A4A] font-semibold text-lg"
        >
          <img src={logo} alt="Wedding Planner" className="h-7 w-7" />
          Wedding Planner
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-600">
            {footerLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="hover:text-[#D16C7C] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, path }, index) => (
            <Link
              key={index}
              to={path}
              className="text-[#9E3A4A] hover:text-[#D16C7C] transition-colors duration-200"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
