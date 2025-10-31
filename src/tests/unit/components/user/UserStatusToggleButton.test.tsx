import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, expect, vi } from "vitest";
import { UserStatusToggleButton } from "../../../../features/user/components/Button/UserStatusToggleButton";

vi.mock("../../../../features/user/api/userApi", () => ({
  userApi: {
    lockUser: vi.fn(),
    unlockUser: vi.fn(),
  },
}));

vi.mock("../../../../utils/tokenUtils", () => ({
  getCurrentUserId: vi.fn(),
}));

const { userApi } = await import("../../../../features/user/api/userApi");
const { getCurrentUserId } = await import("../../../../utils/tokenUtils");

describe("🧠 UserStatusToggleButton logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getCurrentUserId as any).mockReturnValue("admin001");
  });

  test("🟢 Không cho khóa chính mình", async () => {
    (getCurrentUserId as any).mockReturnValue("self001");

    const { getByText } = render(
      <UserStatusToggleButton userId="self001" fullName="Tôi" initialActive={true} />
    );

    const btn = getByText("Không thể tự khóa");
    expect(btn).toBeDisabled();
  });

  test("🟢 Click khóa user → gọi userApi.lockUser", async () => {
    (userApi.lockUser as any).mockResolvedValue({});

    const { getByText } = render(
      <UserStatusToggleButton userId="u1" fullName="A" initialActive={true} />
    );

    const btn = getByText("Hoạt động");
    fireEvent.click(btn);

    await waitFor(() => {
      expect(userApi.lockUser).toHaveBeenCalledWith("u1");
    });
  });

  test("🟢 Click mở khóa user → gọi userApi.unlockUser", async () => {
    (userApi.unlockUser as any).mockResolvedValue({});

    const { getByText } = render(
      <UserStatusToggleButton userId="u2" fullName="B" initialActive={false} />
    );

    const btn = getByText("Không hoạt động");
    fireEvent.click(btn);

    await waitFor(() => {
      expect(userApi.unlockUser).toHaveBeenCalledWith("u2");
    });
  });

  test("🔴 API lỗi → không crash", async () => {
    (userApi.lockUser as any).mockRejectedValue(new Error("err"));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { getByText } = render(
      <UserStatusToggleButton userId="u3" fullName="C" initialActive={true} />
    );

    const btn = getByText("Hoạt động");
    fireEvent.click(btn);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
