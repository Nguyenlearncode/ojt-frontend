import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDeleteRole } from "../../../../features/role/hooks/useDeleteRole";
import { roleApi } from "../../../../features/role/api/roleApi";
import { toast } from "react-toastify";

vi.mock("../../../../features/role/api/roleApi", () => ({
  roleApi: { deleteRole: vi.fn() },
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("🗑 useDeleteRole", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("window", { confirm: vi.fn() });
  });

  it("🟠 không gọi API nếu người dùng hủy confirm", async () => {
    (window.confirm as any).mockReturnValue(false);
    const { result } = renderHook(() => useDeleteRole());

    await act(async () => {
      await result.current.deleteRole("ADMIN");
    });

    expect(roleApi.deleteRole).not.toHaveBeenCalled();
  });

  it("🟢 gọi API thành công khi confirm = true", async () => {
    (window.confirm as any).mockReturnValue(true);
    (roleApi.deleteRole as any).mockResolvedValue({});
    const { result } = renderHook(() => useDeleteRole());

    await act(async () => {
      await result.current.deleteRole("ADMIN");
    });

    // ✅ Không dùng waitFor — vì không có DOM render
    expect(roleApi.deleteRole).toHaveBeenCalledWith("ADMIN");
    expect(toast.success).toHaveBeenCalledWith("✅ Xóa role thành công!");
  });

  it("🔴 xử lý lỗi API", async () => {
    (window.confirm as any).mockReturnValue(true);
    (roleApi.deleteRole as any).mockRejectedValue({
      response: { data: { message: "Xóa lỗi" } },
    });
    const { result } = renderHook(() => useDeleteRole());

    await act(async () => {
      await result.current.deleteRole("ADMIN");
    });

    expect(toast.error).toHaveBeenCalledWith("Xóa lỗi");
  });
});
