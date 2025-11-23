import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { useTestOrderResults } from "../../../../features/patient/hooks/useTestOrderResults";
import { testOrderResultApi } from "../../../../features/patient/api/testOrderResultApi";

vi.mock("../../../../features/patient/api/testOrderResultApi", () => ({
  testOrderResultApi: {
    createResult: vi.fn(),
  },
}));

describe("useTestOrderResults", () => {
  it("createTestOrderResult → gọi API createResult", async () => {
    (testOrderResultApi.createResult as any).mockResolvedValue({});

    const { result } = renderHook(() => useTestOrderResults());

    await act(async () => {
      await result.current.createTestOrderResult({
        patientId: "P1",
        testOrderId: "T1",
      });
    });

    expect(testOrderResultApi.createResult).toHaveBeenCalledWith({
      patientId: "P1",
      testOrderId: "T1",
    });
  });
});
