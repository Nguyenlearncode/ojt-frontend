// src/tests/unit/feature/auth/components/EmailField.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmailField from "../../../../../features/auth/components/EmailField";

describe("EmailField component", () => {
  it("renders label and input correctly with custom props", () => {
    render(
      <EmailField
        id="userEmail"
        label="User Email"
        placeholder="Enter your email"
        value=""
        onChange={() => {}}
      />
    );

    const label = screen.getByLabelText("User Email");
    expect(label).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "userEmail");
    expect(input).toHaveAttribute("type", "email");
  });

  it("renders with default props when none are provided", () => {
    render(<EmailField value="" onChange={() => {}} />);

    const label = screen.getByLabelText("Email Address");
    expect(label).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toHaveAttribute("name", "email");
  });

  it("displays the correct input value", () => {
    render(<EmailField value="test@example.com" onChange={() => {}} />);
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
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

