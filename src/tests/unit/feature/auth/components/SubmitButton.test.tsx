// src/tests/unit/feature/auth/components/SubmitButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SubmitButton from "../../../../../features/auth/components/SubmitButton";

describe("SubmitButton (100% coverage)", () => {
  it("renders with default text and triggers onClick", () => {
    const mockClick = vi.fn();
    render(<SubmitButton onClick={mockClick} />);

    const button = screen.getByRole("button", { name: "Sign In" });

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveClass("btn-login", "gooey-btn");

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders with custom text", () => {
    render(<SubmitButton text="Login Now" />);
    const button = screen.getByRole("button", { name: "Login Now" });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("renders loading state correctly", () => {
    const mockClick = vi.fn();
    render(<SubmitButton loading text="Loading..." onClick={mockClick} />);

    const button = screen.getByRole("button", { name: "Loading..." });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.className).toContain("is-loading");

    // ensure no click called when disabled
    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });
});
