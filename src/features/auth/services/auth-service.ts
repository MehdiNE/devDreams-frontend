import { api } from "@/services/api";
import { AxiosResponse } from "axios";
import { FormData } from "../components/LoginForm";

export async function loginUserService(userData: FormData) {
  try {
    const response = await api.post(
      "/users/login",
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
