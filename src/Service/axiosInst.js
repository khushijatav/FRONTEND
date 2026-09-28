import axios from "axios";

/**
 * Dynamically resolves the backend API Base URL:
 * 1. If VITE_PUBLIC_API_URL is set and points to an external/production URL (not localhost), use it.
 * 2. If the user accesses the app over local Wi-Fi / LAN (e.g., http://192.168.0.105:5173 on a mobile phone):
 *    Automatically direct requests to http://<current-ip>:5000 so phones don't fail by calling localhost.
 * 3. In local PC browser (localhost / 127.0.0.1): use http://localhost:5000.
 */
export const getApiBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_PUBLIC_API_URL || "").trim().replace(/\/+$/, "");

  // If a valid production URL (https://... or non-localhost) is specified, use it
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl;
  }

  // Running inside a browser
  if (typeof window !== "undefined" && window.location) {
    const { hostname } = window.location;

    // Check if accessing via LAN IP (e.g. 192.168.x.x, 10.x.x.x, 172.16-31.x.x, or local domain)
    const isLanIp =
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      hostname.endsWith(".local");

    if (isLanIp) {
      // Connect to same host on port 5000
      return `http://${hostname}:5000`;
    }

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return envUrl || "http://localhost:5000";
    }

    // If hosted on a cloud domain (like *.vercel.app)
    if (envUrl) {
      return envUrl;
    }
  }

  return envUrl || "http://localhost:5000";
};

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: ensure dynamic baseURL is always up-to-date
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.baseURL) {
      config.baseURL = getApiBaseUrl();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: provide helpful, descriptive error messages
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMsg = error.response?.data?.message;

    if (!errorMsg) {
      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        errorMsg = "Request timed out. The server took too long to respond. Please try again.";
      } else if (error.message === "Network Error" || !error.response) {
        const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
        const currentBase = getApiBaseUrl();

        if (isHttps && currentBase.startsWith("http://")) {
          errorMsg = "Network Error: Browser blocked insecure HTTP request from HTTPS website (Mixed Content). Backend must use HTTPS.";
        } else {
          errorMsg = `Network Error: Cannot connect to backend server at ${currentBase}. Please ensure the backend server is running and reachable.`;
        }
      } else {
        errorMsg = error.message || "An unexpected error occurred. Please try again.";
      }
    }

    return Promise.reject(new Error(errorMsg));
  }
);

export default axiosInstance;