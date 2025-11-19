import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../api/axiosClient";
import { patientApi } from "../../../../features/patient/api/patientApi";

vi.mock("../../../../api/axiosClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("patientApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("getAllMedicalRecords → GET đúng", () => {
    patientApi.getAllMedicalRecords();
    expect(axiosClient.get).toHaveBeenCalledWith("/patient/medicalrecord/getall");
  });

  it("createMedicalRecord → POST đúng", () => {
    const data = { a: 1 };
    patientApi.createMedicalRecord(data);
    expect(axiosClient.post).toHaveBeenCalledWith("/patient/medicalrecord/create", data);
  });

  it("updateMedicalRecord → PATCH đúng", () => {
    const data = { x: 2 };
    patientApi.updateMedicalRecord("P01", data);
    expect(axiosClient.patch).toHaveBeenCalledWith(
      "/patient/medicalrecord/update/by-patient/P01",
      data
    );
  });

  it("deleteMedicalRecord → DELETE đúng với params", () => {
    patientApi.deleteMedicalRecord("P02", "U01");
    expect(axiosClient.delete).toHaveBeenCalledWith(
      "/patient/medicalrecord/delete/P02",
      { params: { deletedBy: "U01" } }
    );
  });

  it("getMedicalRecordDetail → GET đúng", () => {
    patientApi.getMedicalRecordDetail("P03");
    expect(axiosClient.get).toHaveBeenCalledWith(
      "/patient/medicalrecord/detail/by-patient/P03"
    );
  });
});
