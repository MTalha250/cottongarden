"use client";
import Grid from "@/components/blogs/grid";
import { BlogCategory, Blog } from "@/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SEO from "@/components/seo";

const page = () => {
  const ref = useRef(null as unknown as HTMLDivElement);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState("");

  const fetchBlogCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogCategory`
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&category=${selected}`
      );
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, [page, selected]);
  return (
    <div className="pt-28 pb-10 px-6 md:px-12 xl:px-24">
      <SEO
        title="Blog | Cotton Garden"
        description="Stories and style notes from Cotton Garden. Explore fabric care, seasonal edits, and behind-the-scenes features."
      />
      <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
          Cotton Garden Journal
        </h1>
        <p className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl">
          Fabric guides, style tips, and updates from our studio.
        </p>
      </div>
      <div className="flex items-center mt-10">
        <div className="pr-2 sm:pr-5 z-10">
          <button
            className="rounded-full border p-2 hover:bg-primary hover:text-white transition duration-300"
            onClick={() => {
              ref.current.scrollLeft -= 200;
            }}
          >
            <GoChevronLeft className="text-lg sm:text-xl" />
          </button>
        </div>
        <div
          ref={ref}
          className="flex overflow-x-hidden gap-2 scrollbar scrollbar-none px-5 w-full"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          <button
            className={
              !selected
                ? "px-4 py-2 font-light border border-gray-900 rounded-full whitespace-nowrap text-sm md:text-base"
                : "px-4 py-2 font-light border border-gray-300 rounded-full whitespace-nowrap text-sm md:text-base"
            }
            onClick={() => {
              setSelected("");
            }}
          >
            All
          </button>
          {categories.map((tag) => (
            <button
              key={tag._id}
              className={
                selected === tag.name
                  ? "px-4 py-2 font-light border border-gray-900 rounded-full whitespace-nowrap text-sm md:text-base"
                  : "px-4 py-2 font-light border border-gray-300 rounded-full whitespace-nowrap text-sm md:text-base"
              }
              onClick={() => {
                setSelected(tag.name);
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="pl-2 sm:pl-5">
          <button
            className="rounded-full border p-2 hover:bg-primary hover:text-white transition duration-300"
            onClick={() => {
              ref.current.scrollLeft += 200;
            }}
          >
            <GoChevronRight className="text-lg sm:text-xl" />
          </button>
        </div>
      </div>
      <Grid loading={loading} blogs={blogs} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page === 1) return;
                setPage(page - 1);
              }}
              disabled={page === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                onClick={() => {
                  setPage(p);
                }}
                isActive={p === page}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (page === totalPages) return;
                setPage(page + 1);
              }}
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default page;
