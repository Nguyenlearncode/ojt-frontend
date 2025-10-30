import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { ChakraProvider } from "@chakra-ui/react"; // ✅ Thêm provider để tránh lỗi theme
import LoginPageChakra from "../../features/auth/pages/LoginPageChakra";

// 🧩 Mock các component phụ để chỉ test logic (không test style / animation)
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

vi.mock("../../features/auth/components/backgrounds/CityParticlesBackground", () => ({
  default: () => <div data-testid="mock-background" />,
}));

// 🧠 Mock useLogin hook để kiểm tra logic form
vi.mock("../../features/auth/hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));
import { useLogin } from "../../features/auth/hooks/useLogin";

// ✅ Helper render với ChakraProvider
const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("LoginPageChakra (Integration)", () => {
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

  it("renders email and password inputs", () => {
    renderWithChakra(<LoginPageChakra />);
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
  });

  it("calls handleChange when typing in email and password", () => {
    renderWithChakra(<LoginPageChakra />);
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  it("calls handleSubmit when clicking Login button", async () => {
    renderWithChakra(<LoginPageChakra />);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.click(button);
    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalledTimes(1));
  });

  it("shows error alert when useLogin returns error", () => {
    (useLogin as unknown as Mock).mockReturnValueOnce({
      formData: { email: "test@mail.com", password: "123" },
      loading: false,
      error: "Invalid credentials",
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    renderWithChakra(<LoginPageChakra />);
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("shows loading state when loading is true", () => {
    (useLogin as unknown as Mock).mockReturnValueOnce({
      formData: { email: "", password: "" },
      loading: true,
      error: null,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    renderWithChakra(<LoginPageChakra />);
    const button = screen.getByRole("button", { name: /logging in/i });
    expect(button).toBeDisabled();
  });
});
