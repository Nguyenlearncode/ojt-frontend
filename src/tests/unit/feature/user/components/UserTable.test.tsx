import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UserTable from "../../../../../features/user/components/UserTable";
import type { User } from "../../../../../features/user/api/userApi";

describe("UserTable Component", () => {
  const mockUsers: User[] = [
    {
      userId: "1",
      fullName: "Nguyễn Văn A",
      email: "a@example.com",
      phoneNumber: "0123456789",
      gender: "Nam",
      age: 25,
      address: "Hà Nội",
      dateOfBirth: "2000-01-01",
      role: { roleName: "Admin" },
    },
    {
      userId: "2",
      fullName: "Trần Thị B",
      email: "b@example.com",
      phoneNumber: "0987654321",
      gender: "Nữ",
      age: 22,
      address: "HCM",
      dateOfBirth: "2003-02-02",
      role: { roleName: "User" },
    },
  ];

  it("hiển thị đúng header của bảng", () => {
    render(<UserTable users={mockUsers} />);
    const headers = ["#", "Full Name", "Email", "Role", "Gender", "Action"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("hiển thị đúng số lượng người dùng", () => {
    render(<UserTable users={mockUsers} />);
    const rows = screen.getAllByRole("row");
    // 1 hàng header + 2 hàng dữ liệu
    expect(rows.length).toBe(mockUsers.length + 1);
  });

  it("hiển thị thông tin người dùng chính xác", () => {
    render(<UserTable users={mockUsers} />);
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.fullName)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.role.roleName)).toBeInTheDocument();
      expect(screen.getByText(user.gender)).toBeInTheDocument();
    });
  });

  it("mỗi hàng có đủ 3 nút hành động: Sửa, Xóa, Xem", () => {
    render(<UserTable users={mockUsers} />);
    const rows = screen.getAllByRole("row");
    const firstUserRow = rows[1]; // bỏ qua header
    const withinRow = within(firstUserRow);

    ["Sửa", "Xóa", "Xem"].forEach((label) => {
      expect(withinRow.getByText(label)).toBeInTheDocument();
    });
  });

  it("hiển thị 'N/A' nếu role bị null", () => {
    const mockWithoutRole: User[] = [
      { ...mockUsers[0], userId: "3", role: null as any },
    ];
    render(<UserTable users={mockWithoutRole} />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
