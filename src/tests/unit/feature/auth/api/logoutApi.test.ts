// src/tests/unit/feature/auth/api/logoutApi.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../../api/axiosClient";
import { logoutApi } from "../../../../../features/auth/api/logoutApi";

vi.mock("../../../../../api/axiosClient", () => ({
  default: { post: vi.fn() },
}));

describe("logoutApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls axiosClient.post with correct URL and data", async () => {
    const mockPost = vi.mocked(axiosClient.post);
    mockPost.mockResolvedValueOnce(undefined);

    const data = { refreshToken: "token123" };
    const result = await logoutApi(data);

    // ✅ API được gọi đúng endpoint và payload
    expect(mockPost).toHaveBeenCalledWith("/auth/logout", data);
    // ✅ API trả về void (undefined)
    expect(result).toBeUndefined();
  });

  it("throws error if axios fails", async () => {
    const mockPost = vi.mocked(axiosClient.post);
    mockPost.mockRejectedValueOnce(new Error("Request failed"));

    await expect(logoutApi({ refreshToken: "x" })).rejects.toThrow("Request failed");
  });
});
