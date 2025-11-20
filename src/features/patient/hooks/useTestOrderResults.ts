import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { testOrderResultApi } from "../api/testOrderResultApi";

export interface CreateTestResultRequest {
  flaggingSetId: number;
  patientId: string;
  testOrderId: string;
}

export interface SyncTestResultRequest {
  testOrderId: string;
  testName: string;
  value: string;
  referenceRange?: string;
  interpretation?: string;
  instrumentUsed?: string;
  flag?: string;
}

export const useTestOrderResults = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const createTestResult = async (data: CreateTestResultRequest) => {
    setLoading(true);
    try {
      await testOrderResultApi.createTestResult(data);
      toast({
        title: "Thành công",
        description: "Tạo kết quả xét nghiệm thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description: err.response?.data?.message || "Không thể tạo kết quả xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const syncTestResult = async (data: SyncTestResultRequest) => {
    setLoading(true);
    try {
      const result = await testOrderResultApi.syncTestResult(data);
      toast({
        title: "Thành công",
        description: "Đồng bộ kết quả xét nghiệm thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return result;
    } catch (err: any) {
      toast({
        title: "Đồng bộ thất bại",
        description: err.response?.data?.message || "Không thể đồng bộ kết quả xét nghiệm.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTestResult,
    syncTestResult,
  };
};

