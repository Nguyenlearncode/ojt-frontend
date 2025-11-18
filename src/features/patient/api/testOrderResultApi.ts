import axiosClient from "../../../api/axiosClient";

export const testOrderResultApi = {
  // Tạo kết quả xét nghiệm
  // POST /api/result
  createTestResult: (data: {
    flaggingSetId: number;
    patientId: string;
    testOrderId: string;
  }) => axiosClient.post("/patient/result", data),

  // Sync kết quả xét nghiệm
  // POST /api/result/sync
  syncTestResult: (data: any) => axiosClient.post("/patient/result/sync", data),
};

