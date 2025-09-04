"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Grid from "@/components/grid";
import Link from "next/link";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-16 md:py-20 overflow-hidden">
      <motion.div
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="tracking-widest text-xs md:text-sm text-gray-500 uppercase"
            variants={itemVariants}
          >
            Cotton Garden Picks
          </motion.p>
          <motion.h2
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
            variants={itemVariants}
          >
            Discover our featured products
          </motion.h2>
          <motion.p
            className="mt-3 text-gray-600 md:text-lg max-w-2xl"
            variants={itemVariants}
          >
            Everyday cotton essentials for men, women, and kids—made to last and
            feel great.
          </motion.p>
          <motion.div className="mt-6" variants={itemVariants}>
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm hover:bg-primary/90 hover:scale-105 transition-all duration-300"
            >
              View All Products
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-10">
          <Grid products={products} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default Discover;
