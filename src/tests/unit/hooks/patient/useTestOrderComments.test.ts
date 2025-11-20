import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { useTestOrderComments } from "../../../../features/patient/hooks/useTestOrderComments";
import { testOrderCommentApi } from "../../../../features/patient/api/testOrderCommentApi";

vi.mock("../../../../features/patient/api/testOrderCommentApi", () => ({
  testOrderCommentApi: {
    addComment: vi.fn(),
    updateComment: vi.fn(),
    deleteComment: vi.fn(),
  },
}));

describe("useTestOrderComments", () => {
  it("addComment → gọi API", async () => {
    (testOrderCommentApi.addComment as any).mockResolvedValue({});

    const { result } = renderHook(() => useTestOrderComments());

    await act(async () => {
      await result.current.addComment("T1", "hello");
    });

    expect(testOrderCommentApi.addComment).toHaveBeenCalled();
  });

  it("updateComment → gọi API", async () => {
    (testOrderCommentApi.updateComment as any).mockResolvedValue({});

    const { result } = renderHook(() => useTestOrderComments());

    await act(async () => {
      await result.current.updateComment("T1", "C1", "new");
    });

    expect(testOrderCommentApi.updateComment).toHaveBeenCalled();
  });

  it("deleteComment → gọi API", async () => {
    (testOrderCommentApi.deleteComment as any).mockResolvedValue({});

    const { result } = renderHook(() => useTestOrderComments());

    await act(async () => {
      await result.current.deleteComment("T1", "C1");
    });

    expect(testOrderCommentApi.deleteComment).toHaveBeenCalled();
  });
});
