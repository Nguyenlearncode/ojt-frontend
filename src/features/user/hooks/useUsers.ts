import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userApi, type User } from "../api/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🔁 Hàm refetch để gọi lại API khi cần
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userApi.getAllUsers();

      // ✅ Luôn sắp xếp danh sách A → Z theo tên, bất kể backend trả gì
      const sortedData = (data || []).sort((a, b) =>
        a.fullName.localeCompare(b.fullName, "vi", { sensitivity: "base" })
      );

      setUsers(sortedData);
      setError(null);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Lỗi khi tải danh sách người dùng.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // 🔹 Gọi fetch lần đầu
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ✅ Xuất thêm refetch để component khác có thể reload
  return { users, loading, error, refetch: fetchUsers };
};
