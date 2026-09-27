import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:5000";
// Strip trailing slash if present
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "An unexpected network error occurred";
    return Promise.reject(new Error(errorMsg));
  }
);

export default axiosInstance;