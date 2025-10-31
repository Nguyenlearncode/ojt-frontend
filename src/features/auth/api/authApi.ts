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

interface RefreshResponse {
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
  refresh: async (refreshToken: string, accessToken?: string): Promise<RefreshResponse> => {
    const body = {
      refreshToken,
      accessToken, // optional
    };
    const res = await axiosAuth.post("/auth/refresh", body);
    return res.data.data;
  },
};
