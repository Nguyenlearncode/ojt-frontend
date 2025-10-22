import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi, type User } from "../api/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userApi.getAllUsers();
        if (data && data.length > 0) {
          setUsers(data);
          setError(null);
        } else {
          setUsers([]);
          setError(null); // Empty is not an error
        }
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
          setError("Lỗi khi tải danh sách người dùng.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  return { users, loading, error };
};
