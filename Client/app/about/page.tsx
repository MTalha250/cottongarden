"use client";
import React from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
import SEO from "@/components/seo";

const AboutUs = () => {
  return (
    <motion.div
      className="relative pt-28 pb-10 px-6 md:px-12 lg:px-24"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title="About Us | Cotton Garden"
        description="At Cotton Garden, we craft breathable cotton essentials for men, women, and kids — made for everyday comfort and timeless style."
      />
      <motion.section
        className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        <motion.div
          className="order-2 lg:order-1"
          variants={globalAnimations.staggerChild}
        >
          <motion.p
            className="tracking-widest text-xs md:text-sm text-gray-500 uppercase"
            variants={globalAnimations.staggerChild}
          >
            Who we are
          </motion.p>
          <motion.h1
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
            variants={globalAnimations.staggerChild}
          >
            Everyday cotton, thoughtfully made
          </motion.h1>
          <motion.p
            className="mt-4 text-gray-600 md:text-lg max-w-xl"
            variants={globalAnimations.staggerChild}
          >
            We create breathable, long‑lasting clothing for men, women, and
            kids. From soft tees to effortless dresses and chinos, our pieces
            are designed for comfort that lasts beyond the season.
          </motion.p>
          <motion.div
            className="mt-6 flex gap-3"
            variants={globalAnimations.staggerChild}
          >
            <motion.a
              href="/products"
              className="rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2 text-sm"
              {...globalAnimations.buttonHover}
            >
              Shop Now
            </motion.a>
            <motion.a
              href="/contact"
              className="rounded-full border border-gray-300 hover:bg-neutral-100 px-5 py-2 text-sm"
              {...globalAnimations.buttonHover}
            >
              Contact
            </motion.a>
          </motion.div>
          <motion.div
            className="mt-8 grid grid-cols-3 gap-6"
            variants={globalAnimations.staggerChild}
          >
            <motion.div
              {...globalAnimations.scaleIn}
              transition={{ delay: 0.1 }}
            >
              <p className="text-3xl font-medium text-primary">10k+</p>
              <p className="text-sm text-gray-500">Happy families</p>
            </motion.div>
            <motion.div
              {...globalAnimations.scaleIn}
              transition={{ delay: 0.2 }}
            >
              <p className="text-3xl font-medium text-primary">100%</p>
              <p className="text-sm text-gray-500">Cotton‑first ethos</p>
            </motion.div>
            <motion.div
              {...globalAnimations.scaleIn}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl font-medium text-primary">500+</p>
              <p className="text-sm text-gray-500">Everyday styles</p>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="order-1 lg:order-2"
          variants={globalAnimations.staggerChild}
        >
          <motion.div
            className="relative h-[420px] w-full"
            {...globalAnimations.floating}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-gray-100 shadow-sm" />
            <motion.img
              src="/images/a2.png"
              alt="Cotton Garden 1"
              className="absolute top-6 left-6 w-[65%] h-[72%] object-cover object-top rounded-2xl shadow-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={viewportSettings}
            />
            <motion.img
              src="/images/a1.png"
              alt="Cotton Garden 2"
              className="absolute bottom-6 right-6 w-[62%] h-[68%] object-cover object-top rounded-2xl shadow-md"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={viewportSettings}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="relative max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        <motion.div
          className="rounded-2xl border border-gray-200 bg-white p-6 order-2 lg:order-1"
          variants={globalAnimations.staggerChild}
          {...globalAnimations.cardHover}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-tight text-primary mb-3"
            variants={globalAnimations.staggerChild}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-gray-600 leading-relaxed"
            variants={globalAnimations.staggerChild}
          >
            We're here to make getting dressed easy. Our cotton‑first approach
            means breathable fabrics, modern fits, and versatile styles —
            without compromise.
          </motion.p>
          <motion.ul
            className="mt-4 list-disc list-inside text-gray-600 text-sm space-y-1"
            variants={globalAnimations.staggerChild}
          >
            <li>Comfort you can count on</li>
            <li>Durable quality at fair prices</li>
            <li>Designs that outlast trends</li>
          </motion.ul>
        </motion.div>
        <motion.div
          className="order-1 lg:order-2"
          variants={globalAnimations.staggerChild}
        >
          <motion.img
            src="/images/a3.jpg"
            alt="Mission"
            className="w-full h-[360px] object-cover rounded-2xl"
            {...globalAnimations.hoverScale}
          />
        </motion.div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        className="max-w-7xl mx-auto mt-16"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        <motion.h3
          className="text-xl md:text-2xl font-mons text-primary text-center"
          variants={globalAnimations.staggerChild}
        >
          How we make it
        </motion.h3>
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={globalAnimations.staggerContainer}
        >
          {[
            { title: "Source", text: "Choose soft, breathable cotton" },
            { title: "Design", text: "Modern fits for every day" },
            { title: "Make", text: "Careful construction and finishing" },
            { title: "Wear", text: "Pieces that last beyond a season" },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl border border-gray-200 bg-white p-5"
              variants={globalAnimations.staggerChild}
              {...globalAnimations.cardHover}
            >
              <span className="absolute -top-3 left-5 inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary text-white text-xs">
                {i + 1}
              </span>
              <h4 className="mt-2 text-lg font-mons">{s.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="max-w-7xl mx-auto mt-16"
        {...globalAnimations.slideUp}
      >
        <motion.div
          className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
          {...globalAnimations.cardHover}
        >
          <motion.h3
            className="text-xl md:text-2xl font-mons text-primary"
            {...globalAnimations.slideUp}
          >
            Thoughtful by design
          </motion.h3>
          <motion.p
            className="mt-2 text-gray-600 max-w-3xl"
            {...globalAnimations.slideUp}
            transition={{ delay: 0.1 }}
          >
            We aim for better choices at every step — from fabric selection to
            packaging. It's a journey, and we're committed to doing more.
          </motion.p>
        </motion.div>
      </motion.section>

      <motion.section
        className="max-w-7xl mx-auto mt-16"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        <motion.div
          className="text-center"
          variants={globalAnimations.staggerChild}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-tight text-primary mb-4"
            variants={globalAnimations.staggerChild}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-gray-600 leading-relaxed max-w-4xl mx-auto"
            variants={globalAnimations.staggerChild}
          >
            Founded with a love for natural fabrics, Cotton Garden began as a
            small idea: make quality cotton pieces that feel good, look good,
            and last. Today, we design collections for the whole family with a
            focus on comfort, durability, and timeless style.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="max-w-7xl mx-auto mt-16"
        {...globalAnimations.slideUp}
      >
        <motion.div
          className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          {...globalAnimations.cardHover}
        >
          <motion.div {...globalAnimations.slideUp}>
            <h4 className="text-lg md:text-xl font-mons text-primary">
              Discover breathable essentials
            </h4>
            <p className="text-sm text-gray-600">
              Shop cotton pieces for men, women and kids.
            </p>
          </motion.div>
          <motion.a
            href="/products"
            className="rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2 text-sm"
            {...globalAnimations.buttonHover}
          >
            Explore products
          </motion.a>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default AboutUs;
