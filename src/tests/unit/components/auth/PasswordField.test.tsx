import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import PasswordField from "../../../../features/auth/components/PasswordField";

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("PasswordField (Logic Only)", () => {
  it("renders input element", () => {
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

  it("calls onChange when typing", () => {
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

  it("calls onTogglePassword when clicking toggle button", () => {
    const onTogglePassword = vi.fn();
    renderWithChakra(
      <PasswordField
        value="secret"
        onChange={() => {}}
        showPassword={false}
        onTogglePassword={onTogglePassword}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onTogglePassword).toHaveBeenCalledTimes(1);
  });
});
