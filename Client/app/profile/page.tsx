"use client";
import React from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
import useAuthStore from "@/store/authStore";
import { logout } from "@/hooks/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Profile from "@/components/profile";
import SEO from "@/components/seo";

const ProfilePage = () => {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  return (
    <motion.section
      className="pt-28 pb-12 px-6 md:px-12 lg:px-24"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title="Profile | Cotton Garden"
        description="Manage your account details and view your orders."
      />
      <motion.div
        className="text-center mb-6 flex flex-col items-center"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
          variants={globalAnimations.staggerChild}
        >
          Your Account
        </motion.h1>
        <motion.p
          className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl"
          variants={globalAnimations.staggerChild}
        >
          Update your info and review your order history.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto rounded-2xl border border-gray-200 bg-white p-5 md:p-8"
        {...globalAnimations.cardHover}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div
          className="flex justify-end mb-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={() => {
              logout();
              setUser(null);
              setToken(null);
              toast.success("Logged out successfully");
              router.push("/");
            }}
            className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-neutral-100"
            {...globalAnimations.buttonHover}
          >
            Logout
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Profile />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ProfilePage;
