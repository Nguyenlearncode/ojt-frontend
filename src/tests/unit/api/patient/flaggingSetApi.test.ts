import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../api/axiosClient";
import { flaggingSetApi } from "../../../../features/patient/api/flaggingSetApi";

vi.mock("../../../../api/axiosClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe("flaggingSetApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("getAllFlaggingConfigs → GET đúng", () => {
    flaggingSetApi.getAllFlaggingConfigs();
    expect(axiosClient.get).toHaveBeenCalledWith("/patient/flagging-configs");
  });

  it("createFlaggingConfig → POST đúng", () => {
    const data = { a: 1 };
    flaggingSetApi.createFlaggingConfig(data);
    expect(axiosClient.post).toHaveBeenCalledWith(
      "/patient/flagging-configs/create",
      data
    );
  });

  it("updateFlaggingConfig → PUT đúng", () => {
    const data = { b: 2 };
    flaggingSetApi.updateFlaggingConfig(10, data);
    expect(axiosClient.put).toHaveBeenCalledWith(
      "/patient/flagging-configs/update/10",
      data
    );
  });


});
