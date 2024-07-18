"use server";

import {
  forgotPasswordService,
  loginUserService,
  resetPasswordService,
  signupUserService,
} from "../services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginFormData } from "../components/LoginForm";
import { SignupFormData } from "../components/SignupForm";
import { ForgotPasswordFormData } from "../components/ForgotPassword";
import { ResetPasswordFormData } from "../components/ResetPassword";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

interface ErrorsType {
  msg: string;
  path: string;
}

export async function loginUserAction(formData: LoginFormData) {
  try {
    const responseData = await loginUserService(formData);

    if (responseData?.response) {
      return {
        status: responseData?.response?.data?.status,
        message: responseData?.response?.data?.message,
        errors: responseData?.response?.data?.errors as ErrorsType[],
      };
    }

    if (responseData?.data.token) {
      cookies().set("jwt", responseData.data.token, config);
      redirect("/dashboard");
    }
  } catch (error) {
    return {
      status: "error",
      message: "یه مشکلی پیش اومد. دوباره تلاش کنید",
    };
  }
}

export async function signupUserAction(formData: SignupFormData) {
  try {
    const responseData = await signupUserService(formData);

    if (responseData?.response) {
      return {
        status: responseData?.response?.data?.status,
        message: responseData?.response?.data?.message,
        errors: responseData?.response?.data?.errors as ErrorsType[],
      };
    }

    if (responseData?.data.token) {
      cookies().set("jwt", responseData.data.token, config);
      return {
        status: responseData?.status,
        message: responseData?.message,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "یه مشکلی پیش اومد. دوباره تلاش کنید",
    };
  }
}

export async function forgotPasswordAction(formData: ForgotPasswordFormData) {
  try {
    const responseData = await forgotPasswordService(formData);

    if (responseData?.response) {
      return {
        status: responseData?.response?.data?.status,
        message: responseData?.response?.data?.message,
        errors: responseData?.response?.data?.errors as ErrorsType[],
      };
    }

    return {
      status: responseData?.status,
      message: responseData?.message,
    };
  } catch (error) {
    return {
      status: "error",
      message: "یه مشکلی پیش اومد. دوباره تلاش کنید",
    };
  }
}

export async function resetPasswordAction(
  formData: ResetPasswordFormData,
  token: string,
) {
  try {
    const responseData = await resetPasswordService(formData, token);
    console.log("🚀 ~ responseData:", responseData);

    if (responseData?.response) {
      return {
        status: responseData?.response?.data?.status,
        message: responseData?.response?.data?.message,
        errors: responseData?.response?.data?.errors as ErrorsType[],
      };
    }

    if (responseData?.data.token) {
      cookies().set("jwt", responseData.data.token, config);
      return {
        status: responseData?.status,
        message: responseData?.message,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "یه مشکلی پیش اومد. دوباره تلاش کنید",
    };
  }
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}
