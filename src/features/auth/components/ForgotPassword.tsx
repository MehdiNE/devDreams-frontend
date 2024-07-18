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
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordAction } from "../actions/userAction";
import { toast } from "sonner";
import ResetPassword from "./ResetPassword";

const formSchema = z.object({
  email: z.string().email({
    message: "ایمیل خود را به درستی وارد کنید",
  }),
});

export type ForgotPasswordFormData = z.infer<typeof formSchema>;

function ForgotPassword() {
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ForgotPasswordFormData) {
    startTransition(async () => {
      const res = await forgotPasswordAction(values);
      console.log("🚀 ~ startTransition ~ res:", res);
      if (res?.status !== "success") {
        toast.error(res?.message);
      }

      if (res?.errors) {
        res?.errors?.forEach((err) => {
          if (err.path === "email")
            form.setError("email", { message: err.msg });
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
          <p>برای بازیابی رمز عبور فرم زیر رو پر کن.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

          <Button type="submit" size="lg">
            {isPending ? "Loading..." : "ادامه"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ForgotPassword;
