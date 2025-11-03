import { describe, it, expect, vi, beforeEach } from "vitest";
import { roleApi } from "../../../../features/role/api/roleApi";
import axiosClient from "../../../../api/axiosClient";

// ✅ Mock axiosClient
vi.mock("../../../../api/axiosClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("🧩 roleApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 🟢 getAllRoles
  it("🟢 trả về danh sách roles khi API thành công (response.data là mảng)", async () => {
    (axiosClient.get as any).mockResolvedValue({
      data: [
        { roleCode: "ADMIN", roleName: "Admin", privileges: [] },
      ],
    });

    const result = await roleApi.getAllRoles();
    expect(result).toHaveLength(1);
    expect(result[0].roleCode).toBe("ADMIN");
    expect(axiosClient.get).toHaveBeenCalledWith("/role/all");
  });

  it("🟠 trả về danh sách roles khi response là mảng (không có data field)", async () => {
    (axiosClient.get as any).mockResolvedValue([
      { roleCode: "USER", roleName: "User", privileges: [] },
    ]);

    const result = await roleApi.getAllRoles();
    expect(result).toHaveLength(1);
    expect(result[0].roleCode).toBe("USER");
  });

  it("🔴 trả về mảng rỗng khi response không hợp lệ", async () => {
    (axiosClient.get as any).mockResolvedValue({});
    const result = await roleApi.getAllRoles();
    expect(result).toEqual([]);
  });

  // 🟢 createRole
  it("🟢 gọi đúng endpoint khi tạo role", async () => {
    const payload = {
      roleName: "Admin",
      roleCode: "ADMIN",
      roleDescription: "System admin",
      privileges: [],
    };
    (axiosClient.post as any).mockResolvedValue({ data: payload });

    const result = await roleApi.createRole(payload);
    expect(result).toEqual(payload);
    expect(axiosClient.post).toHaveBeenCalledWith("/role/create", payload);
  });

  // 🟢 updateRole
  it("🟢 gọi đúng endpoint khi cập nhật role", async () => {
    const payload = {
      roleName: "Manager",
      roleCode: "MANAGER",
      roleDescription: "Manage things",
      privileges: [],
    };
    (axiosClient.post as any).mockResolvedValue({ data: payload });

    const result = await roleApi.updateRole(payload);
    expect(result).toEqual(payload);
    expect(axiosClient.post).toHaveBeenCalledWith("/role/update", payload);
  });

  // 🟢 deleteRole
  it("🟢 gọi đúng endpoint khi xóa role", async () => {
    (axiosClient.delete as any).mockResolvedValue({});
    await roleApi.deleteRole("ADMIN");
    expect(axiosClient.delete).toHaveBeenCalledWith("/role/delete/ADMIN");
  });
});
