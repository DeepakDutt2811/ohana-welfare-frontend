import communityPhoto from "../assets/community.jpg";
import { vision, mission, approachSteps, whyPartner } from "../config/content";

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Ohana Welfare Foundation</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Building healthier, safer and empowered communities.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-brand-blue mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">{vision}</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-brand-blue mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">{mission}</p>
          </div>
        </div>
      </section>

      {/* Photo + Approach */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src={communityPhoto}
            alt="Ohana Welfare Foundation community program"
            className="rounded-2xl shadow-xl w-full object-cover"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-gray-600 mb-6">
              We follow a proven, community-driven model:
            </p>
            <div className="flex flex-wrap gap-3">
              {approachSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {step}
                  </span>
                  {i < approachSteps.length - 1 && (
                    <span className="text-brand-cyan font-bold">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {whyPartner.map((item) => (
            <div key={item.title} className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-brand-blue mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
