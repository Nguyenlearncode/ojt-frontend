import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useForgotPassword } from "../../../../features/auth/hooks/useForgotPassword";
import { authApi } from "../../../../features/auth/api/authApi";
import { toast } from "react-toastify";

vi.mock("../../../../features/auth/api/authApi", () => ({
  authApi: { forgotPassword: vi.fn() },
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("🧠 useForgotPassword", () => {
  beforeEach(() => vi.clearAllMocks());

  it("🟢 hiển thị lỗi khi không nhập email", async () => {
    const { result } = renderHook(() => useForgotPassword());
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });
    expect(result.current.error).toBe("Please enter your email address");
  });

  it("🟢 gọi API thành công", async () => {
    (authApi.forgotPassword as any).mockResolvedValue({});
    const { result } = renderHook(() => useForgotPassword());

    act(() => result.current.handleChange({ target: { value: "test@mail.com" } } as any));
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(authApi.forgotPassword).toHaveBeenCalledWith({ email: "test@mail.com" });
      expect(toast.success).toHaveBeenCalledWith(
        "Password reset link has been sent to your email!"
      );
    });
  });

  it("🟢 xử lý lỗi khi API thất bại", async () => {
    (authApi.forgotPassword as any).mockRejectedValue({
      response: { data: { message: "Email not found" } },
    });
    const { result } = renderHook(() => useForgotPassword());

    act(() => result.current.handleChange({ target: { value: "x@mail.com" } } as any));
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("Email not found");
    expect(toast.error).toHaveBeenCalledWith("Email not found");
  });
});
