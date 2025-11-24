// src/api/axiosAuth.ts
import axios, { type AxiosInstance } from "axios";

// 1. Lấy link Gateway từ biến môi trường. 
// Nếu không tìm thấy (lúc chạy local chưa config), nó sẽ tự lấy localhost:7000
const gatewayUrl = import.meta.env.VITE_API_URL || "https://localhost:7000";

const axiosAuth: AxiosInstance = axios.create({
  // 2. Nối thêm đuôi /iam vào link Gateway
  baseURL: `${gatewayUrl}/iam`, 
  headers: { "Content-Type": "application/json" },
});

export default axiosAuth;