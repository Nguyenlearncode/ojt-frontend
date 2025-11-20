import axiosClient from "../../../api/axiosClient";

export const flaggingSetApi = {
  // Lấy tất cả flagging set configurations
  // GET /api/flagging-configs
  getAllFlaggingConfigs: () => axiosClient.get("/patient/flagging-configs"),

  // Tạo flagging set configuration
  // POST /flaggingset/create
  createFlaggingConfig: (data: any) =>
    axiosClient.post("/patient/flaggingset/create", data),

  // Cập nhật flagging set configuration
  // PUT /flaggingset/update/{id}
  updateFlaggingConfig: (id: number, data: any) =>
    axiosClient.put(`/patient/flaggingset/update/${id}`, data),

  // Apply flags cho test order
  // POST {testOrderId}/apply-flags
  applyFlags: (testOrderId: string, data: any) =>
    axiosClient.post(`/patient/flagging-configs/${testOrderId}/apply-flags`, data),
};

