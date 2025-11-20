import axiosClient from "../../../api/axiosClient";

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
  getAllPrivileges: async (): Promise<Privilege[]> => {
    const response: any = await axiosClient.get("/iam/privilege");
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },
};
