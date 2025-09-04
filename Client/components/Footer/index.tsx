import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useContactInfoStore } from "@/store/contactInfoStore";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";

const Footer = () => {
  const { contactInfo } = useContactInfoStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter`,
        {
          email,
        }
      );
      toast.success(response.data.message || "Subscribed successfully");
      setEmail("");
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message || "Email already subscribed");
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.footer
      className="bg-secondary pt-16 pb-10 relative"
      {...globalAnimations.footerSlideUp}
      whileInView="animate"
      viewport={viewportSettings}
    >
      <motion.div
        className="px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        {/* Logo and Brief Description */}
        <motion.div variants={globalAnimations.staggerChild}>
          <Link href="/">
            <motion.img
              src="/images/logo.jpeg"
              alt="logo"
              className="w-20 rounded-lg"
              {...globalAnimations.hoverScale}
            />
          </Link>
          <p className="mt-6 font-light leading-relaxed text-justify">
            Cotton Garden crafts breathable cotton clothing for men, women, and
            kids and everyday essentials made for comfort, quality and timeless
            style.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Social Media Icons */}
            <motion.a
              href={contactInfo?.facebook}
              target="_blank"
              className="hover:text-blue-500 transition duration-300"
              {...globalAnimations.iconHover}
            >
              <FaFacebookF size={24} />
            </motion.a>
            <motion.a
              href={contactInfo?.instagram}
              target="_blank"
              className="hover:text-pink-500 transition duration-300"
              {...globalAnimations.iconHover}
            >
              <FaInstagram size={24} />
            </motion.a>
            {contactInfo?.linkedin && (
              <motion.a
                href={contactInfo?.linkedin}
                target="_blank"
                className="hover:text-blue-600 transition duration-300"
                {...globalAnimations.iconHover}
              >
                <FaLinkedinIn size={24} />
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          className="md:pl-10"
          variants={globalAnimations.staggerChild}
        >
          <h3 className="text-lg font-mons tracking-tight font-medium mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 font-light">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors duration-300"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="hover:text-primary transition-colors duration-300"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>
        <motion.div variants={globalAnimations.staggerChild}>
          <h3 className="text-lg font-mons tracking-tight font-medium mb-4">
            Contact Us
          </h3>
          <ul className="space-y-4 font-light">
            <li className="flex items-center gap-2">
              <FaPhone className="text-primary" />
              <a
                href={`tel:${contactInfo?.phone}`}
                target="_blank"
                className="hover:text-primary transition-colors duration-300"
              >
                {contactInfo?.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-primary" />
              <a
                href={`https://wa.me/${contactInfo?.whatsapp.replace(
                  /\s/g,
                  ""
                )}`}
                target="_blank"
                className="hover:text-primary transition-colors duration-300"
              >
                {contactInfo?.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              <a
                href={`mailto:${contactInfo?.email}`}
                target="_blank"
                className="hover:text-primary transition-colors duration-300"
              >
                {contactInfo?.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <p className="mt-1">{contactInfo?.address}</p>
            </li>
          </ul>
        </motion.div>

        {/* Subscribe to Newsletter */}
        <motion.div variants={globalAnimations.staggerChild}>
          <h3 className="text-lg font-mons tracking-tight font-medium mb-4">
            Subscribe
          </h3>
          <p className="font-light mb-4">
            Join our newsletter to get the latest updates and offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              className="bg-white text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full transition-all duration-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button
              disabled={loading}
              className="bg-primary text-white px-4 py-2 ml-2 hover:bg-primary-hover transition duration-300"
              {...globalAnimations.buttonHover}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-12 border-t border-gray-800 pt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportSettings}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-24">
          <p className="font-light">
            © 2025 Cotton Garden. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="font-light hover:text-primary transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="font-light hover:text-primary transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
