// src/tests/integration/feature/auth/pages/LoginPage.integration.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginPage from "../../../../../features/auth/pages/LoginPage";

describe("LoginPage (integration)", () => {
  it("logs in successfully via UI", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(localStorage.getItem("accessToken")).toBe("fake_access_token")
    );

    expect(alertSpy).toHaveBeenCalledWith("✅ Login successful!");
    alertSpy.mockRestore();
  });

  it("shows error message for invalid credentials", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    );
  });
});
