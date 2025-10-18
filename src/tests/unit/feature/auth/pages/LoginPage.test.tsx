import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import LoginPage from "../../../../../features/auth/pages/LoginPage";
import { useLogin } from "../../../../../features/auth/hooks/useLogin";

// 🧩 Mock các components con
vi.mock("../../../../../features/auth/components/EmailField", () => ({
  default: ({ value, onChange }: any) => (
    <input data-testid="email-input" value={value} onChange={onChange} placeholder="Email" />
  ),
}));

vi.mock("../../../../../features/auth/components/PasswordField", () => ({
  default: ({ value, onChange }: any) => (
    <input
      data-testid="password-input"
      value={value}
      onChange={onChange}
      placeholder="Password"
      type="password"
    />
  ),
}));

vi.mock("../../../../../features/auth/components/SubmitButton", () => ({
  default: ({ loading }: any) => (
    <button data-testid="submit-button" disabled={loading}>
      {loading ? "Loading..." : "Login"}
    </button>
  ),
}));

vi.mock("../../../../../features/auth/components/backgrounds/CityParticlesBackground", () => ({
  default: React.forwardRef(() => <div data-testid="mock-bg" />),
}));

// 🧩 Mock useLogin
const mockHandleChange = vi.fn();
const mockHandleSubmit = vi.fn((e) => e.preventDefault());
const mockUseLogin = {
  formData: { email: "", password: "" },
  loading: false,
  error: "",
  handleChange: mockHandleChange,
  handleSubmit: mockHandleSubmit,
};

vi.mock("../../../../../features/auth/hooks/useLogin", () => ({
  useLogin: vi.fn(() => mockUseLogin),
}));

describe("LoginPage (unit test)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login page correctly", () => {
    render(<LoginPage />);
    expect(screen.getByText("Laboratory Management")).toBeInTheDocument();
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  it("calls handleChange when typing", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@gmail.com" } });
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: "123456" } });
    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  it("calls handleSubmit when clicking submit", async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalledTimes(1));
  });

  it("shows error message when error exists", () => {
    (useLogin as unknown as Mock).mockReturnValueOnce({
      ...mockUseLogin,
      error: "Invalid credentials",
    });
    render(<LoginPage />);
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("disables submit button when loading", () => {
    (useLogin as unknown as Mock).mockReturnValueOnce({
      ...mockUseLogin,
      loading: true,
    });
    render(<LoginPage />);
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });
});
