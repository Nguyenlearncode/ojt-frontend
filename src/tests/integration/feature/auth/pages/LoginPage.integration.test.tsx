// src/tests/integration/feature/auth/pages/LoginPage.integration.test.tsx
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithRouter } from "../../../../setup/testUtils";
import { authApi } from "../../../../../features/auth/api/authApi";
import LoginPage from "../../../../../features/auth/pages/LoginPage";

// ✅ Mock navigate phải được định nghĩa TRƯỚC khi mock react-router-dom
const mockNavigate = vi.fn();

// ✅ Mock react-router-dom TRƯỚC khi component được import
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ✅ Mock API
vi.mock("../../../../../features/auth/api/authApi", () => ({
  authApi: { login: vi.fn() },
}));

describe("LoginPage (integration)", () => {
  const mockLogin = authApi.login as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("logs in successfully via UI", async () => {
    mockLogin.mockResolvedValueOnce({
      accessToken: "access-999",
      refreshToken: "refresh-999",
    });

    renderWithRouter(<LoginPage />);

    // Nhập dữ liệu
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    // ✅ Click nút 'Sign In' thay vì 'Login'
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "123456",
      });
      expect(localStorage.getItem("accessToken")).toBe("access-999");
      expect(localStorage.getItem("refreshToken")).toBe("refresh-999");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows error message for invalid credentials", async () => {
    mockLogin.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });

    // ✅ Click nút 'Sign In' 
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
