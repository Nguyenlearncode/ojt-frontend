// src/features/user/hooks/useUpdateUserProfile.ts
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../api/userApi";
import { normalizeDateForApi } from "../../../utils/formatDate";
import { calcAge } from "../../../utils/calcAge"; // ✅ dùng chung

export interface UpdateUserForm {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  age: number;
  address: string;
  dateOfBirth: string;
}

export const useUpdateUserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UpdateUserForm | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // 🧩 Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) return;
        const data = await userApi.getUserById(id);

        let cleanDate = "";
        if (data.dateOfBirth) {
          const d = new Date(data.dateOfBirth);
          if (!isNaN(d.getTime()) && d.getFullYear() > 1900) {
            const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
              .toISOString()
              .split("T")[0];
            cleanDate = localDate;
          }
        }

        setFormData({
          userId: data.userId,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          age: data.age,
          address: data.address,
          dateOfBirth: cleanDate,
        });
      } catch {
        toast.error("❌ Không thể tải thông tin người dùng!");
      }
    };
    fetchUser();
  }, [id]);

  // 🧩 Tự động tính tuổi khi đổi DOB
  useEffect(() => {
    if (formData?.dateOfBirth) {
      setFormData((prev) =>
        prev ? { ...prev, age: calcAge(prev.dateOfBirth) } : prev
      );
    }
  }, [formData?.dateOfBirth]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    if (!formData) return false;
    const newErrors: { [key: string]: string } = {};

    const required = ["fullName", "email", "phoneNumber", "address", "dateOfBirth"];
    required.forEach((f) => {
      if (!formData[f as keyof UpdateUserForm])
        newErrors[f] = "Vui lòng nhập thông tin!";
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ!";

    if (
      formData.phoneNumber &&
      (formData.phoneNumber.length !== 10 || !/^[0-9]+$/.test(formData.phoneNumber))
    )
      newErrors.phoneNumber = "Số điện thoại phải có đúng 10 chữ số!";

    if (formData.age <= 0) newErrors.age = "Tuổi không hợp lệ!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    if (!validateForm()) {
      toast.warning("⚠️ Vui lòng kiểm tra lại thông tin!");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        fullName: formData.fullName,
        dateOfBirth: normalizeDateForApi(formData.dateOfBirth),
        age: formData.age,
        gender: formData.gender,
        address: formData.address,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };

      await userApi.updateUser(formData.userId, payload);

      toast.success("✅ Cập nhật thông tin thành công!");
      navigate(-1);
    } catch (err: any) {
      const msg = err.response?.data?.message || "❌ Không thể cập nhật thông tin!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    setFormData,
    handleChange,
    handleSubmit,
    navigate,
  };
};
