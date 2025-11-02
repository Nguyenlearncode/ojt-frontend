// src/features/role/api/privilegeApi.ts
import axiosClient from "../../../api/axiosClient";
import type { AxiosResponse } from "axios";

export interface Privilege {
  privilegeId: number;
  privilegeName: string;
  description: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  responsedAt: string;
}

export const privilegeApi = {
  // Lấy danh sách tất cả privileges
  getAllPrivileges: async (): Promise<Privilege[]> => {
    const response: any = await axiosClient.get("/privilege");
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },
};

