// src/features/auth/hooks/useResetPassword.ts
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token");
      toast.error("Invalid reset link");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please enter both passwords");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, newPassword: password });
      toast.success("Password has been reset successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to reset password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    token,
    password,
    confirmPassword,
    loading,
    error,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};

