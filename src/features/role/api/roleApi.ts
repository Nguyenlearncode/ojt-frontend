// src/features/role/api/roleApi.ts
import axiosClient from "../../../api/axiosClient";
import type { AxiosResponse } from "axios";

export interface Privilege {
  privilegeId: number;
  privilegeName: string;
  description: string;
}

export interface Role {
  roleName: string;
  roleCode: string;
  roleDescription: string;
  privileges: Privilege[];
}

export interface CreateRolePayload {
  roleName: string;
  roleCode: string;
  roleDescription: string;
  privileges: Privilege[];
}

export interface UpdateRolePayload {
  roleName: string;
  roleCode: string;
  roleDescription: string;
  privileges: Privilege[];
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  responsedAt: string;
}

export const roleApi = {
  // Lấy danh sách tất cả roles
  getAllRoles: async (): Promise<Role[]> => {
    const response: any = await axiosClient.get("/role/all");
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }
    if (Array.isArray(response)) {
      return response;
    }
    return [];
  },

  // Tạo role mới
  createRole: async (data: CreateRolePayload): Promise<Role> => {
    const response: any = await axiosClient.post("/role/create", data);
    // response đã là ApiResponse object từ interceptor
    return response?.data || response;
  },

  // Cập nhật role
  updateRole: async (data: UpdateRolePayload): Promise<Role> => {
    const response: any = await axiosClient.post("/role/update", data);
    // response đã là ApiResponse object từ interceptor
    return response?.data || response;
  },

  // Xóa role
  deleteRole: async (roleCode: string): Promise<void> => {
    await axiosClient.delete(`/role/delete/${roleCode}`);
  },
};

