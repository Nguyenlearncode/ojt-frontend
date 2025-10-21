// src/tests/unit/features/user/api/userApi.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../../api/axiosClient";
import { userApi } from "../../../../../features/user/api/userApi";
import type { User } from "../../../../../features/user/api/userApi";

vi.mock("../../../../../api/axiosClient");

describe("userApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gọi đúng endpoint và trả về danh sách user", async () => {
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

    // interceptor axiosClient đã unwrap data => trả về trực tiếp
    (axiosClient.get as any).mockResolvedValue(mockUsers);

    const result = await userApi.getAllUsers();

    expect(axiosClient.get).toHaveBeenCalledWith("/users/getalluser");
    expect(result).toEqual(mockUsers);
  });

  it("trả về [] khi response null hoặc undefined", async () => {
    (axiosClient.get as any).mockResolvedValue(undefined);
    const result = await userApi.getAllUsers();
    expect(result).toEqual([]);
  });
});
