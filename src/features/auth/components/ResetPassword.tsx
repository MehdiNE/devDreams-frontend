"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { resetPasswordAction } from "../actions/userAction";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IProps {
  token: string;
}

const formSchema = z.object({
  password: z.string().min(1, {
    message: "رمز عبور خود را وارد کنید",
  }),
  confirmPassword: z.string().min(1, {
    message: "تکرار رمز عبور را وارد کنید",
  }),
});

export type ResetPasswordFormData = z.infer<typeof formSchema>;

function ResetPassword({ token }: IProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ResetPasswordFormData) {
    startTransition(async () => {
      const res = await resetPasswordAction(values, token);
      console.log("🚀 ~ startTransition ~ res:", res);
      if (res?.status !== "success") {
        toast.error(res?.message);
      }

      if (res?.errors) {
        res?.errors?.forEach((err) => {
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
          <p>برای بازیابی رمز عبور فرم زیر رو پر کن.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            {isPending ? "Loading..." : "تایید"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPassword;
