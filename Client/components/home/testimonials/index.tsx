import React from "react";
import img1 from "@/assets/p1.jpg";
import img2 from "@/assets/p2.jpg";
import img3 from "@/assets/p3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Ali",
    image: img1.src,
    quote:
      "GYMGear has completely changed my workout experience. The clothes are not only stylish but also incredibly durable. I feel empowered every time I step into the gym wearing GYMGear, and I know I’m getting quality without overspending.",
  },
  {
    id: 2,
    name: "Sara Khan",
    image: img2.src,
    quote:
      "As someone who values both comfort and performance, GYMGear has been a game-changer. The apparel feels great, even during the toughest workouts. Plus, it’s affordable, which is such a relief. GYMGear is a brand that truly gets what athletes need.",
  },
  {
    id: 3,
    name: "Bilal Hussain",
    image: img3.src,
    quote:
      "I’ve tried so many gym brands, but GYMGear stands out in terms of quality and fit. Their mission to make gym wear affordable without compromising on quality really shows. Every product feels like it was made for high performance and comfort.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-wider font-mons">
          Testimonials
        </h2>
        <p className="text-gray-600 mt-2">
          See what our customers have to say about GYMGear
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-8 shadow-lg text-center hover:-translate-y-5 transition duration-300"
          >
            <div className="w-16 h-16  sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 relative">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover rounded-full w-full h-full"
              />
            </div>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              <span className="text-primary text-2xl font-bold">“</span>
              {testimonial.quote}
              <span className="text-primary text-2xl font-bold">”</span>
            </p>
            <h3 className="text-xl font-medium text-gray-800">
              {testimonial.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
