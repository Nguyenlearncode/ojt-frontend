import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useLogout } from "../../../../features/auth/hooks/useLogout";
import { logoutApi } from "../../../../features/auth/api/logoutApi";
import { useNavigate } from "react-router-dom";

// 🧩 Mock module
vi.mock("../../../../features/auth/api/logoutApi", () => ({
  logoutApi: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("useLogout", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    localStorage.clear();
  });

  it("should logout successfully and clear tokens", async () => {
    localStorage.setItem("accessToken", "a1");
    localStorage.setItem("refreshToken", "r1");
    (logoutApi as Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout({ refreshToken: "r1" });
    });

    expect(logoutApi).toHaveBeenCalledWith({ refreshToken: "r1" });
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(result.current.loading).toBe(false);
  });

  it("should handle logout failure without clearing tokens", async () => {
    localStorage.setItem("accessToken", "a1");
    localStorage.setItem("refreshToken", "r1");
    (logoutApi as Mock).mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout({ refreshToken: "r1" });
    });

    expect(localStorage.getItem("accessToken")).toBe("a1");
    expect(localStorage.getItem("refreshToken")).toBe("r1");
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });
});
