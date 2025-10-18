// src/features/auth/hooks/useLogin.ts
import { useState } from "react";
import { authApi } from "../api/authApi";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.login(formData);

      // 🟢 Lưu token vào localStorage
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      alert("✅ Login successful!");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};
