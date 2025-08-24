"use client";
import React from "react";
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
    <section className="pt-28 pb-12 px-6 md:px-12 lg:px-24">
      <SEO
        title="Profile | Cotton Garden"
        description="Manage your account details and view your orders."
      />
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
          Your Account
        </h1>
        <p className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl">
          Update your info and review your order history.
        </p>
      </div>

      <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200 bg-white p-5 md:p-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              logout();
              setUser(null);
              setToken(null);
              toast.success("Logged out successfully");
              router.push("/");
            }}
            className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-neutral-100"
          >
            Logout
          </button>
        </div>
        <Profile />
      </div>
    </section>
  );
};

export default ProfilePage;
