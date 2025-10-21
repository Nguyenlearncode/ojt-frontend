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
}

// Gọi API lấy danh sách user
export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<any> = await axiosClient.get("/users/getalluser");
    return response.data || []; // unwrap data từ ApiResponse
  },
};
