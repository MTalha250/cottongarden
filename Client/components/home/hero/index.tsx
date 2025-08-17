import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="h-dvh relative">
      <video
        src="/video.mp4"
        muted
        autoPlay
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-24 tracking-widest">
        <div className="w-full md:w-4/5 lg:w-3/5 mt-10 sm:mt-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase font-mons">
            Gear Up, Push Harder
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white my-6 sm:my-8 md:my-10 font-extralight">
            Elevate your performance with premium gym wear designed for ultimate
            comfort, durability, and style. Whether you're pushing limits or
            embracing recovery, our gear empowers you to move confidently and
            look your best, both in and out of the gym.
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary-hover transition duration-200 text-white px-4 py-2 sm:px-6 sm:py-3 uppercase font-mons text-sm md:text-base"
          >
            TO THE CATALOGUE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
