import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { CiUser } from "react-icons/ci";
import { Search } from "@/components/ui/search";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { VscChevronDown } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { logout } from "@/hooks/auth";
import { Category } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { globalAnimations, viewportSettings } from "@/lib/animations";

const Navbar = () => {
  const { initCart, items } = useCartStore();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const { initWishlist, wishlist } = useWishlistStore();
  const { user, setToken, setUser } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [sale, setSale] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSale = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/check`
      );
      setSale(response.data.bool);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    checkSale();
  }, []);

  useEffect(() => {
    if (user) {
      initCart(user.cart);
      initWishlist(user.wishlist);
    }
  }, [user]);

  return (
    <motion.div
      className="top-0 z-50 fixed bg-white text-black border-b border-gray-200 px-6 md:px-16 lg:px-24 py-3 w-full flex items-center justify-between"
      {...globalAnimations.navbarSlideDown}
    >
      <Link href="/">
        <motion.img
          src="/images/logo.jpeg"
          alt="logo"
          className="w-20 rounded-lg"
          {...globalAnimations.hoverScale}
        />
      </Link>

      <div className="hidden lg:flex space-x-6 xl:space-x-12 items-center justify-center">
        <div
          onMouseEnter={() => setActiveDropdown(true)}
          onMouseLeave={() => setActiveDropdown(false)}
          className="relative"
        >
          <Link
            href="/products"
            className="flex items-center border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest"
          >
            Shop
            <VscChevronDown className="ml-1" />
          </Link>
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 w-[550px]"
              >
                <div className="mt-2 shadow-xl bg-white border border-gray-200 rounded-2xl p-5 whitespace-nowrap w-full">
                  <div className="w-full flex flex-wrap gap-10">
                    {categories.map((category, index) => (
                      <div key={index} className="flex flex-col">
                        <Link
                          href={`/products/${category.name}`}
                          className="border-b border-transparent hover:border-black transition duration-300 uppercase"
                        >
                          {category.name}
                        </Link>
                        <div className="mt-3 flex flex-col space-y-2">
                          {category.subCategories.length > 0 &&
                            category.subCategories.map(
                              (subCategory, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={`/products/${category.name}/${subCategory}`}
                                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                  {subCategory}
                                </Link>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {sale && (
          <Link
            href="/sale"
            className="flex items-center border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest"
          >
            On Sale
          </Link>
        )}
        <Link
          href="/blogs"
          className="flex items-center border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest"
        >
          Blogs
        </Link>
        <Link
          href="/about"
          className="flex items-center border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="flex items-center border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest"
        >
          Contact Us
        </Link>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5 font-medium">
        <div className="hidden md:block">
          <Search
            placeholders={[
              "Search by product name or category",
              "Find items by color, size, or style",
              "Look for products by description or features",
            ]}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={() => router.push(`/search/${search}`)}
          />
        </div>
        <Link href="/wishlist" aria-label="Wishlist" className="relative">
          <motion.div {...globalAnimations.iconHover}>
            <CiHeart className="inline-block text-3xl" />
          </motion.div>
          {user && (
            <motion.span
              className="-top-2 -right-1 h-4 w-4 absolute bg-primary text-white rounded-full p-0.5 text-[10px] flex justify-center items-center"
              {...globalAnimations.scaleIn}
            >
              {wishlist.length}
            </motion.span>
          )}
        </Link>
        <Link href="/cart" aria-label="Cart" className="relative">
          <motion.div {...globalAnimations.iconHover}>
            <CiShoppingCart className="inline-block text-3xl" />
          </motion.div>
          <motion.span
            className="-top-2 -right-1 h-4 w-4 absolute bg-primary text-white rounded-full p-0.5 text-[10px] flex justify-center items-center"
            {...globalAnimations.scaleIn}
          >
            {items.length}
          </motion.span>
        </Link>

        {user?.name ? (
          <Link href="/profile" aria-label="Account">
            <motion.div {...globalAnimations.iconHover}>
              <CiUser className="text-3xl text-gray-800 hover:text-gray-900 cursor-pointer" />
            </motion.div>
          </Link>
        ) : (
          <Link href="/login">
            <motion.div {...globalAnimations.iconHover}>
              <CiUser className="text-3xl text-gray-800 hover:text-gray-900 cursor-pointer" />
            </motion.div>
          </Link>
        )}
        <Sidebar categories={categories} />
      </div>
    </motion.div>
  );
};

export default Navbar;
