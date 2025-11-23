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

  it("createResult → POST đúng", () => {
    const data = { patientId: "P1", testOrderId: "T1", enteredBy: "U1" };

    testOrderResultApi.createResult(data);

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/patient/CreateResult",
      data
    );
  });
});
