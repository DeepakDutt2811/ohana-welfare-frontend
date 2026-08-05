import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/causes", label: "Causes" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="Ohana Welfare Foundation" className="h-14 md:h-20 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-brand-blue transition ${isActive ? "text-brand-blue" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/donate"
            className="bg-brand-blue hover:bg-brand-blue-dark text-white px-5 py-2 rounded-full shadow transition"
          >
            Donate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-gray-700 font-medium">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `hover:text-brand-blue transition ${isActive ? "text-brand-blue" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/donate"
            onClick={() => setOpen(false)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white text-center px-5 py-2 rounded-full shadow transition"
          >
            Donate
          </Link>
        </div>
      )}
    </nav>
  );
}
