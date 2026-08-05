import { Link } from "react-router-dom";
import { thematicAreas, projects } from "../config/content";

export default function Causes() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Causes & Programs</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Six thematic pillars addressing the most pressing needs of
          vulnerable communities across India.
        </p>
      </section>

      {/* Thematic Areas */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {thematicAreas.map((area) => (
            <div key={area.title} className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-brand-blue">{area.title}</h3>
              <p className="mt-3 text-gray-600">{area.summary}</p>

              <ul className="mt-4 space-y-2">
                {area.details.map((detail) => (
                  <li key={detail} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-brand-blue">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Major Projects</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
              <p className="text-brand-blue text-sm font-medium mt-1">{project.location}</p>
              <p className="mt-3 text-gray-600 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue text-white py-16 text-center px-8">
        <h2 className="text-3xl font-bold">Support Our Programs</h2>
        <p className="mt-3 text-lg">Your contribution powers every initiative above.</p>
        <Link
          to="/donate"
          className="inline-block mt-6 bg-white text-brand-blue px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
        >
          Donate Now
        </Link>
      </section>
    </div>
  );
}
