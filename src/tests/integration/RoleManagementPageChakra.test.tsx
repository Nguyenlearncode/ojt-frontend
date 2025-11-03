import { describe, it, vi, expect, beforeEach } from "vitest";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import RoleManagementPageChakra from "../../features/role/pages/RoleManagementPageChakra";

const mockRefetch = vi.fn();
const mockDelete = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../features/role/hooks/useRoles", () => ({
  useRoles: () => ({
    roles: [
      { roleCode: "ADMIN", roleName: "Admin", roleDescription: "Full" },
      { roleCode: "USER", roleName: "User", roleDescription: "Basic" },
    ],
    loading: false,
    error: null,
    refetch: mockRefetch,
  }),
}));

vi.mock("../../features/role/hooks/useDeleteRole", () => ({
  useDeleteRole: () => ({
    deleteRole: mockDelete,
  }),
}));

// Không test UI, chỉ test logic
const renderLogic = () =>
  render(
    <ChakraProvider>
      <MemoryRouter>
        <RoleManagementPageChakra />
      </MemoryRouter>
    </ChakraProvider>
  );

describe("🧩 RoleManagementPageChakra logic", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls refetch when window focus event is triggered", async () => {
    renderLogic();

    await act(async () => {
      window.dispatchEvent(new Event("focus"));
    });

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("calls deleteRole correctly", async () => {
    renderLogic();

    await act(async () => {
      await mockDelete("ADMIN", mockRefetch);
    });

    expect(mockDelete).toHaveBeenCalled();
  });

  it("navigates correctly", async () => {
    renderLogic();

    await act(() => {
      mockNavigate("/CreateRole");
      mockNavigate("/UpdateRole/ADMIN");
    });

    expect(mockNavigate).toHaveBeenCalledWith("/UpdateRole/ADMIN");
  });
});
