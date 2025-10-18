import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLogin } from "../../../../../features/auth/hooks/useLogin";
import { authApi } from "../../../../../features/auth/api/authApi";

// 🧩 Mock react-router-dom để kiểm tra navigate()
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useLogin (integration)", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("logs in successfully and stores tokens then navigates", async () => {
    // Giả lập API thật bằng spy (không mock module)
    vi.spyOn(authApi, "login").mockResolvedValueOnce({
      accessToken: "fake_access_token",
      refreshToken: "fake_refresh_token",
    });

    const { result } = renderHook(() => useLogin());

    // Điền form
    act(() => {
      result.current.handleChange({
        target: { id: "email", value: "test@example.com" },
      } as any);
      result.current.handleChange({
        target: { id: "password", value: "123456" },
      } as any);
    });

    // Submit form
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    // ✅ Kiểm tra kết quả
    expect(localStorage.getItem("accessToken")).toBe("fake_access_token");
    expect(localStorage.getItem("refreshToken")).toBe("fake_refresh_token");
    expect(result.current.error).toBe("");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("shows error on invalid credentials", async () => {
    vi.spyOn(authApi, "login").mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.handleChange({
        target: { id: "email", value: "wrong@example.com" },
      } as any);
      result.current.handleChange({
        target: { id: "password", value: "wrongpass" },
      } as any);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("Invalid credentials");
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
