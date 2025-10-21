import { useEffect, useState } from "react";
import { userApi, type User } from "../api/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userApi.getAllUsers();
        if (data && data.length > 0) setUsers(data);
        else setError("Không có người dùng nào.");
      } catch (err) {
        setError("Lỗi khi tải danh sách người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
