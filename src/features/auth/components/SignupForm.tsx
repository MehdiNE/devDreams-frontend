"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupUserAction } from "../actions/userAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "ایمیل خود را به درستی وارد کنید",
  }),
  password: z.string().min(1, {
    message: "رمز عبور خود را وارد کنید",
  }),
  username: z.string().min(1, {
    message: "نام کاربری را وارد کنید",
  }),
  confirmPassword: z.string().min(1, {
    message: "تکرار رمز عبور را وارد کنید",
  }),
});

export type SignupFormData = z.infer<typeof formSchema>;

function SignupForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SignupFormData) {
    startTransition(async () => {
      const res = await signupUserAction(values);
      if (res?.status !== "success") {
        toast.error(res?.message);
      }

      if (res?.errors) {
        res?.errors?.forEach((err) => {
          if (err.path === "username")
            form.setError("username", { message: err.msg });

          if (err.path === "email")
            form.setError("email", { message: err.msg });

          if (err.path === "password")
            form.setError("password", { message: err.msg });

          if (err.path === "confirmPassword")
            form.setError("confirmPassword", { message: err.msg });
        });
      }

      if (res?.status === "success") {
        toast.success(res?.message);
        router.push("/dashboard");
      }
    });
  }

  return (
    <div className="p-10">
      <div className="mb-10 font-medium">
        <h2>خوش اومدی</h2>
        <div className="flex gap-1 text-sm">
          <p>برای ورود فرم زیر رو پر کن.</p>
          <p>اکانت داری؟</p>
          <Link
            href="/login"
            className="cursor-pointer font-medium text-blue-500"
          >
            ورود
          </Link>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input placeholder="نام کاربری را وارد کنید" {...field} />
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
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input placeholder="ایمیل خود را وارد کنید" {...field} />
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
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input placeholder="رمز عبور را وارد کنید" {...field} />
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
                <FormLabel>تکرار رمز عبور</FormLabel>
                <FormControl>
                  <Input placeholder="تکرار رمز عبور را وارد کنید" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg">
            {isPending ? "Loading..." : "ثبت نام"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
