// src/features/user/api/userApi.ts

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

export interface CreateUserPayload {
  roleCode: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  identifyNumber: string;
  gender: string;
  age: number;
  address: string;
  dateOfBirth: string;
}

export interface CreateUserResult {
  userId: string;
  roleCode: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  identifyNumber: string;
  gender: string;
  age: number;
  address: string;
  dateOfBirth: string;
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

  async createUser(data: CreateUserPayload) {
    const res: AxiosResponse<any> = await axiosClient.post("/users/create", data);
    return res.data;
  },

  updateUser: async (userId: string, data: any) => {
    const res = await axiosClient.put(`/users/${userId}`, data);
    return res.data;
  },
};

