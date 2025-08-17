"use client";
import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
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
    <div className="pt-32 pb-20 px-8 md:px-16 lg:px-24">
      <SEO
        title="Contact Us | GYMGear"
        description="We’re here to help! Whether you have a question about our collections, need style advice, or want to share your feedback, our team is ready to assist you."
      />
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-wide">
          Contact Us
        </h1>
        <p className="text-sm md:text-base mt-4 text-gray-600 max-w-xl">
          We’re here to help! Whether you have a question about our collections,
          need style advice, or want to share your feedback, our team is ready
          to assist you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-12 shadow-2xl">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl text-gray-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Reach out to us by filling out the contact form below, sending us an
            email, or giving us a call. We strive to respond to all inquiries
            within 24 hours.
          </p>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="bg-gray-100 p-8 text-center shadow-md">
                <FiMail className="text-primary text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl text-gray-800 mb-2">Email Us</h3>
                <p className="text-xs sm:text-base text-gray-600">
                  {contactInfo?.email}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="bg-gray-100 p-8 text-center shadow-md">
                <FiPhone className="text-primary text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl text-gray-800 mb-2">Call Us</h3>
                <p className="text-gray-600">{contactInfo?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl text-gray-800 mb-6">
            Contact Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-base md:text-lg">
                Name
              </label>
              <input
                type="text"
                className="w-full mt-2 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full mt-2 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full mt-2 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-hover text-white py-3 px-8 transition duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-wide mb-6">
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
