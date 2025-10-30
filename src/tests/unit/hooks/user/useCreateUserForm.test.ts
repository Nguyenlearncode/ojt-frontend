import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useCreateUserForm } from "../../../../features/user/hooks/useCreateUserForm";
import { userApi } from "../../../../features/user/api/userApi";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router-dom";

// 🧩 Mock modules
vi.mock("../../../../features/user/api/userApi", () => ({
  userApi: { createUser: vi.fn() },
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("useCreateUserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("✅ khởi tạo form mặc định chính xác", () => {
    const { result } = renderHook(() => useCreateUserForm(), { wrapper: MemoryRouter });
    expect(result.current.formData.fullName).toBe("");
    expect(result.current.formData.gender).toBe("Male");
  });

  it("✅ cập nhật form khi gọi handleChange", () => {
    const { result } = renderHook(() => useCreateUserForm(), { wrapper: MemoryRouter });

    act(() => {
      result.current.handleChange({
        target: { name: "fullName", value: "Nguyen Van A" },
      } as any);
    });

    expect(result.current.formData.fullName).toBe("Nguyen Van A");
    expect(result.current.errors.fullName).toBe("");
  });

  it("⚠️ hiển thị cảnh báo khi submit với form trống", async () => {
    const { result } = renderHook(() => useCreateUserForm(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(toast.warning).toHaveBeenCalledWith("⚠️ Vui lòng kiểm tra lại thông tin!");
  });

  it("✅ gọi API thành công khi submit hợp lệ", async () => {
    (userApi.createUser as any).mockResolvedValueOnce({ message: "Tạo tài khoản thành công!" });

    const { result } = renderHook(() => useCreateUserForm(), { wrapper: MemoryRouter });

    act(() => {
      result.current.setFormData({
        roleCode: "Admin",
        fullName: "Nguyen Van B",
        gender: "Male",
        dateOfBirth: "2000-01-01",
        age: 25,
        phoneNumber: "0912345678",
        address: "Hà Nội",
        email: "test@example.com",
        cccd: "123456789",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(userApi.createUser).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Tạo tài khoản thành công!");
    expect(mockNavigate).toHaveBeenCalledWith("/UserManagement");
  });

  it("❌ hiển thị lỗi khi API thất bại", async () => {
    (userApi.createUser as any).mockRejectedValueOnce({
      response: { data: { message: "Lỗi server" } },
    });

    const { result } = renderHook(() => useCreateUserForm(), { wrapper: MemoryRouter });

    act(() => {
      result.current.setFormData({
        roleCode: "Staff",
        fullName: "Nguyen Van C",
        gender: "Male",
        dateOfBirth: "1995-01-01",
        age: 30,
        phoneNumber: "0912345678",
        address: "Đà Nẵng",
        email: "user@example.com",
        cccd: "987654321",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(toast.error).toHaveBeenCalledWith("Lỗi server");
  });
});
