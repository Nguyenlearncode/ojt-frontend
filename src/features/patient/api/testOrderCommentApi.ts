import axiosClient from "../../../api/axiosClient";

export const testOrderCommentApi = {
  addComment: (testOrderId: string, data: { content: string }) =>
    axiosClient.post(`/patient/test-orders/${testOrderId}/comments`, data),

  updateComment: (
    testOrderId: string,
    commentId: string,
    data: { newContent: string }
  ) =>
    axiosClient.put(
      `/patient/test-orders/${testOrderId}/comments/${commentId}`,
      data
    ),

  deleteComment: (testOrderId: string, commentId: string) =>
    axiosClient.delete(
      `/patient/test-orders/${testOrderId}/comments/${commentId}`
    ),
};



