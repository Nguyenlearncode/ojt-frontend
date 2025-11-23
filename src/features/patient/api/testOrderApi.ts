import axiosClient from "../../../api/axiosClient";

export const testOrderApi = {
  createTestOrder: (data: any) =>
    axiosClient.post("/patient/testorder/create", data),

  createTestOrderForPatient: (patientId: string, data: any) =>
    axiosClient.post(`/patient/testorder/create/${patientId}`, data),

  getTestOrderDetail: (testOrderId: string) =>
    axiosClient.get(`/patient/testorder/detail/${testOrderId}`),

  getAllTestOrders: () =>
    axiosClient.get("/patient/testorder/viewAll"),

  modifyTestOrder: (testOrderId: string, data: any) =>
    axiosClient.patch(`/patient/testorder/modify/${testOrderId}`, data),

  deleteTestOrder: (testOrderId: string) =>
    axiosClient.delete(`/patient/testorder/delete/${testOrderId}`),

  reviewTestOrder: (testOrderId: string, data: any) =>
    axiosClient.patch(`/patient/testorder/review/${testOrderId}`, data),

  exportTestOrders: (patientId?: string) =>
    axiosClient.get("/patient/TestOrderReport/export-excel", {
      params: patientId ? { patientId } : undefined,
      responseType: "blob",
    }),

  printTestOrder: (testOrderId: string, fileName?: string) =>
    axiosClient.get(`/patient/TestOrderReport/print-pdf/${testOrderId}`, {
      params: fileName ? { fileName } : undefined,
      responseType: "blob",
    }),
};
