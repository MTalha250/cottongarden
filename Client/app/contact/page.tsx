"use client";
import React from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
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
    <motion.div
      className="relative pt-28 pb-20 px-8 md:px-16 lg:px-24"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title="Contact Us | Cotton Garden"
        description="Questions about sizing, shipping, or returns? The Cotton Garden team is here to help."
      />
      <motion.div
        className="text-center mb-12 flex flex-col items-center"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
          variants={globalAnimations.staggerChild}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl"
          variants={globalAnimations.staggerChild}
        >
          We're here to help with orders, fit, and product questions. Reach out
          and we'll get back within 1 business day.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        {/* Form */}
        <motion.div
          className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
          variants={globalAnimations.staggerChild}
          {...globalAnimations.cardHover}
        >
          <motion.h2
            className="text-2xl md:text-3xl text-primary mb-2"
            variants={globalAnimations.staggerChild}
          >
            Send us a message
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-6"
            variants={globalAnimations.staggerChild}
          >
            We usually reply within a business day.
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={globalAnimations.staggerContainer}
          >
            <motion.div variants={globalAnimations.staggerChild}>
              <label className="block text-gray-700 text-base md:text-lg">
                Name
              </label>
              <motion.input
                type="text"
                className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
            <motion.div variants={globalAnimations.staggerChild}>
              <label className="block text-gray-700 text-base md:text-lg">
                Email
              </label>
              <motion.input
                type="email"
                className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
            <motion.div variants={globalAnimations.staggerChild}>
              <label className="block text-gray-700 text-base md:text-lg">
                Message
              </label>
              <motion.textarea
                className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
            <motion.div
              className="flex items-center justify-end"
              variants={globalAnimations.staggerChild}
            >
              <motion.button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-hover rounded-full text-white py-3 px-8 transition duration-300"
                {...globalAnimations.buttonHover}
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Info stack */}
        <motion.div
          className="space-y-6"
          variants={globalAnimations.staggerChild}
        >
          <motion.div
            className="rounded-2xl border border-gray-200 bg-white p-6"
            {...globalAnimations.cardHover}
          >
            <motion.h3
              className="text-lg font-mons text-primary mb-3"
              {...globalAnimations.slideUp}
            >
              Get in touch
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={globalAnimations.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportSettings}
            >
              <motion.a
                href={`mailto:${contactInfo?.email || ""}`}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
                variants={globalAnimations.staggerChild}
                {...globalAnimations.hoverScale}
              >
                <motion.div {...globalAnimations.iconHover}>
                  <FiMail className="text-primary text-3xl mb-2 mx-auto" />
                </motion.div>
                <div className="text-gray-800">Email Us</div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {contactInfo?.email}
                </div>
              </motion.a>
              <motion.a
                href={`tel:${contactInfo?.phone || ""}`}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
                variants={globalAnimations.staggerChild}
                {...globalAnimations.hoverScale}
              >
                <motion.div {...globalAnimations.iconHover}>
                  <FiPhone className="text-primary text-3xl mb-2 mx-auto" />
                </motion.div>
                <div className="text-gray-800">Call Us</div>
                <div className="text-sm text-gray-600">
                  {contactInfo?.phone}
                </div>
              </motion.a>
              {contactInfo?.whatsapp && (
                <motion.a
                  href={`https://wa.me/${(contactInfo?.whatsapp || "").replace(
                    /\s/g,
                    ""
                  )}`}
                  target="_blank"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
                  variants={globalAnimations.staggerChild}
                  {...globalAnimations.hoverScale}
                >
                  <motion.div {...globalAnimations.iconHover}>
                    <FiMessageCircle className="text-primary text-3xl mb-2 mx-auto" />
                  </motion.div>
                  <div className="text-gray-800">WhatsApp</div>
                  <div className="text-sm text-gray-600">
                    {contactInfo?.whatsapp}
                  </div>
                </motion.a>
              )}
              <motion.div
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
                variants={globalAnimations.staggerChild}
                {...globalAnimations.hoverScale}
              >
                <motion.div {...globalAnimations.iconHover}>
                  <FiMapPin className="text-primary text-3xl mb-2 mx-auto" />
                </motion.div>
                <div className="text-gray-800">Address</div>
                <div className="text-sm text-gray-600">
                  {contactInfo?.address}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="rounded-2xl border border-gray-200 bg-white p-6"
            {...globalAnimations.cardHover}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="text-lg font-mons text-primary mb-2"
              {...globalAnimations.slideUp}
            >
              Support hours
            </motion.h3>
            <motion.ul
              className="text-sm text-gray-600 space-y-1"
              variants={globalAnimations.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportSettings}
            >
              <motion.li variants={globalAnimations.staggerChild}>
                Mon – Sat: 9:00 AM – 6:00 PM
              </motion.li>
              <motion.li variants={globalAnimations.staggerChild}>
                Sunday: Closed
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-20 text-center"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-tight text-primary mb-6"
          variants={globalAnimations.staggerChild}
        >
          Our Location
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-8"
          variants={globalAnimations.staggerChild}
        >
          Visit us at our boutique to explore our latest collections in person
          and experience our fashion expertise firsthand.
        </motion.p>
        <motion.div
          className="relative w-full h-96"
          variants={globalAnimations.staggerChild}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <iframe
            src={contactInfo?.map}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
