"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
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
    <motion.div
      className="flex justify-center items-center h-screen"
      {...globalAnimations.fadeIn}
    >
      <motion.div {...globalAnimations.pulse}>
        <ReactLoading type="cylon" color="#000000" />
      </motion.div>
    </motion.div>
  ) : product ? (
    <motion.section
      className="pt-28 pb-16 px-6 md:px-12 lg:px-24"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title={product?.name}
        description={product?.description}
        image={product?.images[0]}
      />
      <motion.div
        className="flex flex-col md:flex-row"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="w-full md:w-1/2"
          variants={globalAnimations.staggerChild}
        >
          <Slider photos={product?.images} />
        </motion.div>
        <motion.div
          className="mt-10 md:mt-0 w-full md:w-1/2 md:pl-10"
          variants={globalAnimations.staggerChild}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary mb-3 md:mb-5"
            {...globalAnimations.slideUp}
          >
            {product?.name}
          </motion.h1>
          <motion.p
            className="md:text-lg lg:text-xl mb-3 md:mb-5 font-mons text-primary"
            {...globalAnimations.slideUp}
            transition={{ delay: 0.1 }}
          >
            PKR {(product?.finalPrice).toLocaleString()}
            {product?.discount > 0 && (
              <motion.span
                className="line-through text-gray-400 text-sm ml-2"
                {...globalAnimations.scaleIn}
              >
                PKR {product?.price.toLocaleString()}
              </motion.span>
            )}
          </motion.p>

          <motion.div
            className="mb-3"
            {...globalAnimations.slideUp}
            transition={{ delay: 0.2 }}
          >
            <p className="font-extralight text-sm mb-1">Color:</p>
            <motion.div
              className="flex gap-2"
              variants={globalAnimations.staggerContainer}
              initial="initial"
              animate="animate"
            >
              {product?.variants.map((v: any, index: number) => (
                <motion.button
                  key={v._id}
                  className={`px-3 py-1 rounded-full font-extralight hover:border-gray-900 text-sm border ${
                    v.color == color ? "border-gray-900" : "border-gray-300"
                  }`}
                  onClick={() => {
                    setColor(v.color);
                    setSize("");
                  }}
                  variants={globalAnimations.staggerChild}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {v.color[0].toUpperCase() + v.color.slice(1)}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="mb-4"
            {...globalAnimations.slideUp}
            transition={{ delay: 0.3 }}
          >
            <p className="font-extralight text-sm mb-1">Size:</p>
            <motion.div
              className="flex gap-2"
              variants={globalAnimations.staggerContainer}
              initial="initial"
              animate="animate"
            >
              {product?.variants
                .find((v: any) => v.color == color)
                ?.sizes.sort((a, b) => {
                  const order = ["S", "M", "L", "XL", "XXL", "XXXL"];
                  return order.indexOf(a) - order.indexOf(b);
                })
                .map((s: string, index: number) => (
                  <motion.button
                    key={s}
                    className={`px-3 py-1 rounded-full font-extralight hover:border-gray-900 text-sm border ${
                      s == size ? "border-gray-900" : "border-gray-300"
                    }`}
                    onClick={() => setSize(s)}
                    variants={globalAnimations.staggerChild}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {s.toUpperCase()}
                  </motion.button>
                ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full flex flex-wrap gap-2 mb-5 md:mb-10"
            {...globalAnimations.slideUp}
            transition={{ delay: 0.4 }}
          >
            {product?.inStock && (
              <motion.div
                className="flex items-center text-lg text-gray-800 border border-gray-300 rounded-full w-fit"
                {...globalAnimations.scaleIn}
              >
                <motion.button
                  className="py-1 px-2 font-light"
                  disabled={count <= 1}
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <HiMinusSmall />
                </motion.button>
                <motion.span
                  className="font-light py-1 w-10 text-center inline-block"
                  key={count}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {count}
                </motion.span>
                <motion.button
                  className="py-1 px-2 font-light"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GoPlus />
                </motion.button>
              </motion.div>
            )}
            {product?.inStock ? (
              <motion.button
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
                {...globalAnimations.buttonHover}
              >
                Add to Cart
              </motion.button>
            ) : (
              <motion.p
                className="group flex items-center justify-center border border-gray-300 bg-neutral-200 rounded-full px-6 py-2 text-gray-700 transition-colors"
                {...globalAnimations.scaleIn}
              >
                Out of Stock
              </motion.p>
            )}
            <motion.button
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                key={inWishlist(product._id) ? "filled" : "empty"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {inWishlist(product._id) ? (
                  <MdFavorite className="text-tertiary text-xl md:text-2xl group-hover:scale-125 transition duration-200" />
                ) : (
                  <MdFavoriteBorder className="text-tertiary text-xl md:text-2xl group-hover:scale-125 transition duration-200" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
          {product?.description && (
            <motion.p
              className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify"
              {...globalAnimations.slideUp}
              transition={{ delay: 0.5 }}
            >
              {product?.description}
            </motion.p>
          )}
          <motion.p
            className="mt-5 font-light leading-relaxed text-gray-600"
            {...globalAnimations.slideUp}
            transition={{ delay: 0.6 }}
          >
            Category: {product?.subCategory}, {product?.category}
          </motion.p>
          {product.brand && (
            <motion.p
              className="font-light leading-relaxed text-gray-600"
              {...globalAnimations.slideUp}
              transition={{ delay: 0.7 }}
            >
              Brand: {product.brand}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings}
        transition={{ duration: 0.6 }}
      >
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
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <RelatedProducts
          category={category}
          subCategory={subCategory}
          id={id}
        />
      </motion.div>
    </motion.section>
  ) : (
    <motion.div
      className="flex justify-center items-center h-screen"
      {...globalAnimations.fadeIn}
    >
      <motion.h1
        className="text-3xl text-gray-800"
        {...globalAnimations.slideUp}
      >
        Product not found
      </motion.h1>
    </motion.div>
  );
};

export default page;
