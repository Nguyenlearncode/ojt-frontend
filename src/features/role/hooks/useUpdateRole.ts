// src/features/role/hooks/useUpdateRole.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { roleApi, type UpdateRolePayload, type Role, type Privilege } from "../api/roleApi";

export const useUpdateRole = (initialRole: Role | null) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UpdateRolePayload>({
    roleName: "",
    roleCode: "",
    roleDescription: "",
    privileges: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialRole) {
      setFormData({
        roleName: initialRole.roleName,
        roleCode: initialRole.roleCode,
        roleDescription: initialRole.roleDescription || "",
        privileges: initialRole.privileges || [],
      });
    }
  }, [initialRole]);

  const handleChange = (field: keyof UpdateRolePayload, value: string | Privilege[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const togglePrivilege = (privilege: Privilege) => {
    setFormData((prev) => {
      const exists = prev.privileges.some((p) => p.privilegeId === privilege.privilegeId);
      return {
        ...prev,
        privileges: exists
          ? prev.privileges.filter((p) => p.privilegeId !== privilege.privilegeId)
          : [...prev.privileges, privilege],
      };
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.roleName.trim()) newErrors.roleName = "Vui lòng nhập tên role!";
    if (!formData.roleCode.trim()) newErrors.roleCode = "Vui lòng nhập mã role!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.warning("⚠️ Vui lòng kiểm tra lại thông tin!");
      return;
    }

    try {
      setLoading(true);
      await roleApi.updateRole(formData);
      toast.success("✅ Cập nhật role thành công!");
      navigate("/RoleManagement");
    } catch (err: any) {
      const msg = err.response?.data?.message || "❌ Không thể cập nhật role!";
      toast.error(msg);
      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    loading,
    handleChange,
    togglePrivilege,
    handleSubmit,
  };
};

