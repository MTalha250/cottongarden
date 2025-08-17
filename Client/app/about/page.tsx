import Faqs from "@/components/home/faqs";
import React from "react";
import img1 from "@/assets/about1.png";
import img2 from "@/assets/about2.png";
import SEO from "@/components/seo";

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | GYMGear"
        description="At GYMGear, we believe in performance, style, and affordability. Our journey has been about creating gym apparel that looks great and performs even better, empowering athletes to push their limits."
      />
      <div className="pt-32 pb-10 px-6 md:px-12 lg:px-24">
        <section className="bg-white text-center md:text-left">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 px-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-wide mb-4">
                About Us
              </h1>
              <p className="text-lg text-gray-600">
                At GYMGear, we believe in performance, style, and affordability.
                Our journey has been about creating gym apparel that looks great
                and performs even better, empowering athletes to push their
                limits.
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <img
                src={img1.src}
                alt="About Us Image"
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 px-6">
                <img
                  src={img2.src}
                  alt="Mission Image"
                  className="w-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mb-8 md:mb-0 px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-wide mb-4">
                  Our Mission
                </h2>
                <p className="text-md text-gray-600 leading-relaxed">
                  Our mission is to provide high-quality, affordable gym wear
                  that empowers you to perform at your best. Whether you’re
                  lifting, running, or stretching, we are here to help you
                  achieve greatness.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-wide mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Founded by a group of fitness enthusiasts, GYMGear was born out of
              frustration with overpriced gym apparel that didn’t live up to
              expectations. We knew there had to be a better way to create
              high-quality, performance-driven gym wear that wouldn’t break the
              bank. Our journey started with a simple vision: to offer top-tier
              gym apparel that blends style, durability, and comfort at an
              affordable price.
            </p>
          </div>
        </section>
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-mons tracking-wider mb-6">
              GYMGear by the Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-100 p-6">
                <h3 className="text-xl md:text-2xl font-mons text-gray-800 mb-4">
                  5+ Years
                </h3>
                <p className="text-md text-gray-600">
                  Experience in the fitness industry
                </p>
              </div>
              <div className="bg-gray-100 p-6">
                <h3 className="text-xl md:text-2xl font-mons text-gray-800 mb-4">
                  10,000+
                </h3>
                <p className="text-md text-gray-600">
                  Happy customers around the globe
                </p>
              </div>
              <div className="bg-gray-100 p-6">
                <h3 className="text-xl md:text-2xl font-mons text-gray-800 mb-4">
                  50+
                </h3>
                <p className="text-md text-gray-600">
                  Countries we’ve shipped to
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      <Faqs />
    </>
  );
};

export default AboutUs;
