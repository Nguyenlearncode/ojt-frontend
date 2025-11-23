import axiosClient from "../../../api/axiosClient";

export const flaggingSetApi = {
  getAllFlaggingConfigs: () => axiosClient.get("/patient/flagging-configs"),

  createFlaggingConfig: (data: any) =>
    axiosClient.post("/patient/flaggingset/create", data),

  updateFlaggingConfig: (id: number, data: any) =>
    axiosClient.put(`/patient/flaggingset/update/${id}`, data),

  applyFlags: (testOrderId: string, data: any) =>
    axiosClient.post(`/patient/flagging-configs/${testOrderId}/apply-flags`, data),
};
