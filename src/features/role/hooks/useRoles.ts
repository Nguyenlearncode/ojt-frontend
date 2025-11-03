// src/features/role/hooks/useRoles.ts
import { useEffect, useState, useCallback } from "react";
import { roleApi, type Role } from "../api/roleApi";
import { toast } from "react-toastify";

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await roleApi.getAllRoles();
      setRoles(data || []);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Lỗi khi tải danh sách roles";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { roles, loading, error, refetch: fetchRoles };
};

