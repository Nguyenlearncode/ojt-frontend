// src/api/axiosClient.ts
import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

// 🔐 Add token automatically to each request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Automatically unwrap data
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error)
);

export default axiosClient;
