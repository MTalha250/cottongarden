"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Product } from "@/types";
import Grid from "@/components/grid";
import { Search } from "@/components/ui/search";
import { useParams } from "next/navigation";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { query } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/filter?query=${query}&page=${page}`
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [page]);

  return (
    <div className="pt-28 pb-10 px-6 md:px-12 lg:px-24">
      <SEO
        title="Search Results | Cotton Garden"
        description="Find Cotton Garden styles across mens, womens, and kids. Search by name, color, size, or category."
      />
      <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
          Search
        </h1>
        <p className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl">
          Discover breathable cotton essentials tailored to your query.
        </p>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-5 w-full items-center">
        <h2 className="font-mons shrink-0 border border-gray-300 rounded-full px-4 py-2 text-sm sm:text-base">
          {products.length} {products.length > 1 ? "Products" : "Product"}
        </h2>
        <Search
          placeholders={[
            "Search by product name or category",
            "Find items by color, size, or style",
            "Search cotton tees, dresses, chinos, and more",
          ]}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={() => router.push(`/search/${search}`)}
        />
      </div>
      <h1 className="text-lg sm:text-xl md:text-2xl font-mons tracking-tight text-primary mt-10">
        Showing Results for "{decodeURI(query.toString())}"
      </h1>
      <Grid loading={loading} products={products} />
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
