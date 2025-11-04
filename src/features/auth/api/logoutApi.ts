import axiosClient from "../../../api/axiosClient";

export interface LogoutRequest {
  refreshToken: string;
}

export const logoutApi = async (data: LogoutRequest): Promise<void> => {
  await axiosClient.post("/iam/auth/logout", data);
};
