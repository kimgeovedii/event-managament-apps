import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important if using httpOnly cookies for refresh tokens
});

// Request Interceptor
apiFetch.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
apiFetch.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token Expired)
    if (error.response?.status === 401 && originalRequest) {
      // Logic for refresh token could go here
      // For now, we logout strictly
      Cookies.remove("token");
      Cookies.remove("refreshToken");

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.href = "/login";
      }
    }

    // Standardize Error Message
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data); // Return the actual error data object
    }

    return Promise.reject(error);
  },
);

export default apiFetch;
