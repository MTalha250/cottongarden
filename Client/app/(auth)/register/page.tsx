"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { register } from "@/hooks/auth";
import useAuthStore from "@/store/authStore";
import SEO from "@/components/seo";

const formSchema = z
  .object({
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
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const { user, token, message } = await register(values);
      setUser(user);
      setToken(token);
      toast.success(message || "Registered successfully");
      router.push("/");
    } catch (error: any) {
      if (error.response.status === 500)
        toast.error(
          "An error occurred while processing your request. Please try again later."
        );
      else toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  }

  return (
    <motion.section
      className="relative min-h-screen px-6 md:px-12 lg:px-24 py-12 flex items-center justify-center"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title="Register | Cotton Garden"
        description="Create your Cotton Garden account to track orders, save favorites, and get member perks."
      />
      <motion.div
        className="w-full relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        variants={globalAnimations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="text-center lg:text-left"
          variants={globalAnimations.staggerChild}
        >
          <motion.p
            className="tracking-widest text-xs md:text-sm text-gray-500 uppercase"
            variants={globalAnimations.staggerChild}
          >
            Join Cotton Garden
          </motion.p>
          <motion.h1
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
            variants={globalAnimations.staggerChild}
          >
            Create your account
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-600 md:text-lg"
            variants={globalAnimations.staggerChild}
          >
            Enjoy faster checkout, order tracking, and wishlist sync across
            devices.
          </motion.p>
        </motion.div>
        <motion.div
          className="relative"
          variants={globalAnimations.staggerChild}
        >
          <motion.div
            className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
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
                <motion.div variants={globalAnimations.staggerChild}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={globalAnimations.staggerChild}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={globalAnimations.staggerChild}>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={globalAnimations.staggerChild}>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={globalAnimations.staggerChild}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={globalAnimations.staggerChild}>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={globalAnimations.staggerChild}>
                  <Button
                    type="submit"
                    className="rounded-full font-mons w-full bg-primary hover:bg-primary-hover py-3 text-white transition duration-200"
                  >
                    {isSubmitting ? "Submitting..." : "Register"}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>

            {/* Login section moved below register button */}
            <motion.div
              className="mt-6 text-center text-sm text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Already have an account?{" "}
              <motion.div
                className="inline-block"
                {...globalAnimations.hoverScale}
              >
                <Link
                  href="/login"
                  className="underline underline-offset-4 text-primary hover:text-primary-hover transition-colors"
                >
                  Sign in
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Register;
