import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, beforeEach, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { UserTableChakra } from "../../../../features/user/components/UserTableChakra";

// 🧩 Mock framer-motion (bỏ animation)
vi.mock("framer-motion", () => ({
  motion: (c: any) => c,
}));

// 🧩 Mock các icon
vi.mock("react-icons/fi", () => ({
  FiMail: () => <div data-testid="mail" />,
  FiPhone: () => <div data-testid="phone" />,
  FiEye: () => <div data-testid="eye" />,
  FiEdit2: () => <div data-testid="edit" />,
}));

// 🧩 Mock formatGender
vi.mock("../../../../utils/genderUtils", () => ({
  formatGender: (g: string) => (g === "Male" ? "Nam" : "Nữ"),
}));

// 🧩 Mock UserDetailModalChakra
vi.mock("../../../../features/user/components/UserDetailModalChakra", () => ({
  __esModule: true,
  default: ({ user, onClose }: any) => (
    <div data-testid="mock-user-modal">
      MockModal - {user?.fullName}
      <button onClick={onClose}>CloseModal</button>
    </div>
  ),
}));

// 🧩 Mock UserStatusToggleButton
vi.mock("../../../../features/user/components/Button/UserStatusToggleButton", () => ({
  __esModule: true,
  UserStatusToggleButton: ({ userId, fullName }: any) => (
    <div data-testid="mock-status-button">
      StatusButton - {userId} - {fullName}
    </div>
  ),
}));

describe("🧠 UserTableChakra (logic only)", () => {
  let mockUsers: any[];
  let mockOnEdit: any;

  beforeEach(() => {
    mockUsers = [
      {
        userId: "u1",
        fullName: "Nguyen Van A",
        email: "a@example.com",
        phoneNumber: "0123456789",
        gender: "Male",
        role: { roleName: "Admin" },
        isActive: true,
      },
      {
        userId: "u2",
        fullName: "Tran Thi B",
        email: "b@example.com",
        phoneNumber: "",
        gender: "Female",
        role: { roleName: "Staff" },
        isActive: false,
      },
    ];
    mockOnEdit = vi.fn();
  });

  const renderWithProvider = (props?: any) =>
    render(
      <ChakraProvider>
        <UserTableChakra users={mockUsers} {...props} />
      </ChakraProvider>
    );

  test("🟢 hiển thị danh sách người dùng", () => {
    renderWithProvider();

    expect(screen.getByText("Nguyen Van A")).toBeInTheDocument();
    expect(screen.getByText("Tran Thi B")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-status-button")).toHaveLength(2);
  });

  test("🟢 hiển thị component 'Không tìm thấy người dùng' khi danh sách rỗng", () => {
    render(
      <ChakraProvider>
        <UserTableChakra users={[]} />
      </ChakraProvider>
    );

    expect(screen.getByText("Không tìm thấy người dùng")).toBeInTheDocument();
    expect(
      screen.getByText("Thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn")
    ).toBeInTheDocument();
  });

  test("🟢 click icon View details → hiển thị UserDetailModal", () => {
    renderWithProvider();

    const viewBtns = screen.getAllByRole("button", { name: "View details" });
    fireEvent.click(viewBtns[0]);

    expect(screen.getByTestId("mock-user-modal")).toHaveTextContent("Nguyen Van A");
  });

  test("🟢 click CloseModal → ẩn UserDetailModal", () => {
    renderWithProvider();

    const viewBtns = screen.getAllByRole("button", { name: "View details" });
    fireEvent.click(viewBtns[0]); // mở modal
    const closeBtn = screen.getByText("CloseModal");
    fireEvent.click(closeBtn);

    // modal bị đóng → không còn xuất hiện
    expect(screen.queryByTestId("mock-user-modal")).not.toBeInTheDocument();
  });

  test("🟢 click Edit user → gọi onEdit callback", () => {
    renderWithProvider({ onEdit: mockOnEdit });

    const editBtns = screen.getAllByRole("button", { name: "Edit user" });
    fireEvent.click(editBtns[1]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[1]);
  });

  test("🟢 render đúng role, gender, email, phone", () => {
    renderWithProvider();

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Staff")).toBeInTheDocument();
    expect(screen.getByText("Nam")).toBeInTheDocument();
    expect(screen.getByText("Nữ")).toBeInTheDocument();
    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("a@example.com")).toBeInTheDocument();
  });
});
