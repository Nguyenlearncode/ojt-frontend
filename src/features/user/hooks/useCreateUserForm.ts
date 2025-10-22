import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../api/userApi";
import { normalizeDateForApi } from "../../../utils/formatDate";

export const useCreateUserForm = () => {
  const navigate = useNavigate();

  const initialForm = {
    roleCode: "LAB_USER",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "Male",
    dateOfBirth: "",
    age: 0,
    phone: "",
    address: "",
    email: "",
    cccd: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const calcAge = (dob: string): number => {
    if (!dob) return 0;
    const [year, month, day] = dob.split("-").map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

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
    const required = ["fullName", "email", "phone", "address", "cccd", "password", "confirmPassword", "dateOfBirth"];
    required.forEach((field) => {
      if (!formData[field as keyof typeof formData]) newErrors[field] = "Vui lòng nhập thông tin!";
    });

    // Kiểm tra email đúng định dạng
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ!";

    // Kiểm tra mật khẩu
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";

    const passwordRegex = /^(?=^[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (formData.password && !passwordRegex.test(formData.password))
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự, bắt đầu bằng chữ in hoa, có 1 số và 1 ký tự đặc biệt!";

    // Số điện thoại
    if (formData.phone && (formData.phone.length !== 10 || !/^[0-9]+$/.test(formData.phone)))
      newErrors.phone = "Số điện thoại phải có đúng 10 chữ số!";

    // Tuổi phải lớn hơn 0
    if (formData.age <= 0) newErrors.age = "Tuổi không hợp lệ!";

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
        phoneNumber: formData.phone,
        fullName: formData.fullName,
        identifyNumber: formData.cccd,
        gender: formData.gender,
        age: formData.age,
        address: formData.address,
        dateOfBirth: normalizeDateForApi(formData.dateOfBirth),
        password: formData.password,
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
    showPassword,
    showConfirm,
    setShowPassword,
    setShowConfirm,
    handleChange,
    handleSubmit,
    handleReset,
    handleBack,
  };
};
