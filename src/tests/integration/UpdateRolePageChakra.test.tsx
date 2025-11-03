import { describe, it, vi, expect, beforeEach } from "vitest";
import { renderHook,  waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { roleApi } from "../../features/role/api/roleApi";
import UpdateRolePageChakra from "../../features/role/pages/UpdateRolePageChakra";
import { ChakraProvider } from "@chakra-ui/react";

// Mock API và hooks
vi.mock("../../features/role/api/roleApi", () => ({
  roleApi: {
    getAllRoles: vi.fn(),
  },
}));

vi.mock("../../features/role/hooks/useUpdateRole", () => ({
  useUpdateRole: vi.fn().mockReturnValue({
    formData: { roleName: "Admin", roleCode: "ADMIN", privileges: [] },
    setFormData: vi.fn(),
    errors: {},
    loading: false,
    handleChange: vi.fn(),
    togglePrivilege: vi.fn(),
    handleSubmit: vi.fn(),
  }),
}));

vi.mock("../../features/role/hooks/usePrivileges", () => ({
  usePrivileges: vi.fn().mockReturnValue({
    privileges: [{ privilegeId: 1, privilegeName: "VIEW_USERS" }],
    loading: false,
  }),
}));

// Helper render để mô phỏng điều hướng
const renderWithRouter = (path: string) => {
  return renderHook(() => null, {
    wrapper: ({ children }) => (
      <ChakraProvider>
        <MemoryRouter initialEntries={[path]}>
          {children}
          <Routes>
            <Route path="/UpdateRole/:roleCode" element={<UpdateRolePageChakra />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    ),
  });
};

describe("🧩 UpdateRolePageChakra logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches role data on mount", async () => {
    (roleApi.getAllRoles as any).mockResolvedValueOnce([
      { roleCode: "ADMIN", roleName: "Administrator" },
    ]);

    renderWithRouter("/UpdateRole/ADMIN");

    await waitFor(() => {
      expect(roleApi.getAllRoles).toHaveBeenCalledTimes(1);
    });
  });

  it("handles missing role gracefully", async () => {
    (roleApi.getAllRoles as any).mockResolvedValueOnce([]);

    renderWithRouter("/UpdateRole/NON_EXISTENT");

    await waitFor(() => {
      expect(roleApi.getAllRoles).toHaveBeenCalled();
    });
  });
});
