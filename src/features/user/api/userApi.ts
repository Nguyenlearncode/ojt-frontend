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
    return response.data || []; // unwrap data từ ApiResponse
  },

  getUserById: async (userId: string): Promise<User> => {
    const response: any = await axiosClient.get(`/users/${userId}`);
    // axiosClient already unwraps to response.data, so response here is ApiResponse
    return response.data; // unwrap data from ApiResponse
  },

  deleteUser: async (userId: string): Promise<void> => {
    await axiosClient.delete(`/users/${userId}`);
  },
};
