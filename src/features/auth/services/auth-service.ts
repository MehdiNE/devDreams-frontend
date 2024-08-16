import { api } from "@/services/api";
import { AxiosResponse } from "axios";
import { LoginFormData } from "../components/LoginForm";
import { SignupFormData } from "../components/SignupForm";
import { ForgotPasswordFormData } from "../components/ForgotPassword";
import { ResetPasswordFormData } from "../components/ResetPassword";

export async function loginUserService(userData: LoginFormData) {
  try {
    const response = await api.post(
      "/auth/login",
      {
        email: userData?.email,
        password: userData?.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: unknown) {
    return error as AxiosResponse;
  }
}
2;

export async function signupUserService(userData: SignupFormData) {
  try {
    const response = await api.post(
      "/auth/signup",
      {
        email: userData?.email,
        username: userData?.username,
        password: userData?.password,
        confirmPassword: userData?.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: unknown) {
    return error as AxiosResponse;
  }
}

export async function forgotPasswordService(userData: ForgotPasswordFormData) {
  try {
    const response = await api.post(
      "/auth/forgotPassword",
      {
        email: userData?.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: unknown) {
    return error as AxiosResponse;
  }
}

export async function resetPasswordService(
  userData: ResetPasswordFormData,
  token: string,
) {
  try {
    const response = await api.patch(
      `/auth/resetPassword/${token}`,
      {
        password: userData?.password,
        confirmPassword: userData?.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: unknown) {
    return error as AxiosResponse;
  }
}
