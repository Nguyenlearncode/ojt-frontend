import { useCallback, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { flaggingSetApi } from "../../patient/api/flaggingSetApi";

export interface FlaggingSetConfig {
  configId: number;
  testName: string;
  lowThreshold?: number;
  highThreshold?: number;
  criticalThreshold?: number;
  version?: string;
  updatedAt?: string;
}

export interface UpsertFlaggingSetPayload {
  testName: string;
  lowThreshold?: number | null;
  highThreshold?: number | null;
  criticalThreshold?: number | null;
  version?: string;
}

const normalizeNumber = (value?: number | null) =>
  value === undefined || value === null || Number.isNaN(value)
    ? null
    : Number(value);

export const useFlaggingSets = () => {
  const toast = useToast();
  const [configs, setConfigs] = useState<FlaggingSetConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const unwrap = <T,>(res: any, fallback: T): T => {
    if (!res) return fallback;
    if (Array.isArray(res)) return (res as T) ?? fallback;
    if (res?.data) return (res.data as T) ?? fallback;
    return res as T;
  };

  const fetchConfigs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await flaggingSetApi.getAllFlaggingConfigs();
      const data = unwrap<FlaggingSetConfig[]>(res, []);
      setConfigs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast({
        title: "Lỗi tải dữ liệu",
        description:
          err.response?.data?.message ||
          "Không thể tải danh sách cấu hình flagging.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setConfigs([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createConfig = async (payload: UpsertFlaggingSetPayload) => {
    setSaving(true);
    try {
      await flaggingSetApi.createFlaggingConfig({
        ...payload,
        lowThreshold: normalizeNumber(payload.lowThreshold),
        highThreshold: normalizeNumber(payload.highThreshold),
        criticalThreshold: normalizeNumber(payload.criticalThreshold),
      });
      toast({
        title: "Thành công",
        description: "Đã tạo flagging set mới.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await fetchConfigs();
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description:
          err.response?.data?.message ||
          "Không thể tạo cấu hình flagging. Vui lòng thử lại.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = async (
    configId: number,
    payload: UpsertFlaggingSetPayload
  ) => {
    setSaving(true);
    try {
      await flaggingSetApi.updateFlaggingConfig(configId, {
        ...payload,
        lowThreshold: normalizeNumber(payload.lowThreshold),
        highThreshold: normalizeNumber(payload.highThreshold),
        criticalThreshold: normalizeNumber(payload.criticalThreshold),
      });
      toast({
        title: "Thành công",
        description: "Đã cập nhật flagging set.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await fetchConfigs();
    } catch (err: any) {
      toast({
        title: "Cập nhật thất bại",
        description:
          err.response?.data?.message ||
          "Không thể cập nhật cấu hình flagging.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      throw err;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  return {
    configs,
    loading,
    saving,
    fetchConfigs,
    createConfig,
    updateConfig,
  };
};



