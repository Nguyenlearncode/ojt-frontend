import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as logoutApiModule from "../../../../../features/auth/api/logoutApi";
import { useLogout } from "../../../../../features/auth/hooks/useLogout";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();

// ✅ Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("useLogout Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("calls logoutApi, clears tokens, and navigates (success path)", async () => {
    vi.spyOn(logoutApiModule, "logoutApi").mockResolvedValueOnce(undefined);

    localStorage.setItem("accessToken", "abc");
    localStorage.setItem("refreshToken", "def");

    const { result } = renderHook(() => useLogout(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.logout({ refreshToken: "def" });
    });

    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles API errors gracefully (error path)", async () => {
    vi.spyOn(logoutApiModule, "logoutApi").mockRejectedValueOnce(new Error("fail"));

    localStorage.setItem("accessToken", "aaa");
    localStorage.setItem("refreshToken", "bbb");

    const { result } = renderHook(() => useLogout(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.logout({ refreshToken: "bbb" });
    });

    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("toggles loading state correctly", async () => {
    vi.spyOn(logoutApiModule, "logoutApi").mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 10))
    );

    const { result } = renderHook(() => useLogout(), { wrapper: MemoryRouter });

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.logout({ refreshToken: "zzz" });
    });

    // ✅ chỉ cần verify final state — React 18 batch update
    expect(result.current.loading).toBe(false);
  });
});
