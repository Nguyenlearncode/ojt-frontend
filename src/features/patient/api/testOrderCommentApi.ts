import axiosClient from "../../../api/axiosClient";

export const testOrderCommentApi = {
  addComment: (testOrderId: string, data: { content: string }) =>
    axiosClient.post(`/testorder/test-orders/${testOrderId}/comments`, data),

  updateComment: (
    testOrderId: string,
    commentId: string,
    data: { newContent: string }
  ) =>
    axiosClient.put(
      `/testorder/test-orders/${testOrderId}/comments/${commentId}`,
      data
    ),

  deleteComment: (testOrderId: string, commentId: string) =>
    axiosClient.delete(
      `/testorder/test-orders/${testOrderId}/comments/${commentId}`
    ),
};



