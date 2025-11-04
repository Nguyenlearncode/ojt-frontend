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
  identifyNumber: string;
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

export interface CreateUserResult extends CreateUserPayload {
  userId: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  responsedAt: string;
}

export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<any> = await axiosClient.get("/iam/users/getalluser");
    return response.data || [];
  },

  getUserById: async (userId: string): Promise<User> => {
    const response: any = await axiosClient.get(`/iam/users/${userId}`);
    return response.data;
  },

  lockUser: async (userId: string) => axiosClient.post(`/iam/users/${userId}/lock`),

  unlockUser: async (userId: string) => axiosClient.post(`/iam/users/${userId}/unlock`),

  deleteUserPermanently: async (userId: string): Promise<void> => {
    await axiosClient.delete(`/iam/users/${userId}/permanent`);
  },

  createUser: async (data: CreateUserPayload) => {
    const res: AxiosResponse<any> = await axiosClient.post("/iam/users/create", data);
    return res.data;
  },

  updateUser: async (userId: string, data: any) => {
    const res = await axiosClient.put(`/iam/users/${userId}`, data);
    return res.data;
  },
};
