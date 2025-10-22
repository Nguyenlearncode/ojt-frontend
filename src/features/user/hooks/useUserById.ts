import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi, type User } from "../api/userApi";

export const useUserById = (userId: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await userApi.getUserById(userId);
        setUser(data);
        setError(null);
      } catch (err: any) {
        // Check if it's a 401 Unauthorized error
        if (err?.response?.status === 401) {
          setError("Session expired. Please login again.");
          // Clear invalid tokens
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Redirect to login after a short delay
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setError(err?.response?.data?.message || "Lỗi khi tải thông tin người dùng.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  return { user, loading, error };
};

