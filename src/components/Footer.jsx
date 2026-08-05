import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SocialIcon from "./SocialIcon";
import { socialLinks, contactInfo } from "../config/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img src={logo} alt="Ohana Welfare Foundation" className="h-20 w-auto bg-white rounded-lg p-2" />
          <p className="mt-4 text-sm leading-relaxed">
            Building healthier, safer and empowered communities through health,
            nutrition, education, and women empowerment programs across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-cyan transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-cyan transition">About Us</Link></li>
            <li><Link to="/causes" className="hover:text-brand-cyan transition">Our Causes</Link></li>
            <li><Link to="/donate" className="hover:text-brand-cyan transition">Donate</Link></li>
            <li><Link to="/contact" className="hover:text-brand-cyan transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-brand-cyan transition">
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${contactInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cyan transition"
              >
                {contactInfo.website}
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-brand-blue transition"
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} Ohana Welfare Foundation. All rights reserved.
      </div>
    </footer>
  );
}
