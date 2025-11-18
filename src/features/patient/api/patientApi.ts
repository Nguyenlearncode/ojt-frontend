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

  // Cập nhật hồ sơ bệnh án theo PatientId
  // PATCH /api/medicalrecord/update/by-patient/{patientId}
  updateMedicalRecord: (patientId: string, data: any) =>
    axiosClient.patch(`/patient/medicalrecord/update/by-patient/${patientId}`, data),

  // Xóa hồ sơ bệnh án theo PatientId
  // Note: Backend cần sửa để nhận patientId thay vì recordId
  // DELETE /api/medicalrecord/delete/{patientId}?deletedBy={userId}
  deleteMedicalRecord: (patientId: string, deletedBy: string) =>
    axiosClient.delete(`/patient/medicalrecord/delete/${patientId}`, {
      params: { deletedBy },
    }),

  // Lấy chi tiết hồ sơ bệnh án theo PatientId
  // GET /api/medicalrecord/detail/by-patient/{patientId}
  getMedicalRecordDetail: (patientId: string) =>
    axiosClient.get(`/patient/medicalrecord/detail/by-patient/${patientId}`),
};
