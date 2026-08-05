import { useState } from "react";
import { submitContact } from "../services/api";
import { contactInfo } from "../config/siteConfig";

const initialForm = { name: "", email: "", phone: "", subject: "general", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Have a question, want to volunteer, or explore a CSR partnership? We'd love to hear from you.
        </p>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-6">
              Join us in building empowered, healthier communities.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-semibold">Email: </span>
                <a href={`mailto:${contactInfo.email}`} className="text-brand-blue hover:underline">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <span className="font-semibold">Website: </span>
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  {contactInfo.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl shadow-md space-y-4">
            <input
              className="premium-input"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="premium-input"
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="premium-input"
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
            />
            <select
              className="premium-input"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            >
              <option value="general">General Inquiry</option>
              <option value="volunteer">Volunteer</option>
              <option value="csr">CSR Partnership</option>
              <option value="other">Other</option>
            </select>
            <textarea
              className="premium-input"
              name="message"
              rows={4}
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white py-3 rounded-full text-lg shadow-lg transition disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-600 text-sm text-center">
                Thank you! We'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
