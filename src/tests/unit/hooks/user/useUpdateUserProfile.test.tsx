import { renderHook, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useUpdateUserProfile } from "../../../../features/user/hooks/useUpdateUserProfile";
import { userApi } from "../../../../features/user/api/userApi";
import axiosClient from "../../../../api/axiosClient";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router-dom";

// 🧩 Mock các module
vi.mock("../../../../features/user/api/userApi", () => ({
    userApi: { getUserById: vi.fn() },
}));

vi.mock("../../../../api/axiosClient", () => ({
    default: { put: vi.fn() },
}));

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
    },
}));

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => mockUseParams(),
    };
});

describe("useUpdateUserProfile", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("✅ fetchUser được gọi khi có id", async () => {
        mockUseParams.mockReturnValue({ id: "123" });

        (userApi.getUserById as any).mockResolvedValueOnce({
            userId: "123",
            fullName: "Nguyen Van A",
            email: "a@example.com",
            phoneNumber: "0912345678",
            gender: "Male",
            age: 25,
            address: "Hà Nội",
            dateOfBirth: "2000-01-01T00:00:00Z",
        });

        const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: MemoryRouter });

        // 🧩 Đợi đến khi formData có dữ liệu
        await waitFor(() => expect(result.current.formData).not.toBeNull());
        expect(userApi.getUserById).toHaveBeenCalledWith("123");
        expect(result.current.formData?.fullName).toBe("Nguyen Van A");
        expect(result.current.formData?.dateOfBirth).toBe("2000-01-01");
    });


    it("❌ hiển thị toast.error khi fetchUser thất bại", async () => {
        mockUseParams.mockReturnValue({ id: "456" });
        (userApi.getUserById as any).mockRejectedValueOnce(new Error("error"));

        renderHook(() => useUpdateUserProfile(), { wrapper: MemoryRouter });

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("❌ Không thể tải thông tin người dùng!");
        });
    });

    it("✅ handleChange cập nhật form và xóa lỗi", async () => {
        mockUseParams.mockReturnValue({ id: "1" });

        const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: MemoryRouter });

        act(() => {
            result.current.setFormData({
                userId: "1",
                fullName: "",
                email: "",
                phoneNumber: "",
                gender: "Male",
                age: 20,
                address: "",
                dateOfBirth: "",
            });
        });

        act(() => {
            result.current.handleChange({
                target: { name: "fullName", value: "Nguyen Van B" },
            } as any);
        });

        expect(result.current.formData?.fullName).toBe("Nguyen Van B");
        expect(result.current.errors.fullName).toBe("");
    });

    it("⚠️ hiển thị cảnh báo nếu form không hợp lệ khi submit", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: MemoryRouter });

        act(() => {
            result.current.setFormData({
                userId: "1",
                fullName: "",
                email: "",
                phoneNumber: "",
                gender: "Male",
                age: 0,
                address: "",
                dateOfBirth: "",
            });
        });

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        expect(toast.warning).toHaveBeenCalledWith("⚠️ Vui lòng kiểm tra lại thông tin!");
    });

    it("✅ gọi API PUT khi submit hợp lệ", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        (axiosClient.put as any).mockResolvedValueOnce({});

        const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: MemoryRouter });

        act(() => {
            result.current.setFormData({
                userId: "1",
                fullName: "Test User",
                email: "test@example.com",
                phoneNumber: "0912345678",
                gender: "Male",
                age: 25,
                address: "HCM",
                dateOfBirth: "2000-01-01",
            });
        });

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        expect(axiosClient.put).toHaveBeenCalledWith("/users/1", expect.any(Object));
        expect(toast.success).toHaveBeenCalledWith("✅ Cập nhật thông tin thành công!");
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it("❌ hiển thị toast.error nếu API thất bại", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        (axiosClient.put as any).mockRejectedValueOnce({
            response: { data: { message: "Lỗi cập nhật" } },
        });

        const { result } = renderHook(() => useUpdateUserProfile(), { wrapper: MemoryRouter });

        act(() => {
            result.current.setFormData({
                userId: "1",
                fullName: "User",
                email: "test@example.com",
                phoneNumber: "0912345678",
                gender: "Male",
                age: 25,
                address: "HN",
                dateOfBirth: "2000-01-01",
            });
        });

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        expect(toast.error).toHaveBeenCalledWith("Lỗi cập nhật");
    });
});
