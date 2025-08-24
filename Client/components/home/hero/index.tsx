import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="h-svh w-full bg-secondary px-4 sm:px-6 md:px-16 lg:px-24 flex flex-col md:flex-row relative overflow-hidden">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-end md:justify-center gap-4 items-center md:items-start text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-mons tracking-tight">
          FIND CLOTHES THAT <br /> MATCHES YOUR STYLE
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-xl">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Link
          href="/products"
          className="bg-primary text-white px-6 sm:px-8 py-3 rounded-full w-fit"
        >
          Shop Now
        </Link>
        <div className="grid grid-cols-3 gap-4 mt-8 w-full">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
              200+
            </h2>
            <p className="font-light text-xs sm:text-sm">Original Brands</p>
          </div>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
              2,000+
            </h2>
            <p className="font-light text-xs sm:text-sm">
              High Quality Products
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
              30,000+
            </h2>
            <p className="font-light text-xs sm:text-sm">Happy Customers</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src="/images/hero.jpg"
          alt="hero"
          className="w-full h-80 md:h-full object-cover object-top rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
