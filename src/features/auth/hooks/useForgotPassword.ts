// src/features/auth/hooks/useForgotPassword.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      toast.success("Password reset link has been sent to your email!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to send reset link";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { email, loading, error, handleChange, handleSubmit };
};

