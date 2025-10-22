// src/features/user/components/UserTable.tsx
import React from "react";
import type { User } from "../api/userApi";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="ump-table align-middle mb-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Gender</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, index) => (
          <tr key={u.userId}>
            <td>{index + 1}</td>
            <td>{u.fullName}</td>
            <td>{u.email}</td>
            <td>{u.role?.roleName || "N/A"}</td>
            <td>{u.gender}</td>
            <td>
              <button className="ump-action-btn ump-edit me-2">Sửa</button>
              <button className="ump-action-btn ump-delete me-2">Xóa</button>
              <button className="ump-action-btn ump-view">Xem</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
