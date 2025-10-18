// src/tests/integration/feature/auth/hooks/useLogin.integration.test.ts
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLogin } from "../../../../../features/auth/hooks/useLogin";

describe("useLogin (integration)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("logs in successfully and stores tokens", async () => {
    const { result } = renderHook(() => useLogin());

    // Set form data
    act(() => {
      result.current.handleChange({
        target: { id: "email", value: "test@example.com" },
      } as any);
      result.current.handleChange({
        target: { id: "password", value: "123456" },
      } as any);
    });

    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(localStorage.getItem("accessToken")).toBe("fake_access_token");
    expect(localStorage.getItem("refreshToken")).toBe("fake_refresh_token");
    expect(result.current.error).toBe("");

    alertSpy.mockRestore();
  });

  it("shows error on invalid credentials", async () => {
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
  });
});
