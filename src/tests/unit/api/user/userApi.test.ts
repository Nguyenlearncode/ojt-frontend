import { describe, it, expect, vi, beforeEach } from "vitest";
import { authApi } from "../../../../features/auth/api/authApi";
import axiosAuth from "../../../../api/axiosAuth";
import axiosClient from "../../../../api/axiosClient";

vi.mock("../../../../api/axiosAuth", () => ({
  default: { post: vi.fn() },
}));

vi.mock("../../../../api/axiosClient", () => ({
  default: { post: vi.fn() },
}));

describe("authApi (simple)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("login gọi đúng endpoint", async () => {
    (axiosAuth.post as any).mockResolvedValue({
      data: { data: { accessToken: "a", refreshToken: "b" } },
    });

    await authApi.login({ email: "a", password: "b" });

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/login", {
      email: "a",
      password: "b",
    });
  });

  it("refresh gọi đúng endpoint", async () => {
    (axiosAuth.post as any).mockResolvedValue({
      data: { data: { accessToken: "newA", refreshToken: "newR" } },
    });

    await authApi.refresh("rt", "at");

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/refresh", {
      refreshToken: "rt",
      accessToken: "at",
    });
  });

  it("forgotPassword gọi đúng endpoint", async () => {
    (axiosAuth.post as any).mockResolvedValue({});

    await authApi.forgotPassword({ email: "x@y.com" });

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/forgetPassword", {
      email: "x@y.com",
    });
  });

  it("resetPassword gọi đúng endpoint", async () => {
    (axiosAuth.post as any).mockResolvedValue({});

    await authApi.resetPassword({ token: "t", newPassword: "123" });

    expect(axiosAuth.post).toHaveBeenCalledWith("/auth/resetPassword", {
      token: "t",
      newPassword: "123",
    });
  });

  it("changePassword gọi đúng endpoint", async () => {
    (axiosClient.post as any).mockResolvedValue({});

    await authApi.changePassword({ currentPassword: "o", newPassword: "n" });

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/iam/auth/changePassword",
      {
        currentPassword: "o",
        newPassword: "n",
      }
    );
  });
});
