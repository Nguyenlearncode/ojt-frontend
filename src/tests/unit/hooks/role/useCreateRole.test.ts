import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCreateRole } from "../../../../features/role/hooks/useCreateRole";
import { roleApi } from "../../../../features/role/api/roleApi";
import { toast } from "react-toastify";

vi.mock("../../../../features/role/api/roleApi", () => ({
  roleApi: { createRole: vi.fn() },
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}));
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("🧩 useCreateRole", () => {
  beforeEach(() => vi.clearAllMocks());

  it("🟠 hiển thị lỗi khi form rỗng", async () => {
    const { result } = renderHook(() => useCreateRole());
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });
    expect(toast.warning).toHaveBeenCalledWith("⚠️ Vui lòng kiểm tra lại thông tin!");
    expect(result.current.errors.roleName).toBe("Vui lòng nhập tên role!");
  });

  it("🟢 gọi API thành công", async () => {
    (roleApi.createRole as any).mockResolvedValue({});
    const { result } = renderHook(() => useCreateRole());

    act(() => {
      result.current.handleChange("roleName", "Admin");
      result.current.handleChange("roleCode", "ADMIN");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(roleApi.createRole).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("✅ Tạo role thành công!");
    });
  });

  it("🔴 xử lý lỗi từ API", async () => {
    (roleApi.createRole as any).mockRejectedValue({
      response: { data: { message: "Lỗi API" } },
    });
    const { result } = renderHook(() => useCreateRole());

    act(() => {
      result.current.handleChange("roleName", "Admin");
      result.current.handleChange("roleCode", "ADMIN");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(toast.error).toHaveBeenCalledWith("Lỗi API");
    expect(result.current.errors.submit).toBe("Lỗi API");
  });

  it("🧠 togglePrivilege thêm/xóa đúng", () => {
    const { result } = renderHook(() => useCreateRole());
    const privilege = { privilegeId: 1, privilegeName: "VIEW", description: "" };

    act(() => result.current.togglePrivilege(privilege));
    expect(result.current.formData.privileges).toHaveLength(1);

    act(() => result.current.togglePrivilege(privilege));
    expect(result.current.formData.privileges).toHaveLength(0);
  });
});
