"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Grid from "@/components/grid";
import Link from "next/link";

const Discover = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/featured`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-16 md:py-20 overflow-hidden">
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <p className="tracking-widest text-xs md:text-sm text-gray-500 uppercase">
            Cotton Garden Picks
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
            Discover our featured products
          </h2>
          <p className="mt-3 text-gray-600 md:text-lg max-w-2xl">
            Everyday cotton essentials for men, women, and kids—made to last and
            feel great.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm"
            >
              View All Products
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Grid products={products} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default Discover;
