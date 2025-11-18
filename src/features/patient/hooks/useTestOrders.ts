import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { testOrderApi } from "../api/testOrderApi";
import { flaggingSetApi } from "../api/flaggingSetApi";
import { getUserInfo } from "../../../utils/jwtHelper";

// Interfaces cho TestOrder
export interface TestOrderListDto {
  testOrderId: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  createdBy: string;
  runBy?: string;
  runOn?: string;
}

export interface TestOrderDetailDto {
  testOrderId: string;
  patientId: string;
  patientName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  phoneNumber: string;
  address?: string;
  status: string;
  createdBy: string;
  createdAt: string;
  runBy?: string;
  runOn?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface TestResultDetailDto {
  resultId: string;
  testName: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  flag?: string;
}

export interface TestOrderCommentDto {
  commentId: string;
  content: string;
  createdBy?: string;
  userName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ViewPatientTestOrderDetailResult {
  testOrder: TestOrderDetailDto | null;
  testResults: TestResultDetailDto[];
  comments: TestOrderCommentDto[];
  message: string;
}

export interface ViewPatientTestOrdersResult {
  items: TestOrderListDto[];
  message: string;
}

export interface CreateTestOrderForPatientRequest {
  createdBy: string;
}

export interface ReviewTestOrderRequest {
  reviewedBy: string;
  resultUpdates?: Array<{
    resultId: string;
    newValue: string;
  }>;
}

export interface ModifyTestOrderRequest {
  // Cần xem ModifyPatientTestOrderCommand để biết structure
  [key: string]: any;
}

export const useTestOrders = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const createTestOrder = async (data: {
    patient: {
      fullName: string;
      dateOfBirth: string;
      gender: string;
      phoneNumber: string;
      email?: string;
      address?: string;
      identifyNumber?: string;
      lastTestDate?: string;
    };
    createdBy: string;
  }) => {
    try {
      await testOrderApi.createTestOrder(data);
      toast({
        title: "Thành công",
        description: "Tạo đơn xét nghiệm cho bệnh nhân mới thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description: err.response?.data?.message || "Không thể tạo đơn xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const createTestOrderForPatient = async (
    patientId: string,
    data?: CreateTestOrderForPatientRequest
  ) => {
    try {
      const user = getUserInfo();
      const requestData = data || {
        createdBy: user?.sub || "",
      };

      await testOrderApi.createTestOrderForPatient(patientId, requestData);
      toast({
        title: "Thành công",
        description: "Tạo đơn xét nghiệm thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description: err.response?.data?.message || "Không thể tạo đơn xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const getTestOrderDetail = async (
    testOrderId: string
  ): Promise<ViewPatientTestOrderDetailResult> => {
    try {
      const res = await testOrderApi.getTestOrderDetail(testOrderId);

      // Handle response structure (ApiResponse or direct data)
      if (res?.data) {
        return res.data;
      }
      return res as ViewPatientTestOrderDetailResult;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.Message ||
        err.message ||
        "Không thể tải chi tiết đơn xét nghiệm.";

      toast({
        title: "Lỗi tải dữ liệu",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw err;
    }
  };

  const getAllTestOrders = async (): Promise<ViewPatientTestOrdersResult> => {
    setLoading(true);
    try {
      const res = await testOrderApi.getAllTestOrders();

      // Handle response structure (ApiResponse or direct data)
      if (res?.data) {
        return res.data;
      }
      return res as ViewPatientTestOrdersResult;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.Message ||
        err.message ||
        "Không thể tải danh sách đơn xét nghiệm.";

      toast({
        title: "Lỗi tải dữ liệu",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reviewTestOrder = async (
    testOrderId: string,
    data?: ReviewTestOrderRequest
  ) => {
    try {
      const user = getUserInfo();
      const requestData = data || {
        reviewedBy: user?.sub || "",
      };

      await testOrderApi.reviewTestOrder(testOrderId, requestData);
      toast({
        title: "Thành công",
        description: "Review đơn xét nghiệm thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Review thất bại",
        description: err.response?.data?.message || "Không thể review đơn xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const modifyTestOrder = async (
    testOrderId: string,
    data: ModifyTestOrderRequest
  ) => {
    try {
      const user = getUserInfo();
      const payload = {
        ...data,
        updatedBy: user?.sub,
      };
      await testOrderApi.modifyTestOrder(testOrderId, payload);
      toast({
        title: "Thành công",
        description: "Cập nhật đơn xét nghiệm thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Cập nhật thất bại",
        description:
          err.response?.data?.message || "Không thể cập nhật đơn xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const updateTestOrderStatus = async (
    testOrderId: string,
    newStatus: string
  ) => {
    try {
      await testOrderApi.updateTestOrderStatus(testOrderId, { newStatus });
      toast({
        title: "Thành công",
        description: "Trạng thái đơn đã được cập nhật.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Cập nhật thất bại",
        description:
          err.response?.data?.message ||
          "Không thể cập nhật trạng thái đơn xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const applyFlagging = async (testOrderId: string) => {
    try {
      await flaggingSetApi.applyFlags(testOrderId, {});
      toast({
        title: "Đã áp dụng flag",
        description: "Kết quả xét nghiệm đã được cập nhật flag.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Áp dụng thất bại",
        description:
          err.response?.data?.message ||
          "Không thể áp dụng flag cho kết quả xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const downloadFile = (data: Blob, filename: string) => {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const exportTestOrders = async (patientId?: string) => {
    try {
      const response = await testOrderApi.exportTestOrders(patientId);
      downloadFile(response, "test-orders.xlsx");
      toast({
        title: "Đã xuất Excel",
        description: "File danh sách đơn xét nghiệm đã được tải về.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Xuất Excel thất bại",
        description:
          err.response?.data?.message ||
          "Không thể xuất danh sách đơn xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const printTestOrder = async (testOrderId: string, fileName?: string) => {
    try {
      const response = await testOrderApi.printTestOrder(
        testOrderId,
        fileName ?? "test-order"
      );
      downloadFile(response, `${fileName ?? "test-order"}.pdf`);
      toast({
        title: "Đã tải PDF",
        description: "File PDF đơn xét nghiệm đã được tải về.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "In PDF thất bại",
        description:
          err.response?.data?.message ||
          "Không thể tải PDF cho đơn xét nghiệm này.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteTestOrder = async (testOrderId: string) => {
    try {
      await testOrderApi.deleteTestOrder(testOrderId);
      toast({
        title: "Thành công",
        description: "Xóa đơn xét nghiệm thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Xóa thất bại",
        description: err.response?.data?.message || "Không thể xóa đơn xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  return {
    loading,
    createTestOrder,
    createTestOrderForPatient,
    getTestOrderDetail,
    getAllTestOrders,
    reviewTestOrder,
    modifyTestOrder,
    deleteTestOrder,
    updateTestOrderStatus,
    applyFlagging,
    exportTestOrders,
    printTestOrder,
  };
};
