import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { testOrderCommentApi } from "../api/testOrderCommentApi";

export interface CommentPayload {
  commentId: string;
  content: string;
  createdBy?: string;
  createdAt?: string;
}

export const useTestOrderComments = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const notify = (status: "success" | "error", description: string) => {
    toast({
      title: status === "success" ? "Thành công" : "Thất bại",
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const addComment = async (testOrderId: string, content: string) => {
    setLoading(true);
    try {
      await testOrderCommentApi.addComment(testOrderId, { content });
      notify("success", "Đã thêm bình luận");
    } catch (err: any) {
      notify(
        "error",
        err.response?.data?.message || "Không thể thêm bình luận. Thử lại."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (
    testOrderId: string,
    commentId: string,
    newContent: string
  ) => {
    setLoading(true);
    try {
      await testOrderCommentApi.updateComment(testOrderId, commentId, {
        newContent,
      });
      notify("success", "Đã cập nhật bình luận");
    } catch (err: any) {
      notify(
        "error",
        err.response?.data?.message || "Không thể cập nhật bình luận."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (testOrderId: string, commentId: string) => {
    setLoading(true);
    try {
      await testOrderCommentApi.deleteComment(testOrderId, commentId);
      notify("success", "Đã xóa bình luận");
    } catch (err: any) {
      notify(
        "error",
        err.response?.data?.message || "Không thể xóa bình luận."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addComment,
    updateComment,
    deleteComment,
  };
};



