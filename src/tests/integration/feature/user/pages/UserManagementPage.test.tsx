
import { render, screen, waitFor, within } from "@testing-library/react";
import { vi, describe, test, expect, afterEach } from "vitest";
import "@testing-library/jest-dom";
import UserManagementPage from "../../../../../features/user/pages/UserManagementPage";
import * as useUsersHook from "../../../../../features/user/hooks/useUsers";
import type { User } from "../../../../../features/user/api/userApi";

// 🧩 Mock component con UserTable
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

describe("UserManagementPage Integration Test", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("hiển thị thông báo tải khi đang loading", () => {
    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: [],
      loading: true,
      error: null,
    });

    render(<UserManagementPage />);
    expect(screen.getByText("Đang tải dữ liệu...")).toBeInTheDocument();
  });

  test("hiển thị lỗi nếu hook trả về error", () => {
    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: [],
      loading: false,
      error: "Không thể tải dữ liệu",
    });

    render(<UserManagementPage />);
    expect(screen.getByText("Không thể tải dữ liệu")).toBeInTheDocument();
  });

  test("hiển thị bảng người dùng khi có dữ liệu", async () => {
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

    // ✅ Kiểm tra tiêu đề trang (h2 có text "User Management")
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/User\s*Management/i);

    // ✅ Kiểm tra bảng người dùng render đúng
    const table = await screen.findByTestId("user-table");
    expect(table).toBeInTheDocument();

    const tableScope = within(table);
    expect(tableScope.getByText("Nguyễn Văn A")).toBeInTheDocument();
    expect(tableScope.getByText("Trần Thị B")).toBeInTheDocument();
    expect(tableScope.getByText("Admin")).toBeInTheDocument();
    expect(tableScope.getByText("User")).toBeInTheDocument();

    // ✅ Kiểm tra nút thao tác
    const createBtn = screen.getByText("Tạo tài khoản");
    expect(createBtn).toHaveAttribute("href", "/CreateUser");
    expect(screen.getByText("Quản lí vai trò")).toBeInTheDocument();

    // ✅ Kiểm tra phần hiển thị số lượng entries
    await waitFor(() => {
      expect(screen.getByText(/Showing/i)).toHaveTextContent("Showing 2 entries");
    });
  });
});
