"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginUserAction } from "../actions/userAction";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const formSchema = z.object({
  email: z.string().email({
    message: "ایمیل خود را به درستی وارد کنید",
  }),
  password: z.string().min(1, {
    message: "رمز عبور خود را وارد کنید",
  }),
});

export type LoginFormData = z.infer<typeof formSchema>;

function LoginForm() {
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormData) {
    startTransition(async () => {
      const res = await loginUserAction(values);
      console.log("🚀 ~ startTransition ~ res:", res);
      if (res?.status !== "success") {
        console.log(res);
        toast.error(res?.message);
      }

      if (res?.errors) {
        res?.errors?.forEach((err: { path: string; msg: any }) => {
          if (err.path === "email")
            form.setError("email", { message: err.msg });

          if (err.path === "password")
            form.setError("password", { message: err.msg });
        });
      }

      if (res?.status === "success") {
        toast.success(res?.message);
      }
    });
  }

  return (
    <div className="p-10">
      <div className="mb-10 font-medium">
        <h2>خوش اومدی</h2>
        <div className="flex gap-1 text-sm">
          <p>برای ورود فرم زیر رو پر کن.</p>
          <p>اکانت نداری؟</p>
          <Link
            href="/signup"
            className="cursor-pointer font-medium text-blue-500"
          >
            ثبت نام کن
          </Link>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
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

          <div className="relative">
            <Link
              href="/forgotpassword"
              className="absolute left-1 top-2 block cursor-pointer text-left text-xs font-medium text-blue-500"
            >
              فراموشی رمز عبور
            </Link>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور</FormLabel>
                  <FormControl>
                    <Input placeholder="رمز عبور خود را وارد کنید" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg">
            {isPending ? "Loading..." : "ورود"}
          </Button>
        </form>
      </Form>

      <div className="my-5 -mr-1 flex items-center justify-center gap-3 overflow-clip">
        <Separator />
        <span className="text-sm font-medium opacity-60">OR</span>
        <Separator />
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <a href="http://127.0.0.1:5000/api/v1/auth/google" className="w-full">
          <Button variant="outline" size="lg">
            Sign in with Google <FcGoogle className="mr-2 text-lg" />
          </Button>
        </a>
        <Button variant="outline" size="lg">
          Sign in with Github <FaGithub className="mr-2 text-base" />
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
