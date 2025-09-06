import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";

const Hero = () => {
  const [counters, setCounters] = useState({
    brands: 0,
    products: 0,
    customers: 0,
  });

  useEffect(() => {
    // Animate counters
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = duration / steps;

      const targets = { brands: 200, products: 2000, customers: 30000 };
      const increments = {
        brands: targets.brands / steps,
        products: targets.products / steps,
        customers: targets.customers / steps,
      };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        setCounters({
          brands: Math.min(
            Math.floor(increments.brands * step),
            targets.brands
          ),
          products: Math.min(
            Math.floor(increments.products * step),
            targets.products
          ),
          customers: Math.min(
            Math.floor(increments.customers * step),
            targets.customers
          ),
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    // Start counter animation after a delay
    const timeout = setTimeout(animateCounters, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-svh w-full bg-secondary px-4 sm:px-6 md:px-12 xl:px-24 flex flex-col md:flex-row relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full opacity-60"
        {...globalAnimations.floating}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 bg-primary/10 rounded-full opacity-40"
        {...globalAnimations.floating}
        transition={{ delay: 1, duration: 4 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/10 rounded-full opacity-30"
        {...globalAnimations.pulse}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 2,
        }}
      />

      <motion.div
        className="w-full md:w-1/2 h-full flex flex-col justify-end md:justify-center gap-4 items-center md:items-start text-center md:text-left relative z-10"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-5xl font-mons tracking-tight"
          variants={globalAnimations.staggerChild}
        >
          FIND CLOTHES THAT <br /> MATCHES YOUR STYLE
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base lg:text-xl font-light max-w-xl"
          variants={globalAnimations.staggerChild}
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </motion.p>
        <motion.div variants={globalAnimations.staggerChild}>
          <Link
            href="/products"
            className="bg-primary text-white px-6 sm:px-8 py-3 rounded-full w-fit hover:bg-primary/90 hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-0 lg:gap-4 mt-8 w-full"
          variants={globalAnimations.staggerChild}
        >
          <motion.div
            className="flex flex-col gap-1 items-center md:items-start"
            {...globalAnimations.hoverScale}
          >
            <h2 className="text-3xl sm:text-4xl md:text-3xl xl:text-5xl font-medium text-primary">
              {counters.brands}+
            </h2>
            <p className="font-light text-xs sm:text-sm md:text-xs xl:text-sm">
              Original Brands
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-1 items-center md:items-start"
            {...globalAnimations.hoverScale}
          >
            <h2 className="text-3xl sm:text-4xl md:text-3xl xl:text-5xl font-medium text-primary">
              {counters.products.toLocaleString()}+
            </h2>
            <p className="font-light text-xs sm:text-sm md:text-xs xl:text-sm">
              High Quality Products
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-1 items-center md:items-start"
            {...globalAnimations.hoverScale}
          >
            <h2 className="text-3xl sm:text-4xl md:text-3xl xl:text-5xl font-medium text-primary">
              {counters.customers.toLocaleString()}+
            </h2>
            <p className="font-light text-xs sm:text-sm md:text-xs xl:text-sm">
              Happy Customers
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="w-full md:w-1/2 relative">
        <motion.img
          src="/images/hero.png"
          alt="hero"
          className="w-full h-80 md:h-full object-cover object-top rounded-2xl"
          {...globalAnimations.slideInRight}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {/* Floating elements around the image */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full opacity-70"
          {...globalAnimations.floating}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-4 w-6 h-6 bg-primary/60 rounded-full opacity-80"
          {...globalAnimations.pulse}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-6 w-4 h-4 bg-primary/40 rounded-full opacity-60"
          {...globalAnimations.pulse}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 2.5,
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
