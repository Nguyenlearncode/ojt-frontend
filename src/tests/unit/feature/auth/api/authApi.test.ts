import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import axiosClient from "../../../../../api/axiosClient";
import { authApi } from "../../../../../features/auth/api/authApi";

// 🧩 Mock axiosClient module
vi.mock("../../../../../api/axiosClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("authApi (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call axiosClient.post with correct URL and data", async () => {
    const mockData = { email: "test@example.com", password: "123456" };
    const mockResponse = {
      accessToken: "mockAccessToken",
      refreshToken: "mockRefreshToken",
    };

    // ✅ Mock resolve từ axiosClient.post
    (axiosClient.post as unknown as Mock).mockResolvedValue(mockResponse);

    const result = await authApi.login(mockData);

    expect(axiosClient.post).toHaveBeenCalledWith("/users/login", mockData);
    expect(result).toEqual(mockResponse);
  });

  it("should throw error when axiosClient.post rejects", async () => {
    const mockData = { email: "test@example.com", password: "wrongpass" };
    const mockError = new Error("Network Error");

    (axiosClient.post as unknown as Mock).mockRejectedValue(mockError);

    await expect(authApi.login(mockData)).rejects.toThrow("Network Error");
    expect(axiosClient.post).toHaveBeenCalledWith("/users/login", mockData);
  });
});
