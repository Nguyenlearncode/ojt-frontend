import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import PasswordField from "../../../../features/auth/components/PasswordField";

// 🧩 Mock EyeLottie để tránh lỗi lottie-web (canvas context)
vi.mock("../../../../features/auth/components/EyeLottie", () => ({
  default: () => <div data-testid="mock-eye-lottie" />,
}));

// ✅ Helper render với ChakraProvider
const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("🔒 PasswordField (Logic Only)", () => {
  it("🟢 render input element", () => {
    renderWithChakra(
      <PasswordField
        value=""
        onChange={() => {}}
        showPassword={false}
        onTogglePassword={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(/enter your password/i);
    expect(input).toBeInTheDocument();
  });

  it("🟢 gọi onChange khi nhập mật khẩu", () => {
    const handleChange = vi.fn();
    renderWithChakra(
      <PasswordField
        value=""
        onChange={handleChange}
        showPassword={false}
        onTogglePassword={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(/enter your password/i);
    fireEvent.change(input, { target: { value: "123456" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("🟢 gọi onTogglePassword khi bấm nút toggle", () => {
    const onTogglePassword = vi.fn();
    renderWithChakra(
      <PasswordField
        value="secret"
        onChange={() => {}}
        showPassword={false}
        onTogglePassword={onTogglePassword}
      />
    );
    const button = screen.getByRole("button", {
      name: /show password/i,
    });
    fireEvent.click(button);

    expect(onTogglePassword).toHaveBeenCalledTimes(1);
  });

  it("🟢 hiển thị đúng aria-label khi showPassword = true", () => {
    renderWithChakra(
      <PasswordField
        value="abc"
        onChange={() => {}}
        showPassword={true}
        onTogglePassword={() => {}}
      />
    );
    const button = screen.getByRole("button", {
      name: /hide password/i,
    });
    expect(button).toBeInTheDocument();
  });
});
