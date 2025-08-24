"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import WhatsApp from "@/components/WhatsApp";
import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { loginBack } from "@/hooks/auth";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useContactInfoStore } from "@/store/contactInfoStore";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setUser, setToken } = useAuthStore();
  const { initCart } = useCartStore();
  const { initWishlist } = useWishlistStore();
  const { fetchContactInfo } = useContactInfoStore();

  useEffect(() => {
    handleLoginBack();
    fetchContactInfo();
  }, []);

  useEffect(() => {
    if (user) {
      initCart(user.cart);
      initWishlist(user.wishlist);
    }
  }, [user]);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      if (!res) {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
      if (res?.user) setUser(res.user);
      if (res?.token) setToken(res.token);
    } catch (error: any) {
      setToken("");
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <html lang="en">
      <head>
        <title>Cotton Garden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Cotton Garden crafts breathable cotton clothing for men, women, and kids — tees, shirts, dresses, chinos, loungewear and everyday essentials made for comfort, quality and timeless style."
        />
      </head>
      <body>
        <div>
          <Navbar />
          <div>{children}</div>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#212F38",
                color: "#FDF8EC",
              },
            }}
          />
          <WhatsApp />
        </div>
      </body>
    </html>
  );
}
