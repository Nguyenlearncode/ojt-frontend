import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import SubmitButton from "../../../../../features/auth/components/SubmitButton";
import { ParticleContext } from "../../../../../features/auth/contexts/ParticleContext";

describe("SubmitButton", () => {
  const mockTriggerGather = vi.fn();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ParticleContext.Provider value={{ triggerGather: mockTriggerGather }}>
      {children}
    </ParticleContext.Provider>
  );

  it("renders with default text", () => {
    render(<SubmitButton loading={false} />, { wrapper: Wrapper });
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("shows loading state when loading=true", () => {
    render(<SubmitButton loading={true} />, { wrapper: Wrapper });
    const btn = screen.getByRole("button", { name: "Signing in..." });
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("is-loading");
  });

  it("calls triggerGather when clicked", () => {
    render(<SubmitButton loading={false} />, { wrapper: Wrapper });
    const button = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(button);
    expect(mockTriggerGather).toHaveBeenCalled();
  });

  it("updates CSS variables on mouse move", () => {
    render(<SubmitButton loading={false} />, { wrapper: Wrapper });
    const button = screen.getByRole("button", { name: "Sign In" });

    fireEvent.mouseMove(button, { clientX: 30, clientY: 30 });

    const style = getComputedStyle(button);
    expect(style.getPropertyValue("--x")).not.toBe("");
    expect(style.getPropertyValue("--y")).not.toBe("");
  });
});
