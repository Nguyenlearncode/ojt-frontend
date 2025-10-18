import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmailField from "../../../../../features/auth/components/EmailField";

describe("EmailField component", () => {
  it("renders label and input correctly", () => {
    render(
      <EmailField
        value=""
        onChange={() => {}}
        label="User Email"
        placeholder="Enter your email"
      />
    );

    // Kiểm tra label hiển thị đúng
    expect(screen.getByLabelText("User Email")).toBeInTheDocument();

    // Kiểm tra input có placeholder đúng
    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
  });

  it("displays the correct value", () => {
    render(<EmailField value="test@example.com" onChange={() => {}} />);

    const input = screen.getByDisplayValue("test@example.com");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<EmailField value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new@example.com" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("has required and autocomplete attributes", () => {
    render(<EmailField value="" onChange={() => {}} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("autoComplete", "email");
  });
});
