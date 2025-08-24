"use client";
import React from "react";
import { FiMail, FiPhone, FiMapPin, FiMessageCircle } from "react-icons/fi";
import { useContactInfoStore } from "@/store/contactInfoStore";
import toast from "react-hot-toast";
import axios from "axios";
import SEO from "@/components/seo";

const ContactUs = () => {
  const { contactInfo } = useContactInfoStore();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill out all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          name,
          email,
          message,
        }
      );
      toast.success(response.data.message || "Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-28 pb-20 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60" />
      <SEO
        title="Contact Us | Cotton Garden"
        description="Questions about sizing, shipping, or returns? The Cotton Garden team is here to help."
      />
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
          Contact Us
        </h1>
        <p className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl">
          We’re here to help with orders, fit, and product questions. Reach out
          and we’ll get back within 1 business day.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl md:text-3xl text-primary mb-2">
            Send us a message
          </h2>
          <p className="text-gray-600 mb-6">
            We usually reply within a business day.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-base md:text-lg">
                Name
              </label>
              <input
                type="text"
                className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base md:text-lg">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base md:text-lg">
                Message
              </label>
              <textarea
                className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-hover rounded-full text-white py-3 px-8 transition duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Info stack */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-mons text-primary mb-3">
              Get in touch
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${contactInfo?.email || ""}`}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
              >
                <FiMail className="text-primary text-3xl mb-2 mx-auto" />
                <div className="text-gray-800">Email Us</div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {contactInfo?.email}
                </div>
              </a>
              <a
                href={`tel:${contactInfo?.phone || ""}`}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
              >
                <FiPhone className="text-primary text-3xl mb-2 mx-auto" />
                <div className="text-gray-800">Call Us</div>
                <div className="text-sm text-gray-600">
                  {contactInfo?.phone}
                </div>
              </a>
              {contactInfo?.whatsapp && (
                <a
                  href={`https://wa.me/${(contactInfo?.whatsapp || "").replace(
                    /\s/g,
                    ""
                  )}`}
                  target="_blank"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
                >
                  <FiMessageCircle className="text-primary text-3xl mb-2 mx-auto" />
                  <div className="text-gray-800">WhatsApp</div>
                  <div className="text-sm text-gray-600">
                    {contactInfo?.whatsapp}
                  </div>
                </a>
              )}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <FiMapPin className="text-primary text-3xl mb-2 mx-auto" />
                <div className="text-gray-800">Address</div>
                <div className="text-sm text-gray-600">
                  {contactInfo?.address}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-mons text-primary mb-2">
              Support hours
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Mon – Sat: 9:00 AM – 6:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-tight text-primary mb-6">
          Our Location
        </h2>
        <p className="text-gray-600 mb-8">
          Visit us at our boutique to explore our latest collections in person
          and experience our fashion expertise firsthand.
        </p>
        <div className="relative w-full h-96">
          <iframe
            src={contactInfo?.map}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
