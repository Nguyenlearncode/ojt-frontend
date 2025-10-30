// src/features/user/hooks/useCreateUserForm.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../api/userApi";
import { formatDate } from "../../../utils/formatDate";
import { calcAge } from "../../../utils/calcAge"; // ✅ dùng chung

export const useCreateUserForm = () => {
  const navigate = useNavigate();

  const initialForm = {
    roleCode: "",
    fullName: "",
    gender: "Male",
    dateOfBirth: "",
    age: 0,
    phoneNumber: "",
    address: "",
    email: "",
    cccd: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // 🧩 Cập nhật tuổi khi đổi DOB
  useEffect(() => {
    if (formData.dateOfBirth) {
      const newAge = calcAge(formData.dateOfBirth);
      setFormData((prev) => ({ ...prev, age: newAge }));
    }
  }, [formData.dateOfBirth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const required = ["roleCode", "fullName", "email", "phoneNumber", "address", "cccd", "dateOfBirth"];
    required.forEach((field) => {
      if (!formData[field as keyof typeof formData]) newErrors[field] = "Vui lòng nhập thông tin!";
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ!";

    if (formData.phoneNumber && (formData.phoneNumber.length !== 10 || !/^[0-9]+$/.test(formData.phoneNumber)))
      newErrors.phoneNumber = "Số điện thoại phải có đúng 10 chữ số!";

    if (formData.age <= 0)
      newErrors.age = "Tuổi không hợp lệ!";

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
      const payload = {
        roleCode: formData.roleCode,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        fullName: formData.fullName,
        identifyNumber: formData.cccd,
        gender: formData.gender,
        age: formData.age,
        address: formData.address,
        // ✅ backend yêu cầu MM/dd/yyyy
        dateOfBirth: formatDate(formData.dateOfBirth, "MM/dd/yyyy"),
      };

      const res = await userApi.createUser(payload);
      toast.success(res.message || "✅ Tạo tài khoản thành công!");
      navigate("/UserManagement");
    } catch (err: any) {
      const msg = err.response?.data?.message || "❌ Không thể tạo tài khoản!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
  };

  const handleBack = () => navigate(-1);

  return {
    formData,
    setFormData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleReset,
    handleBack,
  };
};
