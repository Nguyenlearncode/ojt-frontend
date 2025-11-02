// src/features/role/hooks/usePrivileges.ts
import { useEffect, useState, useCallback } from "react";
import { privilegeApi, type Privilege } from "../api/privilegeApi";

export const usePrivileges = () => {
  const [privileges, setPrivileges] = useState<Privilege[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrivileges = useCallback(async () => {
    setLoading(true);
    try {
      const data = await privilegeApi.getAllPrivileges();
      setPrivileges(data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Lỗi khi tải danh sách privileges";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrivileges();
  }, [fetchPrivileges]);

  return { privileges, loading, error, refetch: fetchPrivileges };
};

