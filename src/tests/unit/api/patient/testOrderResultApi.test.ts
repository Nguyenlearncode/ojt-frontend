import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../api/axiosClient";
import { testOrderResultApi } from "../../../../features/patient/api/testOrderResultApi";

vi.mock("../../../../api/axiosClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("testOrderResultApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("createTestResult → POST đúng", () => {
    const data = { flaggingSetId: 1, patientId: "P1", testOrderId: "T1" };
    testOrderResultApi.createTestResult(data);

    expect(axiosClient.post).toHaveBeenCalledWith("/patient/result", data);
  });

  it("syncTestResult → POST đúng", () => {
    const data = { x: 1 };
    testOrderResultApi.syncTestResult(data);

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/patient/result/sync",
      data
    );
  });
});
