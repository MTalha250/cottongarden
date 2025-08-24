"use client";
import { useState } from "react";
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
    <section className="relative min-h-screen px-6 md:px-12 lg:px-24 py-12 flex items-center justify-center">
      <SEO
        title="Login | Cotton Garden"
        description="Login to your Cotton Garden account to access your orders, wishlist, and more."
      />

      <div className="w-full relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <p className="tracking-widest text-xs md:text-sm text-gray-500 uppercase">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary">
            Sign in to Cotton Garden
          </h1>
          <p className="mt-3 text-gray-600 md:text-lg">
            Access your orders, wishlist, and personalized recommendations.
          </p>
          <div className="mt-6 text-sm text-gray-600">
            New here?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Create an account
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <div className="flex items-center justify-between">
                  <Link
                    href="/login/forgot-password"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="rounded-full font-mons w-full bg-primary hover:bg-primary-hover py-3 text-white transition duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Login"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
