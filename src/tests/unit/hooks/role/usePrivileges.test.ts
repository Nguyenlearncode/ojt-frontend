import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePrivileges } from "../../../../features/role/hooks/usePrivileges";
import { privilegeApi } from "../../../../features/role/api/privilegeApi";

vi.mock("../../../../features/role/api/privilegeApi", () => ({
  privilegeApi: { getAllPrivileges: vi.fn() },
}));

describe("🔑 usePrivileges", () => {
  beforeEach(() => vi.clearAllMocks());

  it("🟢 fetch privileges thành công", async () => {
    (privilegeApi.getAllPrivileges as any).mockResolvedValue([
      { privilegeId: 1, privilegeName: "VIEW" },
    ]);

    const { result } = renderHook(() => usePrivileges());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.privileges).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("🔴 xử lý lỗi khi API thất bại", async () => {
    (privilegeApi.getAllPrivileges as any).mockRejectedValue({
      response: { data: { message: "Lỗi fetch" } },
    });

    const { result } = renderHook(() => usePrivileges());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Lỗi fetch");
  });
});
