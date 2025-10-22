import axiosClient from "../../../api/axiosClient";
import type { AxiosResponse } from "axios";

export interface Role {
  roleName: string;
}

export interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  age: number;
  address: string;
  dateOfBirth: string;
  role: Role;
  isActive?: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  responsedAt: string;
}

// Gọi API lấy danh sách user
export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<any> = await axiosClient.get("/users/getalluser");
    return response.data || [];
  },

  getUserById: async (userId: string): Promise<User> => {
    const response: any = await axiosClient.get(`/users/${userId}`);
    return response.data;
  },

  async lockUser(userId: string) {
    return axiosClient.post(`/users/${userId}/lock`);
  },

  async unlockUser(userId: string) {
    return axiosClient.post(`/users/${userId}/unlock`);
  },

  // 🔹 Xóa vĩnh viễn (API mới)
  deleteUserPermanently: async (userId: string): Promise<void> => {
    await axiosClient.delete(`/users/${userId}/permanent`);
  },
};

