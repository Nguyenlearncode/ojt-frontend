// src/features/patient/hooks/useTestOrders.ts
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { testOrderApi } from "../api/testOrderApi";
import { flaggingSetApi } from "../api/flaggingSetApi";
import { getUserInfo } from "../../../utils/jwtHelper";

// Interfaces ---------------------------------------------------

export interface TestOrderListDto {
  testOrderId: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  status: string; // Pending | Complete | Cancel
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

export interface ModifyTestOrderRequest {
  [key: string]: any;
}

// Hook ---------------------------------------------------------

export const useTestOrders = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // CREATE TEST ORDER (NEW PATIENT)
  const createTestOrder = async (data: any) => {
    try {
      await testOrderApi.createTestOrder(data);
      toast({
        title: "Thành công",
        description: "Tạo đơn xét nghiệm cho bệnh nhân mới thành công!",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description: err.response?.data?.message || "Không thể tạo đơn xét nghiệm.",
        status: "error",
      });
      throw err;
    }
  };

  // CREATE TEST ORDER (EXISTING PATIENT)
  const createTestOrderForPatient = async (patientId: string, data?: CreateTestOrderForPatientRequest) => {
    try {
      const user = getUserInfo();
      const requestData = data || { createdBy: user?.sub || "" };

      await testOrderApi.createTestOrderForPatient(patientId, requestData);

      toast({
        title: "Thành công",
        description: "Tạo đơn xét nghiệm thành công!",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description: err.response?.data?.message || "Không thể tạo đơn xét nghiệm.",
        status: "error",
      });
      throw err;
    }
  };

  // GET DETAIL
  const getTestOrderDetail = async (testOrderId: string) => {
    try {
      const res = await testOrderApi.getTestOrderDetail(testOrderId);
      return res?.data ?? res;
    } catch (err: any) {
      toast({
        title: "Lỗi tải dữ liệu",
        description:
          err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Không thể tải chi tiết đơn xét nghiệm.",
        status: "error",
      });
      throw err;
    }
  };

  // GET ALL
  const getAllTestOrders = async () => {
    setLoading(true);
    try {
      const res = await testOrderApi.getAllTestOrders();
      return res?.data ?? res;
    } catch (err: any) {
      toast({
        title: "Lỗi tải dữ liệu",
        description:
          err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Không thể tải danh sách đơn xét nghiệm.",
        status: "error",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // MODIFY ORDER
  const modifyTestOrder = async (testOrderId: string, data: ModifyTestOrderRequest) => {
    try {
      const user = getUserInfo();
      const payload = { ...data, updatedBy: user?.sub };

      await testOrderApi.modifyTestOrder(testOrderId, payload);

      toast({
        title: "Thành công",
        description: "Cập nhật đơn xét nghiệm thành công!",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Cập nhật thất bại",
        description: err.response?.data?.message || "Không thể cập nhật đơn xét nghiệm.",
        status: "error",
      });
      throw err;
    }
  };

  // UPDATE STATUS — Pending | Complete | Cancel
  const updateTestOrderStatus = async (testOrderId: string, newStatus: string) => {
    try {
      await testOrderApi.updateTestOrderStatus(testOrderId, { newStatus });

      toast({
        title: "Thành công",
        description: "Trạng thái đơn đã được cập nhật.",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Cập nhật thất bại",
        description:
          err.response?.data?.message || "Không thể cập nhật trạng thái đơn xét nghiệm.",
        status: "error",
      });
      throw err;
    }
  };

  // APPLY FLAGGING
  const applyFlagging = async (testOrderId: string) => {
    try {
      await flaggingSetApi.applyFlags(testOrderId, {});
      toast({
        title: "Đã áp dụng flag",
        description: "Kết quả xét nghiệm đã được cập nhật flag.",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Áp dụng thất bại",
        description:
          err.response?.data?.message || "Không thể áp dụng flag cho kết quả xét nghiệm.",
        status: "error",
      });
      throw err;
    }
  };

  // DOWNLOAD HELPER
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

  // EXPORT EXCEL
  const exportTestOrders = async (patientId?: string) => {
    try {
      const response = await testOrderApi.exportTestOrders(patientId);
      downloadFile(response.data, "test-orders.xlsx");

      toast({
        title: "Đã xuất Excel",
        description: "File danh sách đơn xét nghiệm đã được tải về.",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Xuất Excel thất bại",
        description:
          err.response?.data?.message || "Không thể xuất danh sách đơn xét nghiệm.",
        status: "error",
      });
    }
  };

  // PRINT PDF
  const printTestOrder = async (testOrderId: string, fileName?: string) => {
    try {
      const response = await testOrderApi.printTestOrder(testOrderId, fileName ?? "test-order");
      downloadFile(response.data, `${fileName ?? "test-order"}.pdf`);

      toast({
        title: "Đã tải PDF",
        description: "File PDF đơn xét nghiệm đã được tải về.",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "In PDF thất bại",
        description:
          err.response?.data?.message || "Không thể tải PDF cho đơn xét nghiệm này.",
        status: "error",
      });
    }
  };

  // DELETE TEST ORDER
  const deleteTestOrder = async (testOrderId: string) => {
    try {
      await testOrderApi.deleteTestOrder(testOrderId);
      toast({
        title: "Thành công",
        description: "Xóa đơn xét nghiệm thành công!",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Xóa thất bại",
        description: err.response?.data?.message || "Không thể xóa đơn xét nghiệm.",
        status: "error",
      });
      throw err;
    }
  };

  // REVIEW TEST ORDER
const reviewTestOrder = async (
  testOrderId: string,
  resultUpdates?: { resultId: string; newValue: string }[]
) => {
  try {
    const user = getUserInfo();
    const payload = {
  reviewedBy: user?.sub ?? null,
  resultUpdates: resultUpdates ?? null,
};


    await testOrderApi.reviewTestOrder(testOrderId, payload);

    toast({
      title: "Đã review",
      description: "Review đơn xét nghiệm thành công.",
      status: "success",
    });
  } catch (err: any) {
    toast({
      title: "Review thất bại",
      description:
        err.response?.data?.message || "Không thể review đơn xét nghiệm.",
      status: "error",
    });

    throw err;
  }
};


  // EXPORT HOOK API
  return {
    loading,
    createTestOrder,
    createTestOrderForPatient,
    getTestOrderDetail,
    getAllTestOrders,
    modifyTestOrder,
    deleteTestOrder,
    updateTestOrderStatus,
    applyFlagging,
    exportTestOrders,
    printTestOrder,
    reviewTestOrder,
  };
};
