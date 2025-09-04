import React from "react";
import Card from "@/components/card";
import ReactLoading from "react-loading";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { globalAnimations } from "@/lib/animations";

interface Props {
  products: Product[];
  loading: boolean;
}

const Grid = ({ products, loading }: Props) => {
  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        {...globalAnimations.fadeIn}
      >
        <motion.div {...globalAnimations.pulse}>
          <ReactLoading type="cylon" color="#000000" />
        </motion.div>
      </motion.div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide"
        {...globalAnimations.fadeIn}
      >
        <span>No Products Found</span>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
      {products.map((product: Product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        >
          <Card product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default Grid;
