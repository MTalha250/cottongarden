import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import logo from "@/assets/logoWhite.png";
import { useContactInfoStore } from "@/store/contactInfoStore";
import toast from "react-hot-toast";
import axios from "axios";

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
    <footer className="bg-secondary text-gray-100 pt-16 pb-10 relative">
      <div className="px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and Brief Description */}
        <div>
          <Link href="/">
            <img src={logo.src} alt="logo" className="w-60" />
          </Link>
          <p className="mt-6 text-gray-400 leading-relaxed text-justify">
            Elevating your fitness game with high-performance gym wear designed
            for comfort, durability, and style.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Social Media Icons */}
            <a
              href={contactInfo?.facebook}
              target="_blank"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href={contactInfo?.instagram}
              target="_blank"
              className="hover:text-pink-500 transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
            {contactInfo?.linkedin && (
              <a
                href={contactInfo?.linkedin}
                target="_blank"
                className="hover:text-blue-600 transition duration-300"
              >
                <FaLinkedinIn size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:pl-10">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li>
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${contactInfo?.phone}`}
                target="_blank"
                className="hover:text-white"
              >
                {contactInfo?.phone}
              </a>
            </li>
            <li>
              <strong>Whatsapp:</strong>{" "}
              <a
                href={`https://wa.me/${contactInfo?.whatsapp.replace(
                  /\s/g,
                  ""
                )}`}
                target="_blank"
                className="hover:text-white"
              >
                {contactInfo?.whatsapp}
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${contactInfo?.email}`}
                target="_blank"
                className="hover:text-white"
              >
                {contactInfo?.email}
              </a>
            </li>
            <li>
              <strong>Address:</strong>
              <p className="mt-1">{contactInfo?.address}</p>
            </li>
          </ul>
        </div>

        {/* Subscribe to Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Join our newsletter to get the latest updates and offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              className="bg-gray-800 text-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={loading}
              className="bg-primary text-white px-4 py-2 ml-2 hover:bg-primary-hover transition duration-300"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-24">
          <p className="text-gray-500">© 2024 GYMGear. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
