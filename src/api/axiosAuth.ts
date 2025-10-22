// src/api/axiosAuth.ts
import axios, { type AxiosInstance } from "axios";

const axiosAuth: AxiosInstance = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

export default axiosAuth;
