import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { useTestOrderResults } from "../../../../features/patient/hooks/useTestOrderResults";
import { testOrderResultApi } from "../../../../features/patient/api/testOrderResultApi";

vi.mock("../../../../features/patient/api/testOrderResultApi", () => ({
  testOrderResultApi: {
    createTestResult: vi.fn(),
    syncTestResult: vi.fn(),
  },
}));

describe("useTestOrderResults", () => {
  it("createTestResult → gọi API", async () => {
    (testOrderResultApi.createTestResult as any).mockResolvedValue({});

    const { result } = renderHook(() => useTestOrderResults());

    await act(async () => {
      await result.current.createTestResult({
        flaggingSetId: 1,
        patientId: "P1",
        testOrderId: "T1",
      });
    });

    expect(testOrderResultApi.createTestResult).toHaveBeenCalled();
  });

  it("syncTestResult → gọi API", async () => {
    (testOrderResultApi.syncTestResult as any).mockResolvedValue({ status: "ok" });

    const { result } = renderHook(() => useTestOrderResults());

    await act(async () => {
      await result.current.syncTestResult({
        testOrderId: "T1",
        testName: "CBC",
        value: "12",
      });
    });

    expect(testOrderResultApi.syncTestResult).toHaveBeenCalled();
  });
});
