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
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto">
        <p className="tracking-widest text-xs md:text-sm text-gray-500 uppercase">
          Need help?
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-mons tracking-tight text-primary">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-gray-600 md:text-lg max-w-2xl">
          Answers to common questions about sizing, shipping, returns and more
          for Cotton Garden apparel.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600">
            Shipping
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600">
            Returns
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600">
            Sizing
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600">
            Orders
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600">
            Payments
          </span>
        </div>

        <div className="mt-10">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq._id}
                value={`item-${faq._id}`}
                className="mb-4 rounded-xl border border-gray-200 bg-white px-4 md:px-6"
              >
                <AccordionTrigger className="py-4 md:py-5 md:text-lg font-mons tracking-wide text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="md:text-base pb-5 text-gray-600 leading-relaxed">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-mons text-primary">
              Still have questions?
            </h3>
            <p className="text-gray-600">
              We’re here to help every day, 9am–6pm.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
