"use client";
import React from "react";
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
    <section className="pt-28 pb-12 px-6 md:px-12 lg:px-24">
      <SEO
        title="Your Cart | Cotton Garden"
        description="Review items in your cart and proceed to checkout."
      />

      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
          Your Cart
        </h1>
        <p className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl">
          Manage your selected items and complete your order.
        </p>
      </div>

      <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200 bg-white p-5 md:p-8">
        {items.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-mons">Items</h2>
                <button
                  onClick={() => clearCart(user ? true : false, token)}
                  className="py-1 px-3 rounded-full bg-primary hover:bg-primary-hover text-white transition"
                >
                  Clear cart
                </button>
              </div>
              <div>
                {items.map((item: Cart) => (
                  <CartItem
                    key={item.product._id + item.size + item.color}
                    item={item}
                  />
                ))}
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="text-lg font-mons mb-3">Order Summary</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>PKR {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Estimated Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr className="my-3" />
                <Link href="/checkout" className="block">
                  <button className="w-full rounded-full bg-primary hover:bg-primary-hover text-white py-2">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg">Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block mt-4 rounded-full bg-primary hover:bg-primary-hover text-white px-5 py-2"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
