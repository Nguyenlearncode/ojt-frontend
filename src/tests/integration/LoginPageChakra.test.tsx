import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom"; // ✅ Thêm Router để Link hoạt động
import LoginPageChakra from "../../features/auth/pages/LoginPageChakra";

// 🧩 Mock framer-motion để tránh animation
vi.mock("framer-motion", () => ({
  motion: (el: any) => el,
}));

// 🧩 Mock LogoAnimation để tránh lỗi lottie-web
vi.mock("../../features/auth/components/LogoAnimation", () => ({
  default: () => <div data-testid="mock-logo-animation" />,
}));

// 🧩 Mock EmailField
vi.mock("../../features/auth/components/EmailField", () => ({
  default: ({ value, onChange }: any) => (
    <input
      aria-label="email"
      value={value}
      onChange={(e) => onChange(e)}
      name="email"
    />
  ),
}));

// 🧩 Mock PasswordField
vi.mock("../../features/auth/components/PasswordField", () => ({
  default: ({ value, onChange }: any) => (
    <input
      aria-label="password"
      value={value}
      onChange={(e) => onChange(e)}
      name="password"
      type="password"
    />
  ),
}));

// 🧩 Mock CityParticlesBackground
vi.mock("../../features/auth/components/backgrounds/CityParticlesBackground", () => ({
  default: () => <div data-testid="mock-background" />,
}));

// 🧩 Mock useLogin hook
vi.mock("../../features/auth/hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));
import { useLogin } from "../../features/auth/hooks/useLogin";

// ✅ Helper render với ChakraProvider + MemoryRouter
const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <MemoryRouter>
      <ChakraProvider>{ui}</ChakraProvider>
    </MemoryRouter>
  );

describe("🧠 LoginPageChakra (Integration)", () => {
  const mockHandleChange = vi.fn();
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());

  beforeEach(() => {
    vi.clearAllMocks();
    (useLogin as unknown as Mock).mockReturnValue({
      formData: { email: "", password: "" },
      loading: false,
      error: null,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });
  });

  it("🟢 render email và password input", () => {
    renderWithProviders(<LoginPageChakra />);
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
  });

  it("🟢 gọi handleChange khi nhập email & password", () => {
    renderWithProviders(<LoginPageChakra />);
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  it("🟢 gọi handleSubmit khi bấm nút Login", async () => {
    renderWithProviders(<LoginPageChakra />);
    const button = screen.getByRole("button", { name: /^login$/i });

    fireEvent.click(button);
    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalledTimes(1));
  });

  it("🟢 hiển thị thông báo lỗi khi useLogin trả về error", () => {
    (useLogin as unknown as Mock).mockReturnValueOnce({
      formData: { email: "test@mail.com", password: "123" },
      loading: false,
      error: "Invalid credentials",
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    renderWithProviders(<LoginPageChakra />);
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("🟢 hiển thị trạng thái loading khi loading = true", () => {
    (useLogin as unknown as Mock).mockReturnValueOnce({
      formData: { email: "", password: "" },
      loading: true,
      error: null,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    renderWithProviders(<LoginPageChakra />);
    const button = screen.getByRole("button", { name: /logging in/i });
    expect(button).toBeDisabled();
  });
});
