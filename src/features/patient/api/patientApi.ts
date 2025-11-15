import axiosClient from "../../../api/axiosClient";

export const patientApi = {
  // Lấy toàn bộ hồ sơ bệnh án
  // Note: Backend route là /api/medicalrecord/getall nhưng qua Ocelot gateway có thể là /patient/medicalrecord/getall
  getAllMedicalRecords: () =>
    axiosClient.get("/patient/medicalrecord/getall"),

  // Tạo mới hồ sơ bệnh án
  // Note: Backend route là /api/medicalrecord/create nhưng qua Ocelot gateway có thể là /patient/medicalrecord/create
  createMedicalRecord: (data: any) =>
    axiosClient.post("/patient/medicalrecord/create", data),
};
