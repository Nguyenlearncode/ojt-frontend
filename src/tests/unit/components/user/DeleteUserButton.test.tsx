import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, expect, vi } from "vitest";
import DeleteUserButton from "../../../../features/user/components/Button/DeleteUserButton";

// 🧩 Mock hook & API & utils
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../../../../features/user/api/userApi", () => ({
  userApi: {
    deleteUserPermanently: vi.fn(),
  },
}));

vi.mock("../../../../utils/tokenUtils", () => ({
  getCurrentUserId: vi.fn(),
}));

const { userApi } = await import("../../../../features/user/api/userApi");
const { getCurrentUserId } = await import("../../../../utils/tokenUtils");

describe("🧠 DeleteUserButton logic", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    (getCurrentUserId as any).mockReturnValue("current123");
  });

  test("🟢 Không cho tự xóa tài khoản chính mình", async () => {
    (getCurrentUserId as any).mockReturnValue("user123");

    const { getByText } = render(<DeleteUserButton userId="user123" fullName="Test" />);

    const btn = getByText("Không thể tự xóa");
    expect(btn).toBeDisabled();
  });

  test("🟢 Hiển thị modal xác nhận khi click Delete Account", async () => {
    const { getByText, queryByText } = render(
      <DeleteUserButton userId="user456" fullName="Nguyễn Văn A" />
    );

    const btn = getByText("Delete Account");
    fireEvent.click(btn);

    await waitFor(() => {
      expect(queryByText("Xác nhận xóa tài khoản")).toBeTruthy();
    });
  });

  test("🟢 Gọi API xóa khi xác nhận", async () => {
    (window.confirm as any) = vi.fn(() => true);
    (userApi.deleteUserPermanently as any).mockResolvedValue({});

    const { getByText } = render(<DeleteUserButton userId="u789" fullName="Nguyễn Văn B" />);

    const btn = getByText("Delete Account");
    fireEvent.click(btn);

    // tìm nút xác nhận
    await waitFor(() => getByText("Xác nhận xóa"));
    fireEvent.click(getByText("Xác nhận xóa"));

    await waitFor(() => {
      expect(userApi.deleteUserPermanently).toHaveBeenCalledWith("u789");
    });
  });

  test("🔴 API lỗi → alert lỗi hiển thị", async () => {
    (window.confirm as any) = vi.fn(() => true);
    (userApi.deleteUserPermanently as any).mockRejectedValue({
      response: { data: { message: "API Error" } },
    });
    global.alert = vi.fn();

    const { getByText } = render(<DeleteUserButton userId="u555" fullName="Nguyễn Văn C" />);
    fireEvent.click(getByText("Delete Account"));

    await waitFor(() => getByText("Xác nhận xóa"));
    fireEvent.click(getByText("Xác nhận xóa"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("API Error");
    });
  });
});
