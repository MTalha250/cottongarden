"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "@/components/ItemPage/slider";
import ReactLoading from "react-loading";
import Reviews from "@/components/ItemPage/reviews";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { Product } from "@/types";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";
import RelatedProducts from "@/components/ItemPage/relatedProducts";
import SEO from "@/components/seo";

const page = () => {
  const { id, category, subCategory } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const { inWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { addItem, addQuantity } = useCartStore();
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`
      );
      setProduct(response.data);
      setColor(response.data.variants[0].color);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="cylon" color="#000000" />
    </div>
  ) : product ? (
    <section className="pt-28 pb-16 px-6 md:px-12 lg:px-24">
      <SEO
        title={product?.name}
        description={product?.description}
        image={product?.images[0]}
      />
      <div className="flex flex-col md:flex-row">
        <Slider photos={product?.images} />
        <div className="mt-10 md:mt-0 w-full md:w-1/2 md:pl-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary mb-3 md:mb-5">
            {product?.name}
          </h1>
          <p className="md:text-lg lg:text-xl mb-3 md:mb-5 font-mons text-primary">
            PKR {(product?.finalPrice).toLocaleString()}
            {product?.discount > 0 && (
              <span className="line-through text-gray-400 text-sm ml-2">
                PKR {product?.price.toLocaleString()}
              </span>
            )}
          </p>

          <div className="mb-3">
            <p className="font-extralight text-sm mb-1">Color:</p>
            <div className="flex gap-2">
              {product?.variants.map((v: any) => (
                <button
                  key={v._id}
                  className={`px-3 py-1 rounded-full font-extralight hover:border-gray-900 text-sm border ${
                    v.color == color ? "border-gray-900" : "border-gray-300"
                  }`}
                  onClick={() => {
                    setColor(v.color);
                    setSize("");
                  }}
                >
                  {v.color[0].toUpperCase() + v.color.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="font-extralight text-sm mb-1">Size:</p>
            <div className="flex gap-2">
              {product?.variants
                .find((v: any) => v.color == color)
                ?.sizes.sort((a, b) => {
                  const order = ["S", "M", "L", "XL", "XXL", "XXXL"];
                  return order.indexOf(a) - order.indexOf(b);
                })
                .map((s: string) => (
                  <button
                    key={s}
                    className={`px-3 py-1 rounded-full font-extralight hover:border-gray-900 text-sm border ${
                      s == size ? "border-gray-900" : "border-gray-300"
                    }`}
                    onClick={() => setSize(s)}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-2 mb-5 md:mb-10">
            {product?.inStock && (
              <div className="flex items-center text-lg text-gray-800 border border-gray-300 rounded-full w-fit">
                <button
                  className="py-1 px-2 font-light"
                  disabled={count <= 1}
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <HiMinusSmall />
                </button>
                <span className="font-light py-1 w-10 text-center inline-block">
                  {count}
                </span>
                <button
                  className="py-1 px-2 font-light"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <GoPlus />
                </button>
              </div>
            )}
            {product?.inStock ? (
              <button
                onClick={() => {
                  if (!size && !color) {
                    toast.error("Please select size and color");
                    return;
                  }
                  if (!size) {
                    toast.error("Please select size");
                    return;
                  }
                  if (!color) {
                    toast.error("Please select color");
                    return;
                  }
                  addItem(
                    {
                      product,
                      quantity: 1,
                      size,
                      color,
                    },
                    user ? true : false,
                    token
                  );
                  for (let i = 1; i < count; i++) {
                    addQuantity(
                      product._id + size + color,
                      user ? true : false,
                      token
                    );
                  }
                  toast.success("Added to cart");
                  setSize("");
                  setCount(1);
                }}
                className="rounded-full bg-primary hover:bg-primary-hover text-white px-6 py-2 duration-200 transition"
              >
                Add to Cart
              </button>
            ) : (
              <p className="group flex items-center justify-center border border-gray-300 bg-neutral-200 rounded-full px-6 py-2 text-gray-700 transition-colors">
                Out of Stock
              </p>
            )}
            <button
              onClick={() => {
                if (user) {
                  if (inWishlist(product._id)) {
                    removeFromWishlist(product._id, token);
                    toast.success("Removed from wishlist");
                  } else {
                    addToWishlist(
                      {
                        product,
                      },
                      token
                    );
                    toast.success("Added to wishlist");
                  }
                } else {
                  toast.error("Please login to add to wishlist");
                  router.push("/login");
                }
              }}
              className="group p-3 rounded-full border border-gray-300 hover:bg-gray-50"
            >
              {inWishlist(product._id) ? (
                <MdFavorite className="text-tertiary text-xl md:text-2xl group-hover:scale-125 transition duration-200" />
              ) : (
                <MdFavoriteBorder className="text-tertiary text-xl md:text-2xl group-hover:scale-125 transition duration-200" />
              )}
            </button>
          </div>
          {product?.description && (
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
              {product?.description}
            </p>
          )}
          <p className="mt-5 font-light leading-relaxed text-gray-600">
            Category: {product?.subCategory}, {product?.category}
          </p>
          {product.brand && (
            <p className="font-light leading-relaxed text-gray-600">
              Brand: {product.brand}
            </p>
          )}
        </div>
      </div>
      <Reviews
        reviews={product.reviews}
        userEmail={user?.email || ""}
        onSubmitReview={async (review) => {
          try {
            await axios.post(
              ` ${process.env.NEXT_PUBLIC_API_URL}/product/review/${id}`,
              {
                review: {
                  name: user?.name,
                  email: user?.email,
                  ...review,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            getProduct();
            toast.success("Review posted");
          } catch (error) {
            console.log(error);
          }
        }}
        className="mt-10"
      />
      <RelatedProducts category={category} subCategory={subCategory} id={id} />
    </section>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl text-gray-800">Product not found</h1>
    </div>
  );
};

export default page;
