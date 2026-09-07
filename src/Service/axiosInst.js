import axios from "axios";
console.log("API URL:", import.meta.env.VITE_PUBLIC_API_URL);
export const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add anything required before every request
    // Example: tenant ID, access token, etc.

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
  async (error) => {
    if (error.response?.status === 401) {
      // Handle authentication expiry
      // e.g. refresh token / logout / redirect to login
    }

    return Promise.reject(error);
  }
);