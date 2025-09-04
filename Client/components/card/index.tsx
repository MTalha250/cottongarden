import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useWishlistStore } from "@/store/wishlistStore";
import useAuthStore from "@/store/authStore";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { globalAnimations } from "@/lib/animations";

interface Props {
  product: Product;
}

function Card({ product }: Props) {
  const { inWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const { user, token } = useAuthStore();

  return (
    <motion.div
      className="relative group w-full"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/products/${product.category}/${product.subCategory}/${product._id}`}
        className="block text-black"
      >
        <div className="relative overflow-hidden rounded-xl">
          <motion.div
            id="imgs"
            className="w-full h-[50vh] bg-center bg-cover bg-no-repeat rounded-xl"
            style={{
              backgroundImage: `url(${product.images[0]})`,
            }}
            onMouseEnter={(e) => {
              if (product.images[1]) {
                (
                  e.currentTarget as HTMLElement
                ).style.backgroundImage = `url(${product.images[1]})`;
              }
            }}
            onMouseLeave={(e) => {
              (
                e.currentTarget as HTMLElement
              ).style.backgroundImage = `url(${product.images[0]})`;
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          {!product.inStock && (
            <motion.div
              className="absolute bg-black/40 w-full h-full top-0 left-0 flex items-center justify-center rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white/90 p-3 shadow-xl rounded-lg"
                {...globalAnimations.scaleIn}
              >
                <p className="text-2xl font-bold text-center text-gray-800">
                  Out of Stock
                </p>
              </motion.div>
            </motion.div>
          )}
          {product.discount > 0 && (
            <motion.div
              className="absolute top-5 left-5 bg-primary text-white text-xs font-extralight rounded-full w-10 h-10 flex justify-center items-center"
              {...globalAnimations.scaleIn}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              -{product.discount}%
            </motion.div>
          )}
        </div>
        <div className="mt-4">
          <p className="my-1 text-lg font-mons tracking-tight truncate">
            {product.name}
          </p>
          <p className="my-1 text-sm font-light line-clamp-4">
            {product.description}
          </p>
          <p className="my-1 font-mons text-primary text-lg">
            PKR {product.finalPrice.toLocaleString()}
            {product.discount > 0 && (
              <span className="ml-2 line-through text-gray-500 font-light">
                PKR {product.price.toLocaleString()}
              </span>
            )}
          </p>
        </div>
      </Link>
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
        className="z-10 absolute bg-white w-10 h-10 rounded-full top-5 right-5 flex justify-center items-center shadow-md"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          key={inWishlist(product._id) ? "filled" : "outline"}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {inWishlist(product._id) ? (
            <MdFavorite className="text-primary text-xl" />
          ) : (
            <MdFavoriteBorder className="text-primary text-xl" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

export default Card;
