import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useResetPassword } from "../../../../features/auth/hooks/useResetPassword";
import { authApi } from "../../../../features/auth/api/authApi";
import { toast } from "react-toastify";

vi.mock("../../../../features/auth/api/authApi", () => ({
  authApi: { resetPassword: vi.fn() },
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  useSearchParams: () => [
    new URLSearchParams("?token=testtoken"),
  ],
}));

describe("🧠 useResetPassword", () => {
  beforeEach(() => vi.clearAllMocks());

  it("🟢 hiển thị lỗi khi mật khẩu không khớp", async () => {
    const { result } = renderHook(() => useResetPassword());
    act(() => {
      result.current.handlePasswordChange({ target: { value: "123456" } } as any);
      result.current.handleConfirmPasswordChange({ target: { value: "654321" } } as any);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("Passwords do not match");
  });

  it("🟢 gọi API thành công", async () => {
    (authApi.resetPassword as any).mockResolvedValue({});
    const { result } = renderHook(() => useResetPassword());
    act(() => {
      result.current.handlePasswordChange({ target: { value: "newpass" } } as any);
      result.current.handleConfirmPasswordChange({ target: { value: "newpass" } } as any);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(authApi.resetPassword).toHaveBeenCalledWith({
        token: "testtoken",
        newPassword: "newpass",
      });
      expect(toast.success).toHaveBeenCalledWith("Password has been reset successfully!");
    });
  });

  it("🟢 xử lý lỗi khi API thất bại", async () => {
    (authApi.resetPassword as any).mockRejectedValue({
      response: { data: { message: "Token invalid" } },
    });
    const { result } = renderHook(() => useResetPassword());

    act(() => {
      result.current.handlePasswordChange({ target: { value: "newpass" } } as any);
      result.current.handleConfirmPasswordChange({ target: { value: "newpass" } } as any);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("Token invalid");
    expect(toast.error).toHaveBeenCalledWith("Token invalid");
  });
});
