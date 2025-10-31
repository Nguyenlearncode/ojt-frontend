// src/test/unit/auth/api/authApi.test.ts
import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

// Mock the axiosAuth module used by authApi
vi.mock("../../../../api/axiosAuth", () => ({
  default: {
    post: vi.fn(),
  },
}));

import axiosAuth from "../../../../api/axiosAuth";
import { authApi } from "../../../../features/auth/api/authApi";

describe("authApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("calls axiosAuth.post with correct path and payload and returns tokens (success)", async () => {
      const mockTokens = { accessToken: "access-123", refreshToken: "refresh-456" };
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({
        data: { data: mockTokens },
      });

      const payload = { email: "user@example.com", password: "secret" };
      const result = await authApi.login(payload);

      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/login", payload);
      expect(result).toEqual(mockTokens);
    });

    it("propagates error when axiosAuth.post rejects", async () => {
      (axiosAuth.post as unknown as Mock).mockRejectedValueOnce(new Error("network error"));

      await expect(authApi.login({ email: "a", password: "b" })).rejects.toThrow("network error");
      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/login", { email: "a", password: "b" });
    });
  });

  describe("refresh", () => {
    it("calls axiosAuth.post with refreshToken and accessToken when provided and returns tokens", async () => {
      const mockTokens = { accessToken: "new-access", refreshToken: "new-refresh" };
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({
        data: { data: mockTokens },
      });

      const refreshToken = "refresh-1";
      const accessToken = "access-old";
      const result = await authApi.refresh(refreshToken, accessToken);

      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/refresh", {
        refreshToken,
        accessToken,
      });
      expect(result).toEqual(mockTokens);
    });

    it("sends accessToken as undefined when not provided", async () => {
      const mockTokens = { accessToken: "new-access-2", refreshToken: "new-refresh-2" };
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({
        data: { data: mockTokens },
      });

      const refreshToken = "refresh-2";
      const result = await authApi.refresh(refreshToken);

      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/refresh", {
        refreshToken,
        accessToken: undefined,
      });
      expect(result).toEqual(mockTokens);
    });

    it("propagates error when axiosAuth.post rejects", async () => {
      (axiosAuth.post as unknown as Mock).mockRejectedValueOnce(new Error("refresh fail"));

      await expect(authApi.refresh("r-token", "a-token")).rejects.toThrow("refresh fail");
      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/refresh", {
        refreshToken: "r-token",
        accessToken: "a-token",
      });
    });
  });
});