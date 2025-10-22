import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UserRow } from "./UserTable/UserRow";
import { EmptyState } from "./UserTable/EmptyState";
import UserDetailModal from "./UserDetailModal";
import type { User } from "../api/userApi";
import "../styles/UserTableModern.css";

export const UserTableModern: React.FC<{
  users: User[];
  onEdit?: (user: User) => void;
}> = ({ users, onEdit }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <>
      <div className="modern-table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Thông tin</th>
              <th>Liên hệ</th>
              <th>Vai trò</th>
              <th>Giới tính</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {users.map((user, i) => (
                <UserRow
                  key={user.userId}
                  user={user}
                  index={i}
                  onView={() => setSelectedUser(user)}
                  onEdit={onEdit ? () => onEdit(user) : undefined}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {users.length === 0 && <EmptyState />}
      </div>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};
