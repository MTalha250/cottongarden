"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { login } from "@/hooks/auth";
import SEO from "@/components/seo";
const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const Login = () => {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const { user, token, message } = await login(
        values.email,
        values.password
      );
      setUser(user);
      setToken(token);
      toast.success(message || "Login successful");
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
        title="Login | Cotton Garden"
        description="Login to your Cotton Garden account to access your orders, wishlist, and more."
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
            Welcome back
          </motion.p>
          <motion.h1
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
            variants={globalAnimations.staggerChild}
          >
            Sign in to Cotton Garden
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-600 md:text-lg"
            variants={globalAnimations.staggerChild}
          >
            Access your orders, wishlist, and personalized recommendations.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative"
          variants={globalAnimations.staggerChild}
        >
          <motion.div
            className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm"
            {...globalAnimations.cardHover}
          >
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                variants={globalAnimations.staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={globalAnimations.staggerChild}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
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
                <motion.div
                  className="flex items-center justify-between"
                  variants={globalAnimations.staggerChild}
                >
                  <motion.div {...globalAnimations.hoverScale}>
                    <Link
                      href="/login/forgot-password"
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>
                </motion.div>
                <motion.div variants={globalAnimations.staggerChild}>
                  <Button
                    type="submit"
                    className="rounded-full font-mons w-full bg-primary hover:bg-primary-hover py-3 text-white transition duration-200"
                  >
                    {isSubmitting ? "Submitting..." : "Login"}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>

            {/* Signup section moved below login button */}
            <motion.div
              className="mt-6 text-center text-sm text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              New here?{" "}
              <motion.div
                className="inline-block"
                {...globalAnimations.hoverScale}
              >
                <Link
                  href="/register"
                  className="underline underline-offset-4 text-primary hover:text-primary-hover transition-colors"
                >
                  Create an account
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Login;
