"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  forgotPasswordService,
  loginUserService,
  resetPasswordService,
  signupUserService,
} from "../services/auth-service";
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

function setCookieHandler({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  cookies().set("accessToken", accessToken, config);
  cookies().set("refreshToken", refreshToken, config);
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
      setCookieHandler({
        accessToken: responseData.data.token.accessToken,
        refreshToken: responseData.data.token.refreshToken,
      });
    }

    return responseData;
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
      setCookieHandler({
        accessToken: responseData.data.token.accessToken,
        refreshToken: responseData.data.token.refreshToken,
      });
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

    if (responseData?.response) {
      return {
        status: responseData?.response?.data?.status,
        message: responseData?.response?.data?.message,
        errors: responseData?.response?.data?.errors as ErrorsType[],
      };
    }

    if (responseData?.data.token) {
      setCookieHandler({
        accessToken: responseData.data.token.accessToken,
        refreshToken: responseData.data.token.refreshToken,
      });
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
  cookies().set("accessToken", "", { ...config, maxAge: 0 });
  cookies().set("refreshToken", "", { ...config, maxAge: 0 });
  redirect("/");
}
