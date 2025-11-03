import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

// Mock axiosAuth và axiosClient
vi.mock("../../../../api/axiosAuth", () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock("../../../../api/axiosClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

import axiosAuth from "../../../../api/axiosAuth";
import axiosClient from "../../../../api/axiosClient";
import { authApi } from "../../../../features/auth/api/authApi";

describe("🔐 authApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ✅ LOGIN
  describe("login", () => {
    it("🟢 gọi đúng endpoint và trả token khi thành công", async () => {
      const mockTokens = { accessToken: "a1", refreshToken: "r1" };
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({
        data: { data: mockTokens },
      });

      const payload = { email: "u@ex.com", password: "123" };
      const result = await authApi.login(payload);

      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/login", payload);
      expect(result).toEqual(mockTokens);
    });

    it("🔴 ném lỗi khi request thất bại", async () => {
      (axiosAuth.post as unknown as Mock).mockRejectedValueOnce(new Error("login fail"));
      await expect(authApi.login({ email: "a", password: "b" })).rejects.toThrow("login fail");
    });
  });

  // ✅ REFRESH
  describe("refresh", () => {
    it("🟢 gửi refreshToken + accessToken và trả token mới", async () => {
      const mockTokens = { accessToken: "newA", refreshToken: "newR" };
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({
        data: { data: mockTokens },
      });

      const result = await authApi.refresh("r1", "a1");
      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/refresh", {
        refreshToken: "r1",
        accessToken: "a1",
      });
      expect(result).toEqual(mockTokens);
    });

    it("🟠 gửi accessToken undefined nếu không có", async () => {
      const mockTokens = { accessToken: "newA2", refreshToken: "newR2" };
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({
        data: { data: mockTokens },
      });

      const result = await authApi.refresh("r2");
      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/refresh", {
        refreshToken: "r2",
        accessToken: undefined,
      });
      expect(result).toEqual(mockTokens);
    });

    it("🔴 ném lỗi khi refresh thất bại", async () => {
      (axiosAuth.post as unknown as Mock).mockRejectedValueOnce(new Error("refresh fail"));
      await expect(authApi.refresh("r3", "a3")).rejects.toThrow("refresh fail");
    });
  });

  // ✅ FORGOT PASSWORD
  describe("forgotPassword", () => {
    it("🟢 gửi request đúng endpoint", async () => {
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({});
      const payload = { email: "user@example.com" };

      await authApi.forgotPassword(payload);

      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/forgetPassword", payload);
    });

    it("🔴 ném lỗi khi request thất bại", async () => {
      (axiosAuth.post as unknown as Mock).mockRejectedValueOnce(new Error("email not found"));
      await expect(authApi.forgotPassword({ email: "x@x.com" })).rejects.toThrow("email not found");
    });
  });

  // ✅ RESET PASSWORD
  describe("resetPassword", () => {
    it("🟢 gửi request đúng endpoint", async () => {
      (axiosAuth.post as unknown as Mock).mockResolvedValueOnce({});
      const payload = { token: "t123", newPassword: "newpass" };

      await authApi.resetPassword(payload);

      expect(axiosAuth.post).toHaveBeenCalledWith("/auth/resetPassword", payload);
    });

    it("🔴 ném lỗi khi reset thất bại", async () => {
      (axiosAuth.post as unknown as Mock).mockRejectedValueOnce(new Error("invalid token"));
      await expect(authApi.resetPassword({ token: "bad", newPassword: "x" })).rejects.toThrow(
        "invalid token"
      );
    });
  });

  // ✅ CHANGE PASSWORD
  describe("changePassword", () => {
    it("🟢 gửi request đúng endpoint", async () => {
      (axiosClient.post as unknown as Mock).mockResolvedValueOnce({});
      const payload = { currentPassword: "old", newPassword: "new" };

      await authApi.changePassword(payload);

      expect(axiosClient.post).toHaveBeenCalledWith("/auth/changePassword", payload);
    });

    it("🔴 ném lỗi khi request thất bại", async () => {
      (axiosClient.post as unknown as Mock).mockRejectedValueOnce(new Error("wrong password"));
      await expect(
        authApi.changePassword({ currentPassword: "old", newPassword: "new" })
      ).rejects.toThrow("wrong password");
    });
  });
});
