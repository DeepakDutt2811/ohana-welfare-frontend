import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { vision, mission, stats, thematicAreas, projects } from "../config/content";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Vision & Mission */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-brand-blue mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">{vision}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-blue mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">{mission}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="grid md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="shadow-lg bg-white p-6 rounded-2xl">
              <h2 className="text-4xl font-bold text-brand-blue">{stat.value}</h2>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-white px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Our Focus Areas</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our programs are built around key pillars that address the most
          pressing needs of vulnerable communities.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {thematicAreas.map((area) => (
            <div key={area.title} className="bg-gray-50 p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-brand-blue">{area.title}</h3>
              <p className="mt-4 text-gray-600 text-sm">{area.summary}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/causes"
            className="inline-block bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
          >
            Explore All Programs
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-gray-50 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Major Projects</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div key={project.title} className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
              <p className="text-brand-blue text-sm font-medium mt-1">{project.location}</p>
              <p className="mt-3 text-gray-600 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue text-white py-20 text-center px-8">
        <h2 className="text-4xl font-bold">Be The Reason Someone Smiles</h2>
        <p className="mt-4 text-lg">
          Every donation creates hope and real change.
        </p>

        <Link
          to="/donate"
          className="inline-block mt-8 bg-white text-brand-blue px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition"
        >
          Donate Today
        </Link>
      </section>
    </div>
  );
}
