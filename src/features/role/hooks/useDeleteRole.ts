// src/features/role/hooks/useDeleteRole.ts
import { useState } from "react";
import { toast } from "react-toastify";
import { roleApi } from "../api/roleApi";

export const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);

  const deleteRole = async (roleCode: string, onSuccess?: () => void) => {
    if (!window.confirm(`⚠️ Bạn có chắc chắn muốn xóa role "${roleCode}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await roleApi.deleteRole(roleCode);
      toast.success("✅ Xóa role thành công!");
      onSuccess?.();
    } catch (err: any) {
      const msg = err.response?.data?.message || "❌ Không thể xóa role!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { deleteRole, loading };
};

