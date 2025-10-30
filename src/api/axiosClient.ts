// src/api/axiosClient.ts
import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { authApi } from "../features/auth/api/authApi";

// Khởi tạo instance chính cho các API có xác thực
const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

// Thêm AccessToken vào mỗi request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Biến kiểm soát refresh
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Đăng ký callback khi có token mới
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// Khi có token mới, gọi lại tất cả request đang chờ
function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Interceptor xử lý lỗi 401
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Nếu access token hết hạn (401) và chưa refresh
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken") || undefined;
      const oldAccessToken = localStorage.getItem("accessToken") || undefined;

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Gọi API refresh token
        const res = await authApi.refresh(refreshToken, oldAccessToken);
        let newAccessToken = res.accessToken;
        let newRefreshToken = res.refreshToken;

        // Nếu BE trả về rỗng (token bị revoke do tab khác dùng trước)
        if (!newAccessToken || !newRefreshToken) {
          console.warn("Refresh token bị revoke, thử lại với token mới nhất...");
          const latestRefresh = localStorage.getItem("refreshToken");
          if (latestRefresh && latestRefresh !== refreshToken) {
            const retryRes = await authApi.refresh(latestRefresh, oldAccessToken);
            newAccessToken = retryRes.accessToken;
            newRefreshToken = retryRes.refreshToken;
          }
        }

        // Nếu vẫn không có token → logout
        if (!newAccessToken || !newRefreshToken) {
          console.error("Refresh thất bại, buộc logout");
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Lưu token mới
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        isRefreshing = false;
        onRefreshed(newAccessToken);

        // Gắn token mới vào request cũ và gửi lại
        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosClient(originalRequest!);
      } catch (refreshErr) {
        console.error("Refresh token invalid:", refreshErr);
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
