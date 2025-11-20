import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

vi.mock("../../../../api/axiosClient", () => ({
  default: { post: vi.fn() },
}));

import axiosClient from "../../../../api/axiosClient";
import { logoutApi } from "../../../../features/auth/api/logoutApi";

describe("logoutApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls axiosClient.post with correct path and payload (success)", async () => {
    (axiosClient.post as Mock).mockResolvedValueOnce({ status: 200 });

    const payload = { refreshToken: "refresh-123" };
    await logoutApi(payload);

    expect(axiosClient.post).toHaveBeenCalledWith("/iam/auth/logout", payload);
  });

  it("propagates error when axiosClient.post rejects", async () => {
    (axiosClient.post as Mock).mockRejectedValueOnce(new Error("network error"));

    const payload = { refreshToken: "refresh-err" };

    await expect(logoutApi(payload)).rejects.toThrow("network error");
    expect(axiosClient.post).toHaveBeenCalledWith("/iam/auth/logout", payload);
  });
});
