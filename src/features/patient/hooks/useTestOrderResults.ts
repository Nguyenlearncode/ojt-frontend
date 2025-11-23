// src/features/patient/hooks/useTestOrderResults.ts

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { testOrderResultApi } from "../api/testOrderResultApi";

export const useTestOrderResults = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const createTestOrderResult = async ({
    patientId,
    testOrderId,
  }: {
    patientId: string;
    testOrderId: string;
  }) => {
    setLoading(true);
    try {
      await testOrderResultApi.createResult({
        patientId,
        testOrderId,
      });

      toast({
        title: "Thành công",
        description: "Đã tạo kết quả xét nghiệm!",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description:
          err.response?.data?.message ||
          "Không thể tạo kết quả xét nghiệm.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTestOrderResult,
  };
};
