import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useLogin } from "../../../../features/auth/hooks/useLogin";
import { authApi } from "../../../../features/auth/api/authApi";
import { useNavigate } from "react-router-dom";

// 🧩 Mock module
vi.mock("../../../../features/auth/api/authApi", () => ({
  authApi: {
    login: vi.fn(),
  },
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("useLogin", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    localStorage.clear();
  });

  it("should update formData when handleChange is called", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.handleChange({
        target: { id: "email", value: "test@mail.com" },
      } as any);
    });

    expect(result.current.formData.email).toBe("test@mail.com");
  });

  it("should login successfully and navigate to /dashboard", async () => {
    (authApi.login as Mock).mockResolvedValueOnce({
      accessToken: "access-123",
      refreshToken: "refresh-123",
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(localStorage.getItem("accessToken")).toBe("access-123");
    expect(localStorage.getItem("refreshToken")).toBe("refresh-123");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should handle login failure and set error", async () => {
    (authApi.login as Mock).mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(result.current.error).toBe("Invalid credentials");
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(localStorage.getItem("accessToken")).toBeNull();
  });

  it("should set default error message when error has no response", async () => {
    (authApi.login as Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(result.current.error).toBe("Invalid email or password");
  });
});
