import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { usePatientMedicalRecords } from "../../../../features/patient/hooks/usePatientMedicalRecords";

import { patientApi } from "../../../../features/patient/api/patientApi";

// ✔ Mock API
vi.mock("../../../../features/patient/api/patientApi", () => ({
  patientApi: {
    getAllMedicalRecords: vi.fn(),
    createMedicalRecord: vi.fn(),
    updateMedicalRecord: vi.fn(),
    deleteMedicalRecord: vi.fn(),
    getMedicalRecordDetail: vi.fn(),
  },
}));

// ✔ Mock getUserInfo
vi.mock("../../../../utils/jwtHelper", () => ({
  getUserInfo: () => ({ sub: "U1" }),
}));

// ✔ Mock toast
vi.mock("@chakra-ui/react", () => ({
  useToast: () => vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("usePatientMedicalRecords", () => {
  it("fetchRecords → gọi API & set dữ liệu", async () => {
    (patientApi.getAllMedicalRecords as any).mockResolvedValue({
      data: [{ patientId: "P1" }],
    });

    const { result } = renderHook(() => usePatientMedicalRecords());

    await act(async () => {
      await result.current.fetchRecords();
    });

    expect(patientApi.getAllMedicalRecords).toHaveBeenCalled();
    expect(result.current.records.length).toBe(1);
  });

  it("createRecord → gọi API", async () => {
    (patientApi.createMedicalRecord as any).mockResolvedValue({});

    const { result } = renderHook(() => usePatientMedicalRecords());

    await act(async () => {
      await result.current.createRecord({
        patient: {
          fullName: "Test",
          dateOfBirth: "2024-02-02",
          gender: "male",
          phoneNumber: "123",
          userId: "U1",
        },
        doctorId: "D1",
        createdBy: "U1",
      });
    });

    expect(patientApi.createMedicalRecord).toHaveBeenCalled();
  });

  it("deleteRecord → gọi API", async () => {
    (patientApi.deleteMedicalRecord as any).mockResolvedValue({});

    const { result } = renderHook(() => usePatientMedicalRecords());

    await act(async () => {
      await result.current.deleteRecord("P1");
    });

    expect(patientApi.deleteMedicalRecord).toHaveBeenCalledWith("P1", "U1");
  });
});
