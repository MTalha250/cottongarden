"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import axios from "axios";
import Grid from "@/components/grid";
import SEO from "@/components/seo";

const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/sale`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pt-32 pb-10 px-6 md:px-12 lg:px-24">
      <SEO
        title="Special Deals | GYMGear"
        description="Discover unbeatable prices on top-quality gym apparel and accessories. From high-performance workout wear to must-have essentials like water bottles and gym bags, find everything you need to boost your fitness journey!"
      />
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-wide">
          Special Deals
        </h1>
        <p className="text-sm md:text-base mt-4 text-gray-600 max-w-xl">
          Discover unbeatable prices on top-quality gym apparel and accessories.
          From high-performance workout wear to must-have essentials like water
          bottles and gym bags, find everything you need to boost your fitness
          journey!
        </p>
      </div>
      <Grid products={products} loading={loading} />
    </div>
  );
};

export default page;
