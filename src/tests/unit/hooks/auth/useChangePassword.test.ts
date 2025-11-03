import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useChangePassword } from "../../../../features/auth/hooks/useChangePassword";
import { authApi } from "../../../../features/auth/api/authApi";
import { toast } from "react-toastify";

vi.mock("../../../../features/auth/api/authApi", () => ({
  authApi: { changePassword: vi.fn() },
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("🧠 useChangePassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("🟢 hiển thị lỗi khi để trống các trường", async () => {
    const { result } = renderHook(() => useChangePassword());
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });
    expect(result.current.error).toBe("Please fill in all fields");
  });

  it("🟢 hiển thị lỗi khi mật khẩu không khớp", async () => {
    const { result } = renderHook(() => useChangePassword());
    act(() => {
      result.current.handleCurrentPasswordChange({ target: { value: "old" } } as any);
      result.current.handleNewPasswordChange({ target: { value: "new1" } } as any);
      result.current.handleConfirmPasswordChange({ target: { value: "new2" } } as any);
    });
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });
    expect(result.current.error).toBe("New passwords do not match");
  });

  it("🟢 gọi API thành công và reset form", async () => {
    (authApi.changePassword as any).mockResolvedValue({});
    const { result } = renderHook(() => useChangePassword());

    act(() => {
      result.current.handleCurrentPasswordChange({ target: { value: "old" } } as any);
      result.current.handleNewPasswordChange({ target: { value: "newpass" } } as any);
      result.current.handleConfirmPasswordChange({ target: { value: "newpass" } } as any);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(authApi.changePassword).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Password changed successfully!");
      expect(result.current.currentPassword).toBe("");
    });
  });

  it("🟢 xử lý lỗi từ API thất bại", async () => {
    (authApi.changePassword as any).mockRejectedValue({
      response: { data: { message: "API error" } },
    });

    const { result } = renderHook(() => useChangePassword());
    act(() => {
      result.current.handleCurrentPasswordChange({ target: { value: "old" } } as any);
      result.current.handleNewPasswordChange({ target: { value: "newpass" } } as any);
      result.current.handleConfirmPasswordChange({ target: { value: "newpass" } } as any);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("API error");
    expect(toast.error).toHaveBeenCalledWith("API error");
  });
});
