// src/api/axiosClient.ts
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";
import { authApi } from "../features/auth/api/authApi";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:7000", // ✅ Gateway root
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    // Chỉ validate và log, không block request
    // Nếu token không hợp lệ, backend sẽ trả về 401 và interceptor sẽ xử lý
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;

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
        const res = await authApi.refresh(refreshToken, oldAccessToken);
        let newAccessToken = res.accessToken;
        let newRefreshToken = res.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          const latestRefresh = localStorage.getItem("refreshToken");
          if (latestRefresh && latestRefresh !== refreshToken) {
            const retryRes = await authApi.refresh(latestRefresh, oldAccessToken);
            newAccessToken = retryRes.accessToken;
            newRefreshToken = retryRes.refreshToken;
          }
        }

        if (!newAccessToken || !newRefreshToken) {
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        isRefreshing = false;
        onRefreshed(newAccessToken);

        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosClient(originalRequest!);
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

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
