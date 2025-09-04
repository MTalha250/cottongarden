"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";

const Faqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/faq`
      );
      setFaqs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <section className="relative px-6 md:px-16 lg:px-24 py-16 md:py-20 overflow-hidden">
      <motion.div
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60"
        {...globalAnimations.floating}
      />
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60"
        {...globalAnimations.floating}
        transition={{ delay: 1.5, duration: 5 }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        <motion.p
          className="tracking-widest text-xs md:text-sm text-gray-500 uppercase"
          variants={globalAnimations.staggerChild}
        >
          Need help?
        </motion.p>
        <motion.h2
          className="mt-2 text-3xl md:text-4xl font-mons tracking-tight text-primary"
          variants={globalAnimations.staggerChild}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="mt-3 text-gray-600 md:text-lg max-w-2xl"
          variants={globalAnimations.staggerChild}
        >
          Answers to common questions about sizing, shipping, returns and more
          for Cotton Garden apparel.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap gap-3"
          variants={globalAnimations.staggerChild}
        >
          {["Shipping", "Returns", "Sizing", "Orders", "Payments"].map(
            (tag, index) => (
              <motion.span
                key={tag}
                className="px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600"
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>

        <motion.div className="mt-10" variants={globalAnimations.staggerChild}>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={viewportSettings}
              >
                <AccordionItem
                  value={`item-${faq._id}`}
                  className="mb-4 rounded-xl border border-gray-200 bg-white px-4 md:px-6 hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="py-4 md:py-5 md:text-lg font-mons tracking-wide text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="md:text-base pb-5 text-gray-600 leading-relaxed">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-10 rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={viewportSettings}
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <h3 className="text-lg md:text-xl font-mons text-primary">
              Still have questions?
            </h3>
            <p className="text-gray-600">
              We're here to help every day, 9am–6pm.
            </p>
          </div>
          <motion.div {...globalAnimations.buttonHover}>
            <Link
              href="/contact"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm"
            >
              Contact Support
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Faqs;
