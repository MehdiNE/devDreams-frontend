"use server";

import { loginUserService } from "../services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormData } from "../components/LoginForm";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function loginUserAction(formData: FormData) {
  const responseData = await loginUserService(formData);

  if (!responseData?.response) {
    return {
      status: "error",
      message: "یه مشکلی پیش اومد. دوباره تلاش کنید",
    };
  }

  if (responseData?.response) {
    return {
      status: responseData?.response?.data?.status,
      message: responseData?.response?.data?.message,
    };
  }

  cookies().set("jwt", responseData.data.token, config);
  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}
