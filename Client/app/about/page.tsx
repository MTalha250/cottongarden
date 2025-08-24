import React from "react";
import SEO from "@/components/seo";

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | Cotton Garden"
        description="At Cotton Garden, we craft breathable cotton essentials for men, women, and kids — made for everyday comfort and timeless style."
      />
      <div className="relative pt-28 pb-10 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60" />

        <section className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="tracking-widest text-xs md:text-sm text-gray-500 uppercase">
              Who we are
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
              Everyday cotton, thoughtfully made
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg max-w-xl">
              We create breathable, long‑lasting clothing for men, women, and
              kids. From soft tees to effortless dresses and chinos, our pieces
              are designed for comfort that lasts beyond the season.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="/products"
                className="rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2 text-sm"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className="rounded-full border border-gray-300 hover:bg-neutral-100 px-5 py-2 text-sm"
              >
                Contact
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-medium text-primary">10k+</p>
                <p className="text-sm text-gray-500">Happy families</p>
              </div>
              <div>
                <p className="text-3xl font-medium text-primary">100%</p>
                <p className="text-sm text-gray-500">Cotton‑first ethos</p>
              </div>
              <div>
                <p className="text-3xl font-medium text-primary">500+</p>
                <p className="text-sm text-gray-500">Everyday styles</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative h-[420px] w-full">
              <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-gray-100 shadow-sm" />
              <img
                src="/images/a2.png"
                alt="Cotton Garden 1"
                className="absolute top-6 left-6 w-[65%] h-[72%] object-cover object-top rounded-2xl shadow-md"
              />
              <img
                src="/images/a1.png"
                alt="Cotton Garden 2"
                className="absolute bottom-6 right-6 w-[62%] h-[68%] object-cover object-top rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="relative max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-tight text-primary mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We’re here to make getting dressed easy. Our cotton‑first approach
              means breathable fabrics, modern fits, and versatile styles —
              without compromise.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Comfort you can count on</li>
              <li>Durable quality at fair prices</li>
              <li>Designs that outlast trends</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="/images/a3.jpg"
              alt="Mission"
              className="w-full h-[360px] object-cover rounded-2xl"
            />
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-7xl mx-auto mt-16">
          <h3 className="text-xl md:text-2xl font-mons text-primary text-center">
            How we make it
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Source", text: "Choose soft, breathable cotton" },
              { title: "Design", text: "Modern fits for every day" },
              { title: "Make", text: "Careful construction and finishing" },
              { title: "Wear", text: "Pieces that last beyond a season" },
            ].map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-gray-200 bg-white p-5"
              >
                <span className="absolute -top-3 left-5 inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary text-white text-xs">
                  {i + 1}
                </span>
                <h4 className="mt-2 text-lg font-mons">{s.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-16">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-mons text-primary">
              Thoughtful by design
            </h3>
            <p className="mt-2 text-gray-600 max-w-3xl">
              We aim for better choices at every step — from fabric selection to
              packaging. It’s a journey, and we’re committed to doing more.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-16">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-mons tracking-tight text-primary mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Founded with a love for natural fabrics, Cotton Garden began as a
              small idea: make quality cotton pieces that feel good, look good,
              and last. Today, we design collections for the whole family with a
              focus on comfort, durability, and timeless style.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto mt-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg md:text-xl font-mons text-primary">
                Discover breathable essentials
              </h4>
              <p className="text-sm text-gray-600">
                Shop cotton pieces for men, women and kids.
              </p>
            </div>
            <a
              href="/products"
              className="rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2 text-sm"
            >
              Explore products
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
