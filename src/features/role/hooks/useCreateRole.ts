// src/features/role/hooks/useCreateRole.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { roleApi, type CreateRolePayload, type Privilege } from "../api/roleApi";

export const useCreateRole = () => {
  const navigate = useNavigate();

  const initialForm: CreateRolePayload = {
    roleName: "",
    roleCode: "",
    roleDescription: "",
    privileges: [],
  };

  const [formData, setFormData] = useState<CreateRolePayload>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof CreateRolePayload, value: string | Privilege[]) => {
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
    
    // Validate roleCode format (uppercase with underscore)
    if (formData.roleCode && !/^[A-Z_]+$/.test(formData.roleCode)) {
      newErrors.roleCode = "Mã role phải viết hoa và chỉ chứa chữ cái, dấu gạch dưới!";
    }

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
      await roleApi.createRole(formData);
      toast.success("✅ Tạo role thành công!");
      navigate("/RoleManagement");
    } catch (err: any) {
      const msg = err.response?.data?.message || "❌ Không thể tạo role!";
      toast.error(msg);
      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    loading,
    handleChange,
    togglePrivilege,
    handleSubmit,
    handleReset,
  };
};

