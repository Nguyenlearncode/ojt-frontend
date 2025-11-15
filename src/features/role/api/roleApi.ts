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
    // Thử endpoint path: /iam/role/getall thay vì /iam/role/all
    const response: any = await axiosClient.get("/iam/role/getall");
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }
    if (Array.isArray(response)) {
      return response;
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
