import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";

const AboutUs = () => {
  const [counters, setCounters] = useState({
    families: 0,
    cotton: 0,
    styles: 0,
  });

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const targets = { families: 10000, cotton: 100, styles: 500 };
    const increments = {
      families: targets.families / steps,
      cotton: targets.cotton / steps,
      styles: targets.styles / steps,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters({
        families: Math.min(
          Math.floor(increments.families * step),
          targets.families
        ),
        cotton: Math.min(Math.floor(increments.cotton * step), targets.cotton),
        styles: Math.min(Math.floor(increments.styles * step), targets.styles),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  return (
    <section className="relative py-16 px-6 md:px-12 xl:px-24 overflow-hidden">
      <motion.div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60"
        {...globalAnimations.floating}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60"
        {...globalAnimations.floating}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={globalAnimations.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportSettings}
          onViewportEnter={animateCounters}
        >
          <motion.p
            className="tracking-widest text-xs md:text-sm text-gray-500 uppercase"
            variants={globalAnimations.staggerChild}
          >
            Discover Cotton Garden
          </motion.p>
          <motion.h2
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
            variants={globalAnimations.staggerChild}
          >
            Timeless cotton essentials for men, women, and kids
          </motion.h2>
          <motion.p
            className="mt-5 text-gray-600 md:text-lg font-light"
            variants={globalAnimations.staggerChild}
          >
            At <span className="font-medium text-primary">Cotton Garden</span>,
            we craft everyday clothing from premium, breathable fabrics that
            feel good and last longer. From playful kidswear to refined
            womenswear and effortless menswear, our collections are made for
            comfort, quality, and modern style.
          </motion.p>

          <motion.div
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
            variants={globalAnimations.staggerContainer}
          >
            <motion.div
              className="rounded-xl bg-white shadow-sm border border-gray-100 p-5"
              variants={globalAnimations.staggerChild}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                Him
              </div>
              <h3 className="mt-3 text-base font-mons text-gray-900">
                Menswear
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Essential tees, chinos, polos, and outerwear for everyday ease.
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl bg-white shadow-sm border border-gray-100 p-5"
              variants={globalAnimations.staggerChild}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                Her
              </div>
              <h3 className="mt-3 text-base font-mons text-gray-900">
                Womenswear
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Soft silhouettes, breathable dresses, and knitwear made to move.
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl bg-white shadow-sm border border-gray-100 p-5"
              variants={globalAnimations.staggerChild}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                Kids
              </div>
              <h3 className="mt-3 text-base font-mons text-gray-900">
                Kidswear
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Play-proof styles in cozy cotton for little adventurers.
              </p>
            </motion.div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-full text-sm"
            >
              Explore Collections
            </Link>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                ✓
              </div>
              <span>
                Natural fabrics • Everyday comfort • Thoughtful design
              </span>
            </div>
          </div>

          <motion.div
            className="mt-10 grid grid-cols-3 gap-6"
            variants={globalAnimations.staggerChild}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl font-medium text-primary">
                {counters.families.toLocaleString()}+
              </p>
              <p className="text-sm text-gray-500">Happy families</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl font-medium text-primary">
                {counters.cotton}%
              </p>
              <p className="text-sm text-gray-500">Cotton-first approach</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl font-medium text-primary">
                {counters.styles}+
              </p>
              <p className="text-sm text-gray-500">Everyday styles</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          {...globalAnimations.slideInRight}
          whileInView="animate"
          viewport={viewportSettings}
        >
          <div className="relative h-[440px] w-full">
            <motion.div
              className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-gray-100 shadow-sm"
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src="/images/about1.png"
              alt="Cotton Garden apparel collage 1"
              className="absolute top-6 left-6 w-[60%] h-[75%] object-cover rounded-2xl shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.img
              src="/images/about2.png"
              alt="Cotton Garden apparel collage 2"
              className="absolute bottom-6 right-6 w-[55%] h-[65%] object-cover rounded-2xl shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            />
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-4 -left-2 w-3 h-3 bg-primary/20 rounded-full"
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
