// src/tests/integration/ProfilePageChakra.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import ProfilePageChakra from "../../features/user/pages/ProfilePageChakra";

// mock jwtHelper trước
vi.mock("../../utils/jwtHelper", () => ({
  getUserInfo: vi.fn(),
  getUserPrivileges: vi.fn(),
}));
import * as jwtHelper from "../../utils/jwtHelper";

// mock modal
vi.mock("../../features/auth/components/ChangePasswordModal", () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="change-password-modal">Modal Open</div> : null,
}));

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("🧩 ProfilePageChakra Integration", () => {
  beforeEach(() => vi.clearAllMocks());

  it("🕓 hiển thị loading khi chưa có userInfo", () => {
    (jwtHelper.getUserInfo as Mock).mockReturnValue(null);
    (jwtHelper.getUserPrivileges as Mock).mockReturnValue([]);

    renderWithChakra(<ProfilePageChakra />);

    expect(screen.getByText("Loading profile...")).toBeInTheDocument();
  });

  it("✅ hiển thị thông tin người dùng và quyền hạn", async () => {
    (jwtHelper.getUserInfo as Mock).mockReturnValue({
      sub: "1",
      email: "john@example.com",
      FullName: "John Doe",
      RoleCode: "ADMIN",
      exp: 999999,
    });
    (jwtHelper.getUserPrivileges as Mock).mockReturnValue([
      { privilegeId: 1, privilegeName: "MANAGE_USERS" },
      { privilegeId: 2, privilegeName: "VIEW_REPORTS" },
    ]);

    renderWithChakra(<ProfilePageChakra />);

    // tên có 2 chỗ → dùng all
    const names = await screen.findAllByText("John Doe");
    expect(names.length).toBeGreaterThan(0);

    // email có 2 chỗ → dùng all
    const emails = await screen.findAllByText("john@example.com");
    expect(emails.length).toBeGreaterThan(0);

    // role "ADMIN" cũng có 2 badge → dùng all
    const roles = await screen.findAllByText("ADMIN");
    expect(roles.length).toBeGreaterThan(0);

    // 2 quyền này là unique → dùng getByText được
    expect(screen.getByText("MANAGE_USERS")).toBeInTheDocument();
    expect(screen.getByText("VIEW_REPORTS")).toBeInTheDocument();
  });

  it("🧱 ẩn phần quyền hạn khi danh sách rỗng", async () => {
    (jwtHelper.getUserInfo as Mock).mockReturnValue({
      sub: "2",
      email: "anna@example.com",
      FullName: "Anna Smith",
      RoleCode: "USER",
      exp: 999999,
    });
    (jwtHelper.getUserPrivileges as Mock).mockReturnValue([]);

    renderWithChakra(<ProfilePageChakra />);

    const names = await screen.findAllByText("Anna Smith");
    expect(names.length).toBeGreaterThan(0);

    expect(screen.queryByText("Quyền hạn (Privileges)")).not.toBeInTheDocument();
  });

  it("🔐 mở modal khi nhấn nút Đổi mật khẩu", async () => {
    (jwtHelper.getUserInfo as Mock).mockReturnValue({
      sub: "3",
      email: "mike@example.com",
      FullName: "Mike Ross",
      RoleCode: "MANAGER",
      exp: 999999,
    });
    (jwtHelper.getUserPrivileges as Mock).mockReturnValue([]);

    renderWithChakra(<ProfilePageChakra />);

    const names = await screen.findAllByText("Mike Ross");
    expect(names.length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /Đổi mật khẩu/i }));
    expect(await screen.findByTestId("change-password-modal")).toBeInTheDocument();
  });
});
