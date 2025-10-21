// src/tests/unit/features/user/hooks/useUsers.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUsers } from "../../../../../features/user/hooks/useUsers";
import { userApi } from "../../../../../features/user/api/userApi";

vi.mock("../../../../../features/user/api/userApi");

describe("useUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetch thành công -> trả về danh sách users", async () => {
    const mockUsers = [
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
    (userApi.getAllUsers as any).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.error).toBeNull();
    });
  });

  it("API trả về mảng rỗng -> hiển thị lỗi 'Không có người dùng nào.'", async () => {
    (userApi.getAllUsers as any).mockResolvedValue([]);

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.users).toEqual([]);
      expect(result.current.error).toBe("Không có người dùng nào.");
    });
  });

  it("API lỗi -> hiển thị lỗi 'Lỗi khi tải danh sách người dùng.'", async () => {
    (userApi.getAllUsers as any).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.users).toEqual([]);
      expect(result.current.error).toBe("Lỗi khi tải danh sách người dùng.");
    });
  });
});
