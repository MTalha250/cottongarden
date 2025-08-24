"use client";
import React from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import useAuthStore from "@/store/authStore";
import WishlistItem from "@/components/wishlist/wishlistItem";
import Link from "next/link";
import { Wishlist } from "@/types";
import SEO from "@/components/seo";

const WishlistPage = () => {
  const { wishlist } = useWishlistStore();
  const { user } = useAuthStore();

  return (
    <section className="pt-28 pb-12 px-6 md:px-12 lg:px-24">
      <SEO
        title="Your Wishlist | Cotton Garden"
        description="View and manage items you love at Cotton Garden."
      />
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
          Your Wishlist
        </h1>
        <p className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl">
          Save your favorites and shop them anytime.
        </p>
      </div>

      <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200 bg-white p-5 md:p-8">
        {user ? (
          wishlist.length ? (
            <div>
              {wishlist.map((item: Wishlist) => (
                <WishlistItem key={item.product._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg">Your wishlist is empty.</p>
              <Link
                href="/products"
                className="inline-block mt-4 rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2"
              >
                Explore Products
              </Link>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <p className="text-lg">Please log in to view your wishlist.</p>
            <Link
              href="/login"
              className="inline-block mt-4 rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
