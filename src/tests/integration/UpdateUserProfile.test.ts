import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, expect, vi } from "vitest";

// 🧩 1. Mock router
vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "user123" }),
  useNavigate: () => vi.fn(),
}));

// 🧩 2. Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}));

// 🧩 3. Mock userApi
vi.mock("../../features/user/api/userApi", () => ({
  userApi: {
    getUserById: vi.fn(),
  },
}));

// 🧩 4. Mock axiosClient đúng cách
vi.mock("../../api/axiosClient", () => ({
  __esModule: true,
  default: {
    put: vi.fn(),
  },
}));

// 🧩 5. Mock helper utils
vi.mock("../../utils/formatDate", () => ({
  normalizeDateForApi: vi.fn((d: string) => d),
}));

vi.mock("../../utils/calcAge", () => ({
  calcAge: vi.fn(() => 30),
}));

// 🧩 6. Import hook và mock sau khi mock xong
import { useUpdateUserProfile } from "../../features/user/hooks/useUpdateUserProfile";
import { userApi } from "../../features/user/api/userApi";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-toastify";

describe("🧠 useUpdateUserProfile - Logic only", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ✅ TEST 1: fetchUser hoạt động đúng
  test("fetchUser gọi userApi.getUserById và set formData", async () => {
    (userApi.getUserById as any).mockResolvedValue({
      userId: "user123",
      fullName: "Nguyễn Văn A",
      email: "a@example.com",
      phoneNumber: "0912345678",
      gender: "Male",
      address: "Hà Nội",
      age: 30,
      dateOfBirth: "1995-05-10",
    });

    const { result } = renderHook(() => useUpdateUserProfile());

    await waitFor(() => {
      expect(userApi.getUserById).toHaveBeenCalledWith("user123");
      expect(result.current.formData?.fullName).toBe("Nguyễn Văn A");
    });
  });

  // ✅ TEST 2: fetchUser lỗi
  test("fetchUser lỗi → hiển thị toast.error", async () => {
    (userApi.getUserById as any).mockRejectedValue(new Error("Network Error"));
    renderHook(() => useUpdateUserProfile());

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("❌ Không thể tải thông tin người dùng!");
    });
  });

  // ✅ TEST 3: handleSubmit form không hợp lệ
  test("handleSubmit cảnh báo khi form không hợp lệ", async () => {
    (userApi.getUserById as any).mockResolvedValue({
      userId: "u1",
      fullName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      address: "",
      age: 0,
      dateOfBirth: "",
    });

    const { result } = renderHook(() => useUpdateUserProfile());
    await waitFor(() => expect(result.current.formData).not.toBeNull());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    expect(toast.warning).toHaveBeenCalledWith("⚠️ Vui lòng kiểm tra lại thông tin!");
  });

  // ✅ TEST 4: handleSubmit hợp lệ
  test("handleSubmit hợp lệ → gọi axiosClient.put và toast.success", async () => {
    (userApi.getUserById as any).mockResolvedValue({
      userId: "u1",
      fullName: "Nguyễn Văn A",
      email: "a@example.com",
      phoneNumber: "0912345678",
      gender: "Male",
      address: "Hà Nội",
      age: 30,
      dateOfBirth: "1995-05-10",
    });

    (axiosClient.put as any).mockResolvedValue({});

    const { result } = renderHook(() => useUpdateUserProfile());
    await waitFor(() => expect(result.current.formData).not.toBeNull());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    expect(axiosClient.put).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("✅ Cập nhật thông tin thành công!");
  });

  // ✅ TEST 5: handleSubmit lỗi API
  test("handleSubmit lỗi API → toast.error hiển thị đúng", async () => {
    (userApi.getUserById as any).mockResolvedValue({
      userId: "u1",
      fullName: "Nguyễn Văn A",
      email: "a@example.com",
      phoneNumber: "0912345678",
      gender: "Male",
      address: "Hà Nội",
      age: 30,
      dateOfBirth: "1995-05-10",
    });

    (axiosClient.put as any).mockRejectedValue({
      response: { data: { message: "API error" } },
    });

    const { result } = renderHook(() => useUpdateUserProfile());
    await waitFor(() => expect(result.current.formData).not.toBeNull());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    expect(toast.error).toHaveBeenCalledWith("API error");
  });
});
