import axiosClient from "../../../api/axiosClient";

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
  getAllRoles: async (): Promise<Role[]> => {
    // axiosClient interceptor đã return response.data
    const response: any = await axiosClient.get("/iam/role/all");
    // Nếu response là array (đã unwrap), return luôn
    if (Array.isArray(response)) {
      return response;
    }
    // Nếu response có cấu trúc ApiResponse, lấy data
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },

  createRole: async (data: CreateRolePayload): Promise<Role> => {
    const response: any = await axiosClient.post("/iam/role/create", data);
    return response?.data || response;
  },

  updateRole: async (data: UpdateRolePayload): Promise<Role> => {
    const response: any = await axiosClient.post("/iam/role/update", data);
    return response?.data || response;
  },

  deleteRole: async (roleCode: string): Promise<void> => {
    await axiosClient.delete(`/iam/role/delete/${roleCode}`);
  },
};
