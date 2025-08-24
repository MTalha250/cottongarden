import React from "react";

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5 text-amber-400"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    quote:
      "I'm blown away by the quality and style of the clothes I received from Cotton Garden. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    quote:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Cotton Garden. The range of options is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "James L.",
    quote:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Cotton Garden. The selection is diverse, on-point with the latest trends, and the quality is superb.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-16 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 blur-3xl opacity-60" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-100 blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
            Our Happy Customers
          </h2>
          <div className="hidden sm:flex items-center gap-3 z-10">
            <button className="h-10 w-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">
              <span className="sr-only">Previous</span>
              <span aria-hidden>←</span>
            </button>
            <button className="h-10 w-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">
              <span className="sr-only">Next</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm z-10"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {t.name}
                </h3>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs">
                  ✓
                </span>
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
