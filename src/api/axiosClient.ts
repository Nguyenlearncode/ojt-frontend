// src/api/axiosClient.ts
import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5001/api", 
  headers: { "Content-Type": "application/json" },
});

// Tự động unwrap dữ liệu trả về
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error)
);

export default axiosClient;
