import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { RoleTableChakra } from "../../../../features/role/components/RoleTableChakra";
import type { Role } from "../../../../features/role/api/roleApi";

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("🧱 RoleTableChakra", () => {
  const mockRoles: Role[] = [
    {
      roleName: "Admin",
      roleCode: "ADMIN",
      roleDescription: "Full access",
      privileges: [
        { privilegeId: 1, privilegeName: "Manage Users", description: "" },
        { privilegeId: 2, privilegeName: "Manage Roles", description: "" },
        { privilegeId: 3, privilegeName: "View Reports", description: "" },
        { privilegeId: 4, privilegeName: "Delete Data", description: "" },
      ],
    },
  ];

  it("🟢 hiển thị thông báo khi không có role", () => {
    renderWithChakra(<RoleTableChakra roles={[]} />);
    expect(screen.getByText("Không tìm thấy roles")).toBeInTheDocument();
  });

  it("🟢 render danh sách role đầy đủ", () => {
    renderWithChakra(<RoleTableChakra roles={mockRoles} />);
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
    expect(screen.getByText("Full access")).toBeInTheDocument();
    expect(screen.getByText("Manage Users")).toBeInTheDocument();
  });

  it("🟢 hiển thị badge +more khi có hơn 3 privileges", () => {
    renderWithChakra(<RoleTableChakra roles={mockRoles} />);
    expect(screen.getByText("+1 more")).toBeInTheDocument();
  });

  it("🟠 gọi callback khi click Edit và Delete", () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    renderWithChakra(
      <RoleTableChakra roles={mockRoles} onEdit={handleEdit} onDelete={handleDelete} />
    );

    const editBtn = screen.getByLabelText("Edit role");
    const delBtn = screen.getByLabelText("Delete role");

    fireEvent.click(editBtn);
    fireEvent.click(delBtn);

    expect(handleEdit).toHaveBeenCalledWith(mockRoles[0]);
    expect(handleDelete).toHaveBeenCalledWith("ADMIN");
  });

  it("🔴 hiển thị No privileges khi privileges rỗng", () => {
    const rolesWithoutPriv = [
      {
        roleName: "Viewer",
        roleCode: "VIEWER",
        roleDescription: "",
        privileges: [],
      },
    ] as Role[];

    renderWithChakra(<RoleTableChakra roles={rolesWithoutPriv} />);
    expect(screen.getByText("No privileges")).toBeInTheDocument();
  });
});
