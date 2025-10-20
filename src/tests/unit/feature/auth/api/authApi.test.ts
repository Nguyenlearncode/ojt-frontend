import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import axiosClientModule from "../../../../../api/axiosClient";
import { authApi } from "../../../../../features/auth/api/authApi";

// ✅ Import default đúng
const axiosClient = axiosClientModule;

// ✅ Mock axiosClient đúng kiểu export default
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

    // ✅ axios trả về { data: ... }
    (axiosClient.post as unknown as Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await authApi.login(mockData);

    expect(axiosClient.post).toHaveBeenCalledWith("/auth/login", mockData);
    expect(result).toEqual(mockResponse);
  });

  it("should throw error when axiosClient.post rejects", async () => {
    const mockData = { email: "test@example.com", password: "wrongpass" };
    const mockError = new Error("Network Error");

    (axiosClient.post as unknown as Mock).mockRejectedValueOnce(mockError);

    await expect(authApi.login(mockData)).rejects.toThrow("Network Error");
    expect(axiosClient.post).toHaveBeenCalledWith("/auth/login", mockData);
  });
});
