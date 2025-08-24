import React from "react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="tracking-widest text-xs md:text-sm text-gray-500 uppercase">
            Discover Cotton Garden
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
            Timeless cotton essentials for men, women, and kids
          </h2>
          <p className="mt-5 text-gray-600 md:text-lg font-light">
            At <span className="font-medium text-primary">Cotton Garden</span>,
            we craft everyday clothing from premium, breathable fabrics that
            feel good and last longer. From playful kidswear to refined
            womenswear and effortless menswear, our collections are made for
            comfort, quality, and modern style.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                Him
              </div>
              <h3 className="mt-3 text-base font-mons text-gray-900">
                Menswear
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Essential tees, chinos, polos, and outerwear for everyday ease.
              </p>
            </div>
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                Her
              </div>
              <h3 className="mt-3 text-base font-mons text-gray-900">
                Womenswear
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Soft silhouettes, breathable dresses, and knitwear made to move.
              </p>
            </div>
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                Kids
              </div>
              <h3 className="mt-3 text-base font-mons text-gray-900">
                Kidswear
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Play-proof styles in cozy cotton for little adventurers.
              </p>
            </div>
          </div>

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

          <div className="mt-10 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-medium text-primary">10k+</p>
              <p className="text-sm text-gray-500">Happy families</p>
            </div>
            <div>
              <p className="text-3xl font-medium text-primary">100%</p>
              <p className="text-sm text-gray-500">Cotton-first approach</p>
            </div>
            <div>
              <p className="text-3xl font-medium text-primary">500+</p>
              <p className="text-sm text-gray-500">Everyday styles</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative h-[440px] w-full">
            <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-gray-100 shadow-sm" />
            <img
              src="/images/about1.png"
              alt="Cotton Garden apparel collage 1"
              className="absolute top-6 left-6 w-[60%] h-[75%] object-cover rounded-2xl shadow-md"
            />
            <img
              src="/images/about2.png"
              alt="Cotton Garden apparel collage 2"
              className="absolute bottom-6 right-6 w-[55%] h-[65%] object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
