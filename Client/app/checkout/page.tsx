"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cities } from "@/constants";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhotosUploader from "@/components/checkout/uploader";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import SEO from "@/components/seo";
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long" }),
  city: z.string().min(3, { message: "City is not selected" }),
  country: z
    .string()
    .min(3, { message: "Country must be at least 3 characters long" }),
  postalCode: z
    .string()
    .min(3, { message: "Postal code must be at least 3 characters long" }),
});
const page = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [images, setImages] = useState([]);
  const { user, token } = useAuthStore();
  const [delivery, setDelivery] = useState(300);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: "",
      country: "",
      postalCode: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (paymentMethod == "bank" && images.length == 0) {
      toast.error("Please upload the transaction receipt");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order`,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          order: items.map((item) => ({
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.product.images[0],
            price: item.product.finalPrice,
            name: item.product.name,
          })),
          shippingAddress: {
            address: values.address,
            city: values.city,
            postalCode: values.postalCode,
            country: values.country,
          },
          paymentMethod,
          paymentReceipt: images[0] || "",
          subTotal: getTotalPrice(),
          delivery: delivery,
          total: getTotalPrice() + delivery,
        }
      );
      toast.success(response.data.message || "Order placed successfully");
      clearCart(user ? true : false, token);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsSubmitting(false);
    form.reset();
  }

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items]);

  return (
    <motion.div
      className="pt-28 pb-12 px-6 md:px-12 xl:px-24 min-h-screen"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title="Checkout | Cotton Garden"
        description="Fill in your details to place your order. Cotton Garden will ship your items as soon as possible."
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
          Checkout
        </motion.h1>
        <motion.p
          className="text-sm md:text-base mt-3 text-gray-600 max-w-2xl"
          variants={globalAnimations.staggerChild}
        >
          Fill in your details to place your order. We'll deliver as soon as
          possible.
        </motion.p>
      </motion.div>
      <motion.div
        className="flex flex-col md:flex-row gap-10"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="w-full rounded-2xl border border-gray-200 bg-white p-4 md:p-6"
          variants={globalAnimations.staggerChild}
          {...globalAnimations.cardHover}
        >
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3"
              variants={globalAnimations.staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2
                className="text-xs font-bold"
                variants={globalAnimations.staggerChild}
              >
                Personal Info
              </motion.h2>
              <div className="border-y border-gray-200 py-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          disabled={user ? true : false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          disabled={user ? true : false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          disabled={user ? true : false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          disabled={user ? true : false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>City</FormLabel>
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);
                            setDelivery(e == "Lahore" ? 0 : 300);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-full">
                              <SelectValue placeholder="City" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <h2 className="text-xs font-bold">Payment Info:</h2>
              <div className="border-y border-gray-200 py-5">
                <RadioGroup
                  defaultValue={paymentMethod}
                  onValueChange={(e) => setPaymentMethod(e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                  </div>
                </RadioGroup>
              </div>
              <motion.div variants={globalAnimations.staggerChild}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full font-mons w-full bg-primary hover:bg-primary-hover py-3 text-white transition duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Place Order"}
                </Button>
              </motion.div>
            </motion.form>
          </Form>
        </motion.div>
        <motion.div
          className="md:pl-10 w-full md:border-l border-gray-200"
          variants={globalAnimations.staggerChild}
        >
          <motion.h2
            className="text-2xl font-mons mb-5"
            {...globalAnimations.slideUp}
          >
            Your Cart
          </motion.h2>
          {items.map((item, index) => (
            <motion.div
              key={item.product._id}
              className="border border-gray-200 rounded-xl p-2 my-2 flex justify-between"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="w-2/3">
                <img
                  src={item.product.images[0]}
                  alt=""
                  className="w-20 h-20 object-cover float-left mr-3.5 rounded-lg"
                />
                <h1 className="font-mons">{item.product.name}</h1>
                <h1 className="text-xs">Size: {item.size.toUpperCase()}</h1>
                <h1 className="text-xs">
                  Color: {item.color[0].toUpperCase() + item.color.slice(1)}
                </h1>
                <h1 className="text-xs">Qty: {item.quantity}</h1>
              </div>
              <span className="font-mons">
                PKR {item.product.finalPrice.toLocaleString()}
              </span>
            </motion.div>
          ))}
          <motion.div
            className="mt-10"
            {...globalAnimations.slideUp}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>PKR {getTotalPrice().toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>{delivery == 0 ? "Free" : "PKR 300"}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>PKR {(getTotalPrice() + delivery).toLocaleString()} </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default page;
