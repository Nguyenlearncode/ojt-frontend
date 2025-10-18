import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useLogin } from "../../../../../features/auth/hooks/useLogin";
import { authApi } from "../../../../../features/auth/api/authApi";

// 🧩 Mock module authApi
vi.mock("../../../../../features/auth/api/authApi", () => ({
  authApi: {
    login: vi.fn(),
  },
}));

describe("useLogin hook (unit)", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (authApi.login as unknown as Mock).mockImplementation(mockLogin);
    localStorage.clear();
  });

  it("initializes with correct default state", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.formData).toEqual({ email: "", password: "" });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("updates formData correctly on handleChange", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.handleChange({
        target: { id: "email", value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.email).toBe("test@example.com");

    act(() => {
      result.current.handleChange({
        target: { id: "password", value: "123456" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.password).toBe("123456");
  });

  it("calls authApi.login and saves tokens on success", async () => {
    mockLogin.mockResolvedValueOnce({
      accessToken: "access-123",
      refreshToken: "refresh-456",
    });

    const { result } = renderHook(() => useLogin());

    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockLogin).toHaveBeenCalledWith({ email: "", password: "" });
    expect(localStorage.getItem("accessToken")).toBe("access-123");
    expect(localStorage.getItem("refreshToken")).toBe("refresh-456");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");

    alertSpy.mockRestore();
  });

  it("sets error message on failed login", async () => {
    mockLogin.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe("Invalid credentials");
    expect(result.current.loading).toBe(false);
  });

  it("sets default error message if error has no response", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(result.current.error).toBe("Invalid email or password");
  });
});
