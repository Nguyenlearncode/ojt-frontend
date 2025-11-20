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
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await axiosAuth.post("/auth/login", data);
    return res.data.data;
  },

  refresh: async (refreshToken: string, accessToken?: string): Promise<RefreshResponse> => {
    const body = { refreshToken, accessToken };
    const res = await axiosAuth.post("/auth/refresh", body);
    return res.data.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await axiosAuth.post("/auth/forgetPassword", data);
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await axiosAuth.post("/auth/resetPassword", data);
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await axiosClient.post("/iam/auth/changePassword", data);
  },
};
