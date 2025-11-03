import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useUsers } from "../../../../features/user/hooks/useUsers";
import { userApi } from "../../../../features/user/api/userApi";
import { useNavigate } from "react-router-dom";

// ✅ Mock dependencies
vi.mock("../../../../features/user/api/userApi", () => ({
    userApi: { getAllUsers: vi.fn() },
}));

vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
}));

describe("👥 useUsers hook", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
        localStorage.clear();
    });

    it("🟢 gọi API thành công và sắp xếp user theo tên (A → Z)", async () => {
        (userApi.getAllUsers as any).mockResolvedValue([
            { id: 2, fullName: "Trần B", email: "b@example.com" },
            { id: 1, fullName: "An A", email: "a@example.com" },
        ]);

        const { result } = renderHook(() => useUsers());

        // Lúc đầu loading = true
        expect(result.current.loading).toBe(true);

        // Chờ act để resolve Promise
        await act(async () => { });

        expect(userApi.getAllUsers).toHaveBeenCalled();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();

        // ✅ Kiểm tra đã sắp xếp theo tên
        expect(result.current.users.map((u) => u.fullName)).toEqual(["An A", "Trần B"]);
    });

    it("🔴 xử lý lỗi 401 (hết phiên, điều hướng về login)", async () => {
        vi.useFakeTimers();
        (userApi.getAllUsers as any).mockRejectedValue({
            response: { status: 401 },
        });

        const { result } = renderHook(() => useUsers());

        await act(async () => { });
        expect(result.current.error).toBe("Session expired. Please login again.");

        // ✅ Xóa token khỏi localStorage
        expect(localStorage.getItem("accessToken")).toBeNull();
        expect(localStorage.getItem("refreshToken")).toBeNull();

        // Chạy hết timeout 2s
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });

        expect(mockNavigate).toHaveBeenCalledWith("/");

        vi.useRealTimers();
    });


    it("🔴 xử lý lỗi khác (ví dụ: server error)", async () => {
        (userApi.getAllUsers as any).mockRejectedValue(new Error("Server error"));

        const { result } = renderHook(() => useUsers());

        await act(async () => { });

        expect(result.current.error).toBe("Lỗi khi tải danh sách người dùng.");
        expect(result.current.users).toEqual([]);
    });

    it("🟠 refetch gọi lại API", async () => {
        (userApi.getAllUsers as any).mockResolvedValue([
            { id: 1, fullName: "User 1", email: "u1@example.com" },
        ]);

        const { result } = renderHook(() => useUsers());

        // Lần đầu
        await act(async () => { });
        expect(result.current.users).toHaveLength(1);

        // Lần refetch (mock thêm data mới)
        (userApi.getAllUsers as any).mockResolvedValue([
            { id: 2, fullName: "User 2", email: "u2@example.com" },
        ]);

        await act(async () => {
            await result.current.refetch();
        });

        expect(userApi.getAllUsers).toHaveBeenCalledTimes(2);
        expect(result.current.users).toHaveLength(1);
        expect(result.current.users[0].fullName).toBe("User 2");
    });
});
