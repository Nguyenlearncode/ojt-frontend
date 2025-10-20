// src/features/auth/api/logoutApi.ts
import axiosClient from "../../../api/axiosClient";

export interface LogoutRequest {
  refreshToken: string;
}

export const logoutApi = async (data: LogoutRequest): Promise<void> => {
  await axiosClient.post("/auth/logout", data);
};
