import axiosClient from "../../../api/axiosClient";

export const flaggingSetApi = {
  getAllFlaggingConfigs: () => axiosClient.get("/patient/flagging-configs"),

  createFlaggingConfig: (data: any) =>
    axiosClient.post("/patient/flagging-configs/create", data),

  updateFlaggingConfig: (id: number, data: any) =>
    axiosClient.put(`/patient/flagging-configs/update/${id}`, data),

};
