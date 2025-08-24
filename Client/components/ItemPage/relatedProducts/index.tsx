import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import axios from "axios";
import Grid from "@/components/grid";
import Link from "next/link";

interface Props {
  id: string | string[];
  category: string | string[];
  subCategory: string | string[];
}

const RelatedProducts = ({ category, subCategory, id }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const categorySlug = Array.isArray(category) ? category[0] : category;
  const subCategorySlug = Array.isArray(subCategory)
    ? subCategory[0]
    : subCategory;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/filter?category=${category}&subCategory=${subCategory}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, subCategory]);

  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl sm:text-4xl font-mons tracking-tight text-primary">
          Related products
        </h2>
        {categorySlug && subCategorySlug && (
          <Link
            href={`/products/${encodeURIComponent(
              categorySlug
            )}/${encodeURIComponent(subCategorySlug)}`}
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            View all
          </Link>
        )}
      </div>
      <Grid
        products={products.filter((product) => product._id !== id)}
        loading={loading}
      />
    </div>
  );
};

export default RelatedProducts;
