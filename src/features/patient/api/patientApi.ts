import axiosClient from "../../../api/axiosClient";

export const patientApi = {
  // Lấy toàn bộ hồ sơ bệnh án
  getAllMedicalRecords: () =>
    axiosClient.get("/patient/medicalrecord"),

  // Tạo mới hồ sơ bệnh án
  createMedicalRecord: (data: any) =>
    axiosClient.post("/patient/medicalrecord", data),
};
