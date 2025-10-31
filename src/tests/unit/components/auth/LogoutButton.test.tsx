import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import LogoutButton from "../../../../features/auth/components/LogoutButton";

// Mock useLogout hook
vi.mock("../../../../features/auth/hooks/useLogout", () => ({
  useLogout: vi.fn(),
}));
import { useLogout } from "../../../../features/auth/hooks/useLogout";

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("LogoutButton", () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("refreshToken", "refresh-123");
    (useLogout as unknown as Mock).mockReturnValue({
      logout: mockLogout,
      loading: false,
    });
  });

  it("renders correctly when expanded = true", () => {
    renderWithChakra(<LogoutButton expanded={true} />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("renders correctly when expanded = false", () => {
    renderWithChakra(<LogoutButton expanded={false} />);
    expect(screen.getByLabelText("logout-button")).toBeInTheDocument();
  });

  it("calls logout with refreshToken on click", async () => {
    renderWithChakra(<LogoutButton expanded={true} />);

    const button = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledWith({ refreshToken: "refresh-123" });
    });
  });

  it("handles logout error gracefully", async () => {
    (useLogout as unknown as Mock).mockReturnValueOnce({
      logout: vi.fn().mockRejectedValue(new Error("Logout failed")),
      loading: false,
    });

    renderWithChakra(<LogoutButton expanded={true} />);
    const button = screen.getByRole("button", { name: /logout/i });
    await fireEvent.click(button);

    // không crash UI (nếu không throw là pass)
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("shows loading state when logout is in progress", () => {
    (useLogout as unknown as Mock).mockReturnValueOnce({
      logout: vi.fn(),
      loading: true,
    });

    renderWithChakra(<LogoutButton expanded={true} />);
    expect(screen.getByRole("button")).toHaveAttribute("data-loading");
  });
});
