// src/tests/unit/feature/auth/components/PasswordField.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import PasswordField from "../../../../../features/auth/components/PasswordField";
import { ParticleContext } from "../../../../../features/auth/contexts/ParticleContext";

describe("PasswordField (UI preserved, 100%)", () => {
  const mockTriggerGather = vi.fn();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ParticleContext.Provider value={{ triggerGather: mockTriggerGather }}>
      {children}
    </ParticleContext.Provider>
  );

  it("renders correctly with label and placeholder", () => {
    render(<PasswordField value="" onChange={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<PasswordField value="" onChange={handleChange} />, { wrapper: Wrapper });
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "secret" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("toggles password visibility and triggers context", () => {
    render(<PasswordField value="123" onChange={() => {}} />, { wrapper: Wrapper });
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleBtn = screen.getByRole("button", { name: "Show password" });

    expect(input.type).toBe("password");

    fireEvent.click(toggleBtn);
    expect(input.type).toBe("text");
    expect(mockTriggerGather).toHaveBeenCalledWith(50, 50);

    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input.type).toBe("password");
  });

  it("works safely without context", () => {
    render(<PasswordField value="" onChange={() => {}} />);
    const toggleBtn = screen.getByRole("button", { name: "Show password" });
    expect(() => fireEvent.click(toggleBtn)).not.toThrow();
  });
});
