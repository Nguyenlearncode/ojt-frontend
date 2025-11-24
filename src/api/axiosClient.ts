// src/api/axiosClient.ts
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";
import { authApi } from "../features/auth/api/authApi";

// const axiosClient: AxiosInstance = axios.create({
//   baseURL: "https://localhost:7000",
//   headers: { "Content-Type": "application/json" },
// });
const axiosClient: AxiosInstance = axios.create({
  // 👇 SỬA DÒNG NÀY:
  // Ưu tiên lấy link từ biến môi trường (Render), nếu không có thì mới dùng localhost (Máy bạn)
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7000",
  
  headers: { "Content-Type": "application/json" },
});
/* ------------------------- REQUEST INTERCEPTOR ------------------------- */
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ------------------------- REFRESH TOKEN LOGIC ------------------------- */
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/* ------------------------- RESPONSE INTERCEPTOR ------------------------- */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const contentType = response.headers["content-type"];

    // Nếu response là file (PDF / Excel / CSV / BINARY)
    if (
      contentType?.includes("application/pdf") ||
      contentType?.includes("application/octet-stream") ||
      contentType?.includes("application/vnd") ||
      contentType?.includes("text/csv")
    ) {
      return response; // ⬅ giữ nguyên full response (không unwrap)
    }

    return response.data; // unwrap JSON
  },

  async (error: AxiosError) => {
    const originalRequest = error.config;

    /* --------------------- 401: ACCESS TOKEN EXPIRED --------------------- */
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken") ?? undefined;
      const oldAccessToken = localStorage.getItem("accessToken") ?? undefined;

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        let res = await authApi.refresh(refreshToken, oldAccessToken);
        let newAccessToken = res.accessToken;
        let newRefreshToken = res.refreshToken;

        // fallback nếu token null
        if (!newAccessToken || !newRefreshToken) {
          const latest = localStorage.getItem("refreshToken");
          if (latest && latest !== refreshToken) {
            res = await authApi.refresh(latest, oldAccessToken);
            newAccessToken = res.accessToken;
            newRefreshToken = res.refreshToken;
          }
        }

        if (!newAccessToken || !newRefreshToken) {
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // lưu token mới
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

    /* -------------- Các request chờ refresh sẽ đứng đợi tại đây -------------- */
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
