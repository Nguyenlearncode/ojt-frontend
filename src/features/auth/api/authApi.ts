// src/features/auth/api/authApi.ts
import axiosAuth from "../../../api/axiosAuth";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  // 🔐 Đăng nhập
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await axiosAuth.post("/auth/login", data);
    return res.data.data;
  },

  // 🔄 Làm mới AccessToken
  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const res = await axiosAuth.post("/auth/refresh", JSON.stringify(refreshToken), {
      headers: { "Content-Type": "application/json" },
    });
    return res.data.data;
  },
};
