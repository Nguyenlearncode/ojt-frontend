import axiosClient from "../../../api/axiosClient";

export const testOrderApi = {
  // Tạo đơn xét nghiệm cho bệnh nhân mới
  // POST /api/testorder/create
  createTestOrder: (data: any) =>
    axiosClient.post("/patient/testorder/create", data),

  // Tạo đơn xét nghiệm cho bệnh nhân đã có
  // POST /api/testorder/create/{patientId}
  createTestOrderForPatient: (patientId: string, data: any) =>
    axiosClient.post(`/patient/testorder/create/${patientId}`, data),

  // Xem chi tiết đơn xét nghiệm
  // GET /api/testorder/detail/{testOrderId}
  getTestOrderDetail: (testOrderId: string) =>
    axiosClient.get(`/patient/testorder/detail/${testOrderId}`),

  // Xem tất cả đơn xét nghiệm
  // GET /api/testorder/viewAll
  getAllTestOrders: () =>
    axiosClient.get("/patient/testorder/viewAll"),

  // Review đơn xét nghiệm
  // PATCH /api/testorder/review/{testOrderId}
  reviewTestOrder: (testOrderId: string, data: any) =>
    axiosClient.patch(`/patient/testorder/review/${testOrderId}`, data),

  // Sửa đơn xét nghiệm
  // PATCH /api/testorder/modify/{testOrderId}
  modifyTestOrder: (testOrderId: string, data: any) =>
    axiosClient.patch(`/patient/testorder/modify/${testOrderId}`, data),

  // Cập nhật trạng thái đơn xét nghiệm
  // PATCH /api/testorder/status/{testOrderId}
  updateTestOrderStatus: (testOrderId: string, data: any) =>
    axiosClient.patch(`/patient/testorder/status/${testOrderId}`, data),

  // Xóa đơn xét nghiệm
  // DELETE /api/testorder/delete/{testOrderId}
  deleteTestOrder: (testOrderId: string) =>
    axiosClient.delete(`/patient/testorder/delete/${testOrderId}`),

  // Xuất Excel danh sách đơn (optionally theo patientId)
  exportTestOrders: (patientId?: string) =>
    axiosClient.get("/patient/TestOrderReport/export-excel", {
      params: patientId ? { patientId } : undefined,
      responseType: "blob",
    }),

  // In PDF 1 đơn xét nghiệm
  printTestOrder: (testOrderId: string, fileName?: string) =>
    axiosClient.get(`/patient/TestOrderReport/print-pdf/${testOrderId}`, {
      params: fileName ? { fileName } : undefined,
      responseType: "blob",
    }),
};

