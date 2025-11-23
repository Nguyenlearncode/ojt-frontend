import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../api/axiosClient";
import { testOrderCommentApi } from "../../../../features/patient/api/testOrderCommentApi";

vi.mock("../../../../api/axiosClient", () => ({
  default: {
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("testOrderCommentApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("addComment → POST đúng", () => {
    const data = { content: "hello" };

    testOrderCommentApi.addComment("T01", data);

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/testorder/test-orders/T01/comments",
      data
    );
  });

  it("updateComment → PUT đúng", () => {
    const data = { newContent: "updated" };

    testOrderCommentApi.updateComment("T01", "C99", data);

    expect(axiosClient.put).toHaveBeenCalledWith(
      "/testorder/test-orders/T01/comments/C99",
      data
    );
  });

  it("deleteComment → DELETE đúng", () => {
    testOrderCommentApi.deleteComment("T01", "C01");

    expect(axiosClient.delete).toHaveBeenCalledWith(
      "/testorder/test-orders/T01/comments/C01"
    );
  });
});
