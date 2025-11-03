import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRoles } from "../../../../features/role/hooks/useRoles";
import { roleApi } from "../../../../features/role/api/roleApi";
import { toast } from "react-toastify";

vi.mock("../../../../features/role/api/roleApi", () => ({
  roleApi: { getAllRoles: vi.fn() },
}));
vi.mock("react-toastify", () => ({
  toast: { error: vi.fn() },
}));

describe("🧱 useRoles", () => {
  beforeEach(() => vi.clearAllMocks());

  it("🟢 fetch roles thành công", async () => {
    (roleApi.getAllRoles as any).mockResolvedValue([
      { roleCode: "ADMIN", roleName: "Admin" },
    ]);
    const { result } = renderHook(() => useRoles());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.roles).toHaveLength(1);
  });

  it("🔴 xử lý lỗi khi fetch thất bại", async () => {
    (roleApi.getAllRoles as any).mockRejectedValue({
      response: { data: { message: "Lỗi roles" } },
    });
    const { result } = renderHook(() => useRoles());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Lỗi roles");
    expect(toast.error).toHaveBeenCalledWith("Lỗi roles");
  });
});
