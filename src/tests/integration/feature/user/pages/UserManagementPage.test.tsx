import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import UserManagementPage from "../../../../../features/user/pages/UserManagementPage";
import * as useUsersHook from "../../../../../features/user/hooks/useUsers";
import type { User } from "../../../../../features/user/api/userApi";

// ✅ Mock UserTable component — không test component con
vi.mock("../../../../../features/user/components/UserTable", () => ({
  default: ({ users }: { users: User[] }) => (
    <div data-testid="user-table">
      {users.map((u) => (
        <div key={u.userId}>
          <span>{u.fullName}</span> - <span>{u.role.roleName}</span>
        </div>
      ))}
    </div>
  ),
}));

describe("Integration Test: UserManagementPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // 🧩 Case 1: Khi đang loading
  it("hiển thị thông báo đang tải khi useUsers.loading = true", () => {
    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: [],
      loading: true,
      error: null,
    });

    render(<UserManagementPage />);
    expect(screen.getByText("Đang tải dữ liệu...")).toBeInTheDocument();
  });

  // 🧩 Case 2: Khi có lỗi
  it("hiển thị thông báo lỗi khi useUsers.error có giá trị", () => {
    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: [],
      loading: false,
      error: "Không thể tải dữ liệu",
    });

    render(<UserManagementPage />);
    expect(screen.getByText("Không thể tải dữ liệu")).toBeInTheDocument();
  });

  // 🧩 Case 3: Khi có dữ liệu người dùng
  it("hiển thị bảng người dùng và các thành phần UI khi useUsers trả về users", async () => {
    const mockUsers: User[] = [
      {
        userId: "1",
        fullName: "Nguyễn Văn A",
        email: "a@gmail.com",
        phoneNumber: "0123456789",
        gender: "Nam",
        age: 28,
        address: "Hà Nội",
        dateOfBirth: "1997-01-01",
        role: { roleName: "Admin" },
      },
      {
        userId: "2",
        fullName: "Trần Thị B",
        email: "b@gmail.com",
        phoneNumber: "0987654321",
        gender: "Nữ",
        age: 25,
        address: "TP.HCM",
        dateOfBirth: "2000-05-12",
        role: { roleName: "User" },
      },
    ];

    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
    });

    render(<UserManagementPage />);

    // ✅ Kiểm tra tiêu đề trang
    expect(screen.getByRole("heading", { name: /User\s*Management/i })).toBeInTheDocument();

    // ✅ Kiểm tra bảng hiển thị đúng dữ liệu người dùng
    expect(await screen.findByTestId("user-table")).toBeInTheDocument();
    expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
    expect(screen.getByText("Trần Thị B")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getAllByText("User").length).toBeGreaterThan(0); // tránh trùng heading

    // ✅ Kiểm tra nút chức năng
    const createBtn = screen.getByText("Tạo tài khoản");
    expect(createBtn).toHaveAttribute("href", "/CreateUser");
    expect(screen.getByText("Quản lí vai trò")).toBeInTheDocument();

    // ✅ Kiểm tra hiển thị tổng số người dùng
    await waitFor(() => {
      expect(screen.getByText(/Showing/i)).toHaveTextContent("Showing 2 entries");
    });
  });
});
