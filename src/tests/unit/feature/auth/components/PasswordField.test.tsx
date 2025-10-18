import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import PasswordField from "../../../../../features/auth/components/PasswordField";
import { ParticleContext } from "../../../../../features/auth/contexts/ParticleContext";

describe("PasswordField", () => {
  const mockTriggerGather = vi.fn();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ParticleContext.Provider value={{ triggerGather: mockTriggerGather }}>
      {children}
    </ParticleContext.Provider>
  );

  it("renders label and input correctly", () => {
    render(<PasswordField value="" onChange={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  it("toggles password visibility when clicking the icon", () => {
    render(<PasswordField value="abc" onChange={() => {}} />, { wrapper: Wrapper });

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleBtn = screen.getByRole("button", { name: "Show password" });

    expect(input.type).toBe("password");

    fireEvent.click(toggleBtn);
    expect(input.type).toBe("text");

    fireEvent.click(toggleBtn);
    expect(input.type).toBe("password");
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<PasswordField value="" onChange={handleChange} />, { wrapper: Wrapper });
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "secret" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("triggers context function when toggling", () => {
    render(<PasswordField value="123" onChange={() => {}} />, { wrapper: Wrapper });
    const toggleBtn = screen.getByRole("button", { name: "Show password" });
    fireEvent.click(toggleBtn);
    expect(mockTriggerGather).toHaveBeenCalled();
  });
});
