import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import CreateRolePageChakra from "../../features/role/pages/CreateRolePageChakra";

// Mock hooks
vi.mock("../../features/role/hooks/useCreateRole", () => ({
  useCreateRole: () => ({
    formData: { roleName: "", roleCode: "", roleDescription: "", privileges: [] },
    setFormData: vi.fn(),
    errors: {},
    loading: false,
    handleChange: vi.fn(),
    togglePrivilege: vi.fn(),
    handleSubmit: vi.fn((e) => e.preventDefault()),
    handleReset: vi.fn(),
  }),
}));

vi.mock("../../features/role/hooks/usePrivileges", () => ({
  usePrivileges: () => ({
    privileges: [
      { privilegeId: 1, privilegeName: "VIEW_USERS" },
      { privilegeId: 2, privilegeName: "EDIT_USERS" },
    ],
    loading: false,
  }),
}));

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("CreateRolePageChakra (integration)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders and submits form", async () => {
    renderWithChakra(<CreateRolePageChakra />);

    expect(screen.getByText("Tạo Role Mới")).toBeInTheDocument();

    // Nhập tên role
    const nameInput = screen.getByPlaceholderText(/Ví dụ: Nhân viên phòng thí nghiệm/i);
    fireEvent.change(nameInput, { target: { value: "Lab Staff" } });

    // Nhập code
    const codeInput = screen.getByPlaceholderText(/LAB_USER/i);
    fireEvent.change(codeInput, { target: { value: "LAB_USER" } });

    // Submit
    const submitBtn = screen.getByRole("button", { name: /Tạo Role/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
  });

  it("shows privileges from usePrivileges", () => {
    renderWithChakra(<CreateRolePageChakra />);
    expect(screen.getByText("VIEW_USERS")).toBeInTheDocument();
    expect(screen.getByText("EDIT_USERS")).toBeInTheDocument();
  });
});
