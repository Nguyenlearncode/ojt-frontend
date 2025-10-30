import { renderHook, act } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach } from "vitest";

// 🧩 Mock các module phụ thuộc
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}));

vi.mock("../../features/user/api/userApi", () => ({
  userApi: {
    createUser: vi.fn(),
  },
}));

vi.mock("../../utils/formatDate", () => ({
  formatDate: vi.fn((d: string) => d),
}));

vi.mock("../../utils/calcAge", () => ({
  calcAge: vi.fn(() => 30),
}));

import { userApi } from "../../features/user/api/userApi";
import { toast } from "react-toastify";
import { useCreateUserForm } from "../../features/user/hooks/useCreateUserForm";

describe("🧠 Logic Test: useCreateUserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("✅ handleChange cập nhật formData đúng", () => {
    const { result } = renderHook(() => useCreateUserForm());

    act(() => {
      result.current.handleChange({
        target: { name: "fullName", value: "Nguyễn Văn A" },
      } as any);
    });

    expect(result.current.formData.fullName).toBe("Nguyễn Văn A");
  });

  test("⚠️ handleSubmit cảnh báo khi form thiếu dữ liệu", async () => {
    const { result } = renderHook(() => useCreateUserForm());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    expect(toast.warning).toHaveBeenCalledWith("⚠️ Vui lòng kiểm tra lại thông tin!");
  });

  test("✅ handleSubmit gọi API khi form hợp lệ", async () => {
    (userApi.createUser as any).mockResolvedValue({ message: "OK" });

    const { result } = renderHook(() => useCreateUserForm());

    // Cập nhật dữ liệu hợp lệ
    act(() => {
      result.current.setFormData({
        roleCode: "ADMIN",
        fullName: "Nguyễn Văn A",
        gender: "Male",
        dateOfBirth: "1995-01-01",
        age: 30,
        phoneNumber: "0912345678",
        address: "Hà Nội",
        email: "a@example.com",
        cccd: "123456789",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    expect(userApi.createUser).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("OK");
  });

  test("❌ handleSubmit hiển thị lỗi khi API lỗi", async () => {
    (userApi.createUser as any).mockRejectedValue({
      response: { data: { message: "API error" } },
    });

    const { result } = renderHook(() => useCreateUserForm());

    act(() => {
      result.current.setFormData({
        roleCode: "ADMIN",
        fullName: "Nguyễn Văn A",
        gender: "Male",
        dateOfBirth: "1995-01-01",
        age: 30,
        phoneNumber: "0912345678",
        address: "Hà Nội",
        email: "a@example.com",
        cccd: "123456789",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    expect(toast.error).toHaveBeenCalledWith("API error");
  });

  test("🔁 handleReset khôi phục form về ban đầu", () => {
    const { result } = renderHook(() => useCreateUserForm());

    act(() => {
      result.current.setFormData({
        ...result.current.formData,
        fullName: "Tester",
      });
    });

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.formData.fullName).toBe("");
  });
});
