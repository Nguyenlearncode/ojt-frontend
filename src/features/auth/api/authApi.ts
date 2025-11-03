// src/features/auth/api/authApi.ts
import axiosAuth from "../../../api/axiosAuth";
import axiosClient from "../../../api/axiosClient";

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

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
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

  // 🔑 Quên mật khẩu
  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await axiosAuth.post("/auth/forgetPassword", data);
  },

  // 🔄 Reset mật khẩu từ token
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await axiosAuth.post("/auth/resetPassword", data);
  },

  // 🔐 Đổi mật khẩu (yêu cầu đăng nhập)
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await axiosClient.post("/auth/changePassword", data);
  },
};
