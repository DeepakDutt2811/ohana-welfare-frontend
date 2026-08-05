import { useState } from "react";
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";
import { createDonationOrder, verifyDonationPayment } from "../services/api";
import { loadRazorpayScript } from "../utils/loadRazorpay";

const impacts = [
  {
    amount: 3000,
    title: "Educates 1 Child",
    desc: "Provides education support for 6 months",
  },
  {
    amount: 6000,
    title: "Feeds a Family",
    desc: "Nutritious meals for 3 months",
  },
  {
    amount: 12000,
    title: "Healthcare Support",
    desc: "Medical care for families in need",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  panNumber: "",
  state: "",
  city: "",
  address: "",
  pincode: "",
  consent: false,
};

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [error, setError] = useState("");

  function handleFieldChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleDonate() {
    setError("");

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Please select or enter a donation amount.");
      return;
    }
    if (!form.fullName || !form.email || !form.phone) {
      setError("Full name, email and mobile number are required.");
      return;
    }

    setStatus("processing");

    try {
      const order = await createDonationOrder({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        pan_number: form.panNumber || null,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        pincode: form.pincode || null,
        amount: numericAmount,
        consent_updates: form.consent,
      });

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Could not load the payment gateway. Check your connection and try again.");
      }

      const razorpay = new window.Razorpay({
        key: order.razorpay_key_id,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        name: "Ohana Welfare Foundation",
        description: "Donation",
        order_id: order.razorpay_order_id,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#204bc6" },
        handler: async (response) => {
          try {
            await verifyDonationPayment({
              donation_id: order.donation_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setStatus("success");
            setForm(initialForm);
            setAmount("");
          } catch {
            setStatus("error");
            setError("Payment was received but verification failed. Please contact us with your payment ID.");
          }
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });

      razorpay.on("payment.failed", () => {
        setStatus("error");
        setError("Payment failed. Please try again.");
      });

      razorpay.open();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-brand-blue-light min-h-screen">

      {/* HERO */}
   <HeroSlider />

      {/* IMPACT SECTION */}
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Your Contribution Creates Impact
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              onClick={() => setAmount(item.amount)}
              className={`cursor-pointer bg-white rounded-2xl p-6 shadow-md border transition ${
                amount === item.amount
                  ? "border-brand-blue shadow-lg"
                  : "border-blue-100 hover:shadow-xl"
              }`}
            >
              <h3 className="text-2xl font-bold text-brand-blue mb-2">
                ₹ {item.amount}
              </h3>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DONATION FORM */}
      <div className="flex justify-center px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/40"
        >

          <h2 className="text-2xl font-bold text-center mb-6">
            Donate & Save Tax
          </h2>

          {/* Amount Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[3000, 6000, 12000, 24000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`px-5 py-2 rounded-full border transition ${
                  amount === amt
                    ? "bg-brand-blue text-white"
                    : "bg-white hover:bg-blue-50"
                }`}
              >
                ₹ {amt}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <input
            type="number"
            placeholder="Enter custom amount"
            className="premium-input w-full mb-6"
            value={amount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
          />

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="premium-input"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleFieldChange}
            />
            <input
              className="premium-input"
              name="email"
              type="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleFieldChange}
            />

            <input
              className="premium-input"
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleFieldChange}
            />
            <input
              className="premium-input"
              name="panNumber"
              placeholder="PAN Number (for 80G receipt)"
              value={form.panNumber}
              onChange={handleFieldChange}
            />

            <input className="premium-input" value="India" readOnly />
            <input
              className="premium-input"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleFieldChange}
            />

            <input
              className="premium-input"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleFieldChange}
            />
            <input
              className="premium-input"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleFieldChange}
            />

          </div>

          <input
            className="premium-input w-full mt-4"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleFieldChange}
          />

          {/* TRUST */}
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>✔ 80G Tax Benefit Available</p>
            <p>✔ 100% Secure Payment</p>
            <p>✔ Trusted by 10,000+ donors</p>
          </div>

          {/* CONSENT */}
          <div className="flex items-start gap-2 mt-4 text-sm text-gray-600">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleFieldChange}
            />
            <p>
              I agree to receive updates via WhatsApp/email/SMS.
            </p>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}
          {status === "success" && (
            <p className="mt-4 text-sm text-green-600 text-center">
              Thank you for your generous donation! A receipt has been recorded.
            </p>
          )}

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleDonate}
            disabled={status === "processing"}
            className="w-full mt-6 bg-brand-blue hover:bg-brand-blue-dark text-white py-3 rounded-full text-lg shadow-lg transition disabled:opacity-60"
          >
            {status === "processing" ? "Processing..." : `Donate ₹ ${amount || "____"}`}
          </button>

        </motion.div>
      </div>
    </div>
  );
}
