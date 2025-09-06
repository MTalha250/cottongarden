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
    <section className="pt-28 pb-12 px-6 md:px-12 xl:px-24">
      <SEO
        title="Sale | Cotton Garden"
        description="Save on breathable cotton essentials for men, women, and kids. Limited-time offers on tees, dresses, chinos, and more."
      />
      <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
          Sale
        </h1>
        <p className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl">
          Discover limited-time prices on Cotton Garden favorites. Same quality,
          better value.
        </p>
      </div>
      <Grid products={products} loading={loading} />
    </section>
  );
};

export default page;
