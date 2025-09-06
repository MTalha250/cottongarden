"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { Blog } from "@/types";
import SEO from "@/components/seo";

const Page = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
      );
      setBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (
    <div className="px-6 md:px-12 xl:px-24 pt-28 pb-20">
      <SEO
        title={blog?.title}
        description={blog?.description}
        image={blog?.titleImage}
        author={blog?.author}
      />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="w-full lg:w-2/3 space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
            {blog?.title}
          </h1>
          <p className="mt-2 text-gray-600">{blog?.description}</p>
          <div className="flex flex-col sm:flex-row justify-between py-3 border-y border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={blog?.authorImage}
                alt="author"
                className="w-10 h-10 rounded-full"
              />
              <p className="md:text-lg">{blog?.author}</p>
            </div>
            <div className="text-gray-600 mt-3 sm:mt-0 text-sm sm:text-base">
              <p>{blog?.timeToRead} min read</p>
              <p>
                {blog?.createdAt.slice(0, 10).split("-").reverse().join("-")}
              </p>
            </div>
          </div>
          <img
            src={blog?.titleImage}
            alt=""
            className="w-full h-[50vh] object-cover rounded-2xl"
          />
          <div
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            className="text-gray-800 prose prose-neutral max-w-none"
          ></div>
        </div>
        <div className="w-full lg:w-1/3 lg:sticky h-[30vh] sm:h-[40vh] lg:h-[60vh] top-24">
          <div className="relative bg-gray-100 border border-gray-200 rounded-2xl h-full w-full overflow-hidden">
            <img
              src="https://via.placeholder.com/300x300"
              alt="background"
              className="w-full h-full object-cover"
            />
            <Link
              href="/products"
              className="whitespace-nowrap absolute left-1/2 -translate-x-1/2 bottom-10 inline-block px-8 py-3 rounded-full bg-primary text-white text-base sm:text-lg font-mons transition duration-300 hover:bg-primary-hover"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
