import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosAuth from "../../../../api/axiosAuth";
import axiosClient from "../../../../api/axiosClient";
import { authApi } from "../../../../features/auth/api/authApi";

// Mock axios clients
vi.mock("../../../../api/axiosAuth", () => ({
  default: { post: vi.fn() },
}));

vi.mock("../../../../api/axiosClient", () => ({
  default: { post: vi.fn() },
}));

describe("authApi (simple tests)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("login → gọi đúng endpoint", async () => {
    (axiosAuth.post as any).mockResolvedValue({
      data: { data: { accessToken: "A", refreshToken: "R" } },
    });

    const res = await authApi.login({ email: "a", password: "b" });

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/login", {
      email: "a",
      password: "b",
    });
    expect(res).toEqual({ accessToken: "A", refreshToken: "R" });
  });

  it("refresh → gửi đúng body", async () => {
    (axiosAuth.post as any).mockResolvedValue({
      data: { data: { accessToken: "AA", refreshToken: "RR" } },
    });

    const res = await authApi.refresh("r1", "a1");

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/refresh", {
      refreshToken: "r1",
      accessToken: "a1",
    });
    expect(res.refreshToken).toBe("RR");
  });

  it("forgotPassword → không trả gì", async () => {
    (axiosAuth.post as any).mockResolvedValue({});

    await authApi.forgotPassword({ email: "x@y.com" });

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/forgetPassword", {
      email: "x@y.com",
    });
  });

  it("resetPassword → post đúng", async () => {
    (axiosAuth.post as any).mockResolvedValue({});

    await authApi.resetPassword({ token: "t", newPassword: "123" });

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/resetPassword", {
      token: "t",
      newPassword: "123",
    });
  });

  it("changePassword → dùng axiosClient", async () => {
    (axiosClient.post as any).mockResolvedValue({});

    await authApi.changePassword({ currentPassword: "1", newPassword: "2" });

    expect(axiosClient.post).toHaveBeenCalledWith("/iam/auth/changePassword", {
      currentPassword: "1",
      newPassword: "2",
    });
  });
});
