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
      await logoutApi(data);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
      setLoading(false);
    }
  }, [navigate]);

  return { logout, loading };
};
