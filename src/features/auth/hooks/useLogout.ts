import { logoutApi } from "../api/logoutApi";
import type { LogoutRequest } from "../api/logoutApi";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

export const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async (data: LogoutRequest) => {
    setLoading(true);
    try {
      await logoutApi(data); // Gọi API logout thật
      // ✅ Chỉ xóa token khi API thành công
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // ❌ Không xóa token nếu API lỗi
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { logout, loading };
};
