"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import WhatsApp from "@/components/WhatsApp";
import logo from "@/assets/logoWhite.png";
import { motion } from "framer-motion";
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
        <title>GYMGear</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Elevate your performance with premium gym wear designed for ultimate comfort, durability, and style. Whether you're pushing limits or embracing recovery, our gear empowers you to move confidently and look your best, both in and out of the gym."
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1499742197661096');
fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1499742197661096&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="tracking-wide">
        <motion.div
          className="w-screen h-screen bg-primary fixed top-0 left-0 flex justify-center items-center"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            display: "none",
            transition: {
              duration: 1,
              delay: 1,
            },
          }}
        >
          <motion.div
            className="w-full h-full bg-secondary origin-bottom-right absolute -z-10"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
          />
          <motion.div
            initial={{ transform: "translateY(0)", opacity: 1 }}
            animate={{
              transform: "translateY(-200px)",
              opacity: 0,
              transition: { duration: 1, delay: 1 },
            }}
            className="bg-secondary p-4"
          >
            <img src={logo.src} alt="GYMGear" className="w-56" />
          </motion.div>
        </motion.div>
        <motion.div>
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
        </motion.div>
      </body>
    </html>
  );
}
