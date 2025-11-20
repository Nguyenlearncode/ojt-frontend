import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUpdateUserProfile } from "../../../../features/user/hooks/useUpdateUserProfile";

// Mock router
vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "123" }),
  useNavigate: () => vi.fn(),
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
  },
}));

// Mock userApi
vi.mock("../../../../features/user/api/userApi", () => ({
  userApi: {
    getUserById: vi.fn(),
    updateUser: vi.fn(),
  },
}));

import { toast } from "react-toastify";
import { userApi } from "../../../../features/user/api/userApi";

describe("useUpdateUserProfile (simple)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetch user khi có id", async () => {
    (userApi.getUserById as any).mockResolvedValue({
      userId: "123",
      fullName: "John",
      email: "a@b.com",
      phoneNumber: "0123456789",
      gender: "Male",
      age: 20,
      address: "HN",
      dateOfBirth: "2000-01-01",
    });

    renderHook(() => useUpdateUserProfile());

    expect(userApi.getUserById).toHaveBeenCalledWith("123");
  });

  it("submit hợp lệ → gọi updateUser + toast.success", async () => {
    (userApi.getUserById as any).mockResolvedValue({
      userId: "123",
      fullName: "John",
      email: "a@b.com",
      phoneNumber: "0123456789",
      gender: "Male",
      age: 20,
      address: "HN",
      dateOfBirth: "2000-01-01",
    });

    const { result } = renderHook(() => useUpdateUserProfile());

    // Chờ lấy dữ liệu
    await act(async () => {});

    act(() => {
      result.current.setFormData({
        userId: "123",
        fullName: "John",
        email: "a@b.com",
        phoneNumber: "0123456789",
        gender: "Male",
        age: 20,
        address: "HN",
        dateOfBirth: "2000-01-01",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault() {} } as any);
    });

    expect(userApi.updateUser).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
  });

  it("API lỗi → toast.error", async () => {
    (userApi.getUserById as any).mockResolvedValue({
      userId: "123",
      fullName: "John",
      email: "a@b.com",
      phoneNumber: "0123456789",
      gender: "Male",
      age: 20,
      address: "HN",
      dateOfBirth: "2000-01-01",
    });

    (userApi.updateUser as any).mockRejectedValue({
      response: { data: { message: "Lỗi cập nhật" } },
    });

    const { result } = renderHook(() => useUpdateUserProfile());

    await act(async () => {});

    act(() => {
      result.current.setFormData({
        userId: "123",
        fullName: "John",
        email: "a@b.com",
        phoneNumber: "0123456789",
        gender: "Male",
        age: 20,
        address: "HN",
        dateOfBirth: "2000-01-01",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault() {} } as any);
    });

    expect(toast.error).toHaveBeenCalledWith("Lỗi cập nhật");
  });
});
