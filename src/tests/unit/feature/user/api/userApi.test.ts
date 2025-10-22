import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../../api/axiosClient";
import { userApi } from "../../../../../features/user/api/userApi";
import type { User } from "../../../../../features/user/api/userApi";

vi.mock("../../../../../api/axiosClient", () => ({
  default: { get: vi.fn() },
}));

describe("userApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gọi đúng endpoint và trả về danh sách người dùng", async () => {
    const mockUsers: User[] = [
      {
        userId: "1",
        fullName: "Nguyễn Văn A",
        email: "a@gmail.com",
        phoneNumber: "0123456789",
        gender: "Nam",
        age: 28,
        address: "Hà Nội",
        dateOfBirth: "1997-01-01",
        role: { roleName: "Admin" },
      },
    ];

    (axiosClient.get as any).mockResolvedValue({ data: mockUsers });

    const result = await userApi.getAllUsers();

    expect(axiosClient.get).toHaveBeenCalledWith("/users/getalluser");
    expect(result).toEqual(mockUsers);
  });

  it("trả về [] khi API trả về null", async () => {
    (axiosClient.get as any).mockResolvedValue({ data: null });

    const result = await userApi.getAllUsers();

    expect(result).toEqual([]);
  });

  it("throw lỗi nếu axiosClient.get bị reject", async () => {
    (axiosClient.get as any).mockRejectedValue(new Error("Network error"));

    await expect(userApi.getAllUsers()).rejects.toThrow("Network error");
  });
});
