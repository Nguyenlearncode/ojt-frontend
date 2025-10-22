// src/api/axiosClient.ts
import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { authApi } from "../features/auth/api/authApi";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

// 🔐 Thêm accessToken vào mỗi request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⚙️ Biến kiểm soát refresh
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// ✅ Hàm subscribe chờ token mới
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// ✅ Khi có token mới, gọi lại các request đang chờ
function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// 🧠 Interceptor xử lý lỗi 401
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Nếu token hết hạn và chưa refresh
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // 🔄 Gọi API refresh (qua axiosAuth, không interceptor)
        const res = await authApi.refresh(refreshToken);
        const newAccessToken = res.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        isRefreshing = false;
        onRefreshed(newAccessToken);

        // Gửi lại request cũ với token mới
        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosClient(originalRequest!);
      } catch (refreshErr) {
        console.error("❌ Refresh token invalid:", refreshErr);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    // Nếu đang refresh → chờ token mới
    if (error.response?.status === 401 && isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          resolve(axiosClient(originalRequest!));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
