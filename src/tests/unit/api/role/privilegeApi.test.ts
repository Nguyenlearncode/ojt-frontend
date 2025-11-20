import { describe, it, expect, vi, beforeEach } from "vitest";
import { privilegeApi } from "../../../../features/role/api/privilegeApi";
import axiosClient from "../../../../api/axiosClient";

vi.mock("../../../../api/axiosClient", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("🔑 privilegeApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("🟢 trả về danh sách privileges khi API thành công", async () => {
    (axiosClient.get as any).mockResolvedValue({
      data: [
        { privilegeId: 1, privilegeName: "VIEW", description: "View access" },
      ],
    });

    const result = await privilegeApi.getAllPrivileges();
    expect(result).toHaveLength(1);
    expect(result[0].privilegeName).toBe("VIEW");
    expect(axiosClient.get).toHaveBeenCalledWith("/iam/privilege");
  });

  it("🟠 trả về mảng rỗng khi response không hợp lệ", async () => {
    (axiosClient.get as any).mockResolvedValue({ data: null });

    const result = await privilegeApi.getAllPrivileges();
    expect(result).toEqual([]);
  });

  it("🔴 trả về mảng rỗng khi lỗi xảy ra", async () => {
    (axiosClient.get as any).mockRejectedValue(new Error("Network error"));

    try {
      await privilegeApi.getAllPrivileges();
    } catch {}

    expect(axiosClient.get).toHaveBeenCalledWith("/iam/privilege");
  });
});
