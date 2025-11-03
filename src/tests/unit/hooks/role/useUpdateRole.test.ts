import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUpdateRole } from "../../../../features/role/hooks/useUpdateRole";
import { roleApi } from "../../../../features/role/api/roleApi";
import { toast } from "react-toastify";

vi.mock("../../../../features/role/api/roleApi", () => ({
  roleApi: { updateRole: vi.fn() },
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}));
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("✏️ useUpdateRole", () => {
  beforeEach(() => vi.clearAllMocks());

  const initialRole = {
    roleCode: "ADMIN",
    roleName: "Admin",
    roleDescription: "test",
    privileges: [],
  };

  it("🟢 khởi tạo với role ban đầu", () => {
    const { result } = renderHook(() => useUpdateRole(initialRole));
    expect(result.current.formData.roleCode).toBe("ADMIN");
  });

  it("🟠 hiển thị lỗi khi form trống", async () => {
    const { result } = renderHook(() => useUpdateRole(null));
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });
    expect(toast.warning).toHaveBeenCalledWith("⚠️ Vui lòng kiểm tra lại thông tin!");
  });

  it("🟢 gọi API thành công", async () => {
    (roleApi.updateRole as any).mockResolvedValue({});
    const { result } = renderHook(() => useUpdateRole(initialRole));

    act(() => {
      result.current.handleChange("roleName", "Super Admin");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(roleApi.updateRole).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("✅ Cập nhật role thành công!");
    });
  });

  it("🔴 xử lý lỗi khi API thất bại", async () => {
    (roleApi.updateRole as any).mockRejectedValue({
      response: { data: { message: "Update lỗi" } },
    });
    const { result } = renderHook(() => useUpdateRole(initialRole));

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(toast.error).toHaveBeenCalledWith("Update lỗi");
    expect(result.current.errors.submit).toBe("Update lỗi");
  });
});
