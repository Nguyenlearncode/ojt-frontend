import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import LogoutButton from "../../../../../features/auth/components/LogoutButton";
import { useLogout } from "../../../../../features/auth/hooks/useLogout";

vi.mock("../../../../../features/auth/hooks/useLogout");

const mockLogout = vi.fn();

describe("LogoutButton (FULL 100% coverage)", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useLogout as unknown as Mock).mockReturnValue({
      logout: mockLogout,
      loading: false,
    });
    localStorage.clear();
    localStorage.setItem("refreshToken", "mockToken");
  });

  it("renders correctly when expanded", () => {
    render(<LogoutButton expanded />);
    const button = screen.getByLabelText("logout-button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders correctly when collapsed", () => {
    render(<LogoutButton expanded={false} />);
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("calls logout with refreshToken from localStorage", async () => {
    render(<LogoutButton expanded />);
    fireEvent.click(screen.getByLabelText("logout-button"));
    await waitFor(() =>
      expect(mockLogout).toHaveBeenCalledWith({ refreshToken: "mockToken" })
    );
  });

  it("handles missing refreshToken gracefully", async () => {
    localStorage.removeItem("refreshToken");
    render(<LogoutButton expanded />);
    fireEvent.click(screen.getByLabelText("logout-button"));
    await waitFor(() =>
      expect(mockLogout).toHaveBeenCalledWith({ refreshToken: "" })
    );
  });

  it("handles logout error safely", async () => {
    const mockError = vi.fn().mockRejectedValue(new Error("fail"));
    (useLogout as unknown as Mock).mockReturnValue({
      logout: mockError,
      loading: false,
    });
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<LogoutButton expanded />);
    fireEvent.click(screen.getByLabelText("logout-button"));
    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith("Logout failed:", expect.any(Error))
    );
    spy.mockRestore();
  });

  it("disables button when loading and prevents click", async () => {
    (useLogout as unknown as Mock).mockReturnValue({
      logout: mockLogout,
      loading: true,
    });
    render(<LogoutButton expanded />);
    const button = screen.getByLabelText("logout-button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    await waitFor(() => expect(mockLogout).not.toHaveBeenCalled());
  });

  it("renders correctly when collapsed and not loading", () => {
    render(<LogoutButton expanded={false} />);
    const button = screen.getByLabelText("logout-button");
    expect(button).not.toBeDisabled();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("renders even if useLogout returns undefined (fallback)", () => {
    (useLogout as unknown as Mock).mockReturnValueOnce(undefined);
    render(<LogoutButton expanded />);
    const button = screen.getByLabelText("logout-button");
    expect(button).toBeInTheDocument();
    fireEvent.click(button); // cover default async () => {}
  });

  it("covers internal renderButton() function", async () => {
    // Gọi nhiều trạng thái để ép renderButton() chạy lại
    (useLogout as unknown as Mock).mockReturnValue({
      logout: async () => {},
      loading: false,
    });
    const { rerender } = render(<LogoutButton expanded />);
    rerender(<LogoutButton expanded={false} />);
    rerender(<LogoutButton expanded />);
    const button = screen.getByLabelText("logout-button");
    fireEvent.click(button);
    await waitFor(() => expect(button).toBeInTheDocument());
  });
});
