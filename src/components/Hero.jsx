import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import communityPhoto from "../assets/community.jpg";

const slides = [
  communityPhoto,
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&q=80",
  "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=1600&q=80",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&q=80",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="h-[75vh] flex items-center justify-center text-center text-white relative transition-all duration-700"
      style={{
        backgroundImage: `url(${slides[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Building Healthier, Safer and Empowered Communities
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Improving the well-being of vulnerable communities through
          sustainable programs in health, nutrition, education, and women
          empowerment.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/donate"
            className="bg-brand-blue hover:bg-brand-blue-dark px-6 py-3 rounded-full text-lg shadow-lg transition"
          >
            Donate Now
          </Link>

          <Link
            to="/contact"
            className="border border-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-black transition"
          >
            Become Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}