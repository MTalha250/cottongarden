"use client";
import React from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import CartItem from "@/components/cart/cartItem";
import Link from "next/link";
import { Cart } from "@/types";
import SEO from "@/components/seo";

const CartPage = () => {
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { user, token } = useAuthStore();

  return (
    <motion.section
      className="pt-28 pb-12 px-6 md:px-12 lg:px-24"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title="Your Cart | Cotton Garden"
        description="Review items in your cart and proceed to checkout."
      />

      <motion.div
        className="text-center mb-6 flex flex-col items-center"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
          variants={globalAnimations.staggerChild}
        >
          Your Cart
        </motion.h1>
        <motion.p
          className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl"
          variants={globalAnimations.staggerChild}
        >
          Manage your selected items and complete your order.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto rounded-2xl border border-gray-200 bg-white p-5 md:p-8"
        {...globalAnimations.cardHover}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {items.length ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={globalAnimations.staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="md:col-span-2"
              variants={globalAnimations.staggerChild}
            >
              <motion.div
                className="flex items-center justify-between mb-3"
                variants={globalAnimations.staggerChild}
              >
                <h2 className="text-xl font-mons">Items</h2>
                <motion.button
                  onClick={() => clearCart(user ? true : false, token)}
                  className="py-1 px-3 rounded-full bg-primary hover:bg-primary-hover text-white transition"
                  {...globalAnimations.buttonHover}
                >
                  Clear cart
                </motion.button>
              </motion.div>
              <motion.div
                variants={globalAnimations.staggerContainer}
                initial="initial"
                animate="animate"
              >
                {items.map((item: Cart, index: number) => (
                  <motion.div
                    key={item.product._id + item.size + item.color}
                    variants={globalAnimations.staggerChild}
                    custom={index}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="md:col-span-1"
              variants={globalAnimations.staggerChild}
            >
              <motion.div
                className="rounded-xl border border-gray-200 p-4"
                {...globalAnimations.cardHover}
              >
                <motion.h3
                  className="text-lg font-mons mb-3"
                  {...globalAnimations.slideUp}
                >
                  Order Summary
                </motion.h3>
                <motion.div
                  className="flex justify-between text-sm mb-2"
                  {...globalAnimations.slideUp}
                  transition={{ delay: 0.1 }}
                >
                  <span>Subtotal</span>
                  <span>PKR {getTotalPrice().toLocaleString()}</span>
                </motion.div>
                <motion.div
                  className="flex justify-between text-sm mb-2"
                  {...globalAnimations.slideUp}
                  transition={{ delay: 0.2 }}
                >
                  <span>Estimated Delivery</span>
                  <span>Calculated at checkout</span>
                </motion.div>
                <hr className="my-3" />
                <Link href="/checkout" className="block">
                  <motion.button
                    className="w-full rounded-full bg-primary hover:bg-primary-hover text-white py-2"
                    {...globalAnimations.buttonHover}
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            {...globalAnimations.fadeIn}
          >
            <motion.p className="text-lg" {...globalAnimations.slideUp}>
              Your cart is empty.
            </motion.p>
            <Link href="/products" className="inline-block mt-4">
              <motion.div
                className="rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2"
                {...globalAnimations.buttonHover}
              >
                Continue Shopping
              </motion.div>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default CartPage;
