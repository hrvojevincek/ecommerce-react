import axios, { AxiosError, AxiosInstance } from "axios";

const BASE_URL = "https://dummyjson.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 errors and token refresh
    if (error.response?.status === 401 && originalRequest) {
      // Implement token refresh logic here
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // Call refresh token endpoint
        // Update tokens in localStorage
        // Retry original request
      } catch (refreshError) {
        // Handle refresh token failure
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
