import axiosClient from "../../../api/axiosClient";


export interface Role {
  roleName: string;
}

export interface Role {
  roleName: string;
  roleCode: string;
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
    // axiosClient interceptor đã return response.data, nên response đã là data rồi
    // Backend trả về ApiResponse<IEnumerable<UserDTO>>, nên response có cấu trúc:
    // { statusCode, message, data: [...users...], responsedAt }
    const response: any = await axiosClient.get("/iam/users/getalluser");
    // Nếu response là array (đã unwrap), return luôn
    if (Array.isArray(response)) {
      return response;
    }
    // Nếu response có cấu trúc ApiResponse, lấy data
    return response?.data || [];
  },

  getUserById: async (userId: string): Promise<User> => {
    // axiosClient interceptor đã return response.data
    const response: any = await axiosClient.get(`/iam/users/${userId}`);
    // Nếu response đã là User object, return luôn
    if (response?.userId) {
      return response;
    }
    // Nếu response có cấu trúc ApiResponse, lấy data
    return response?.data;
  },

  lockUser: async (userId: string) => axiosClient.post(`/iam/users/${userId}/lock`),

  unlockUser: async (userId: string) => axiosClient.post(`/iam/users/${userId}/unlock`),

  deleteUserPermanently: async (userId: string): Promise<void> => {
    await axiosClient.delete(`/iam/users/${userId}/permanent`);
  },

  createUser: async (data: CreateUserPayload) => {
    // axiosClient interceptor đã return response.data
    const res: any = await axiosClient.post("/iam/users/create", data);
    // Nếu res đã là CreateUserResultDto, return luôn
    if (res?.userId) {
      return res;
    }
    // Nếu res có cấu trúc ApiResponse, lấy data
    return res?.data;
  },

  updateUser: async (userId: string, data: any) => {
    // axiosClient interceptor đã return response.data
    const res: any = await axiosClient.put(`/iam/users/${userId}`, data);
    // Nếu res đã là object, return luôn
    return res?.data || res;
  },
};
