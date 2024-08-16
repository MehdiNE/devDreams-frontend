import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        // Make a request to your auth server to refresh the token.
        await axios.post(
          "http://localhost:5000/api/v1/auth/refreshToken",
          undefined,
          { withCredentials: true },
        );

        // api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  },
);

export async function getHello() {
  const response = await api.get("/hello");
  return response.data;
}
