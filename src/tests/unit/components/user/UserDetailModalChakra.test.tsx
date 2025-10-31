import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, beforeEach, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import UserDetailModalChakra from "../../../../features/user/components/UserDetailModalChakra";

// 🧩 Mock framer-motion để bỏ animation
vi.mock("framer-motion", () => ({
  motion: (el: any) => el,
}));

// 🧩 Mock DeleteUserButton để không gọi logic API thật
vi.mock("../../../../features/user/components/Button/DeleteUserButton", () => ({
  __esModule: true,
  default: ({ userId, fullName }: any) => (
    <div data-testid="mock-delete-button">
      DeleteUserButton Mock - {userId} - {fullName}
    </div>
  ),
}));

// 🧩 Mock formatGender
vi.mock("../../../../utils/formatGender", () => ({
  formatGender: (gender: string) => (gender === "Male" ? "Nam" : "Nữ"),
}));

describe("🧠 UserDetailModalChakra (logic only)", () => {
  let mockUser: any;
  let mockOnClose: any;

  beforeEach(() => {
    mockOnClose = vi.fn();
    mockUser = {
      userId: "u001",
      fullName: "Nguyen Van A",
      email: "a@example.com",
      phoneNumber: "0123456789",
      dateOfBirth: "1990-01-01T00:00:00Z",
      gender: "Male",
      age: 35,
      identifyNumber: "123456789",
      address: "Hanoi, Vietnam",
      role: { roleName: "Administrator" },
    };
  });

  const renderWithProvider = () =>
    render(
      <ChakraProvider>
        <UserDetailModalChakra user={mockUser} onClose={mockOnClose} />
      </ChakraProvider>
    );

  test("🟢 hiển thị thông tin người dùng chính xác", () => {
    renderWithProvider();

    expect(screen.getByText("Nguyen Van A")).toBeInTheDocument();
    expect(screen.getByText("Administrator")).toBeInTheDocument();
    expect(screen.getByText("a@example.com")).toBeInTheDocument();
    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("Nam")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("Hanoi, Vietnam")).toBeInTheDocument();
    expect(screen.getByText(/User ID:/)).toHaveTextContent("u001");
  });

  test("🟢 gọi onClose khi bấm nút Đóng", () => {
    renderWithProvider();
    const closeBtn = screen.getByText("Đóng");
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("🟢 render DeleteUserButton mock với props đúng", () => {
    renderWithProvider();
    const deleteMock = screen.getByTestId("mock-delete-button");
    expect(deleteMock).toHaveTextContent("DeleteUserButton Mock - u001 - Nguyen Van A");
  });

  test("🟢 hiển thị ngày sinh được format (vi-VN)", () => {
    renderWithProvider();
    const dateText = new Date("1990-01-01").toLocaleDateString("vi-VN");
    expect(screen.getByText(dateText)).toBeInTheDocument();
  });
});
