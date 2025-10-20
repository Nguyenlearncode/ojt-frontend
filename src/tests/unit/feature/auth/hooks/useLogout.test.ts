import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as logoutApiModule from "../../../../../features/auth/api/logoutApi";
import { useLogout } from "../../../../../features/auth/hooks/useLogout";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();

// ✅ Mock react-router-dom để kiểm soát navigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("useLogout Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {}); // Ngăn console.log lỗi trong test
  });

  it("calls logoutApi, clears tokens, and navigates (success path)", async () => {
    // Mock API trả về thành công
    vi.spyOn(logoutApiModule, "logoutApi").mockResolvedValueOnce(undefined);

    // Giả lập token trước khi logout
    localStorage.setItem("accessToken", "abc");
    localStorage.setItem("refreshToken", "def");

    const { result } = renderHook(() => useLogout(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.logout({ refreshToken: "def" });
    });

    // ✅ Sau khi logout thành công
    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("does NOT clear tokens or navigate when logoutApi fails (error path)", async () => {
    // Mock API thất bại
    vi.spyOn(logoutApiModule, "logoutApi").mockRejectedValueOnce(new Error("fail"));

    localStorage.setItem("accessToken", "aaa");
    localStorage.setItem("refreshToken", "bbb");

    const { result } = renderHook(() => useLogout(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.logout({ refreshToken: "bbb" });
    });

    // ✅ Token vẫn còn
    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem("accessToken")).toBe("aaa");
    expect(localStorage.getItem("refreshToken")).toBe("bbb");
    // ✅ Không điều hướng khi lỗi
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("toggles loading state correctly", async () => {
    // Mock API với độ trễ nhỏ
    vi.spyOn(logoutApiModule, "logoutApi").mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 10))
    );

    const { result } = renderHook(() => useLogout(), { wrapper: MemoryRouter });

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.logout({ refreshToken: "zzz" });
    });

    // ✅ Kết thúc -> loading trở lại false
    expect(result.current.loading).toBe(false);
  });
});
