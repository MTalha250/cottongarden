"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { globalAnimations, viewportSettings } from "@/lib/animations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import randomstring from "randomstring";
import AuthCode from "react-auth-code-input";

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
import axios from "axios";
import SEO from "@/components/seo";

const formSchema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const page = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [receivedCode, setReceivedCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [isExpired, setIsExpired] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (timer === 0) {
      setIsExpired(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const sendEmail = async () => {
    setIsSending(true);
    let new_code = randomstring.generate(6);
    setCode(new_code);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/send-code`,
        {
          email: form.getValues("email"),
          code: new_code,
        }
      );
      toast.success(response.data.message);
      setTimer(60);
      setIsExpired(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsSending(false);
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    if (isExpired || receivedCode.length !== 6) {
      toast.error("Invalid code");
      setIsSubmitting(false);
      return;
    }
    if (receivedCode !== code) {
      toast.error("Invalid code");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password`,
        {
          email: values.email.toLowerCase(),
          password: values.password,
        }
      );
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsSubmitting(false);
  }

  return (
    <motion.section
      className="relative min-h-screen px-6 md:px-12 lg:px-24 py-12 flex items-center justify-center"
      {...globalAnimations.fadeIn}
    >
      <SEO
        title="Reset Password | Cotton Garden"
        description="Forgot your password? Receive a code and set a new one."
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
            Security first
          </motion.p>
          <motion.h1
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-mons tracking-tight text-primary"
            variants={globalAnimations.staggerChild}
          >
            Reset your password
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-600 md:text-lg"
            variants={globalAnimations.staggerChild}
          >
            Enter your email to get a 6‑digit code, then set a new password.
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
                className="space-y-4"
                variants={globalAnimations.staggerContainer}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-end w-full gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={sendEmail}
                    disabled={
                      timer !== 0 || form.getValues("email") === "" || isSending
                    }
                    className="font-mons flex justify-center px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white transition duration-200"
                  >
                    {isSending
                      ? "Sending..."
                      : isExpired
                      ? "Send Code"
                      : "00:" + (timer > 9 ? timer : "0" + timer)}
                  </Button>
                </div>

                <div className="flex justify-center items-center flex-col">
                  <p className="text-center mb-3">Code</p>
                  <AuthCode
                    containerClassName="flex justify-center gap-2 text-center"
                    inputClassName="border border-neutral-300 text-center font-bold text-xl tracking-[9px] w-9 h-9 outline-none rounded-md"
                    length={6}
                    onChange={(value) => setReceivedCode(value)}
                    autoFocus={false}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

                <motion.div variants={globalAnimations.staggerChild}>
                  <Button
                    disabled={isSubmitting || timer === 0}
                    type="submit"
                    className="rounded-full font-mons w-full bg-primary hover:bg-primary-hover py-3 text-white transition duration-200"
                  >
                    {isSubmitting ? "Submitting..." : "Change Password"}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>

            {/* Login section moved below reset password button */}
            <motion.div
              className="mt-6 text-center text-sm text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Remembered it?{" "}
              <motion.div
                className="inline-block"
                {...globalAnimations.hoverScale}
              >
                <Link
                  href="/login"
                  className="underline underline-offset-4 text-primary hover:text-primary-hover transition-colors"
                >
                  Back to login
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default page;
