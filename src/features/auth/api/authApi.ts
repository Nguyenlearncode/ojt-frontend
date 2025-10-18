// src/features/auth/api/authApi.ts
import axiosClient from "../../../api/axiosClient";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axiosClient.post("/users/login", data);
  return res.data; 
},

};
