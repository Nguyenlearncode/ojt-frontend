// src/features/user/pages/UserManagementPage.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UserManagementPage.css";
import UserTable from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";

const UserManagementPage: React.FC = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <div className="text-center mt-4">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center mt-4 text-danger">{error}</div>;

  return (
    <div className="ump-page container-xl mt-4">
      <div className="ump-table-responsive">
        <div className="ump-table-wrapper">
          <div className="ump-table-title d-flex justify-content-between align-items-center">
            <h2 className="m-0">
              User <b>Management</b>
            </h2>
            <div>
              <a href="/CreateUser" className="ump-btn me-2" style={{ textDecoration: "none" }}>
                Tạo tài khoản
              </a>
              <button className="ump-btn">Quản lí vai trò</button>
            </div>
          </div>

          <UserTable users={users} />

          <div className="d-flex justify-content-between align-items-center">
            <span className="ump-hint-text">
              Showing <b>{users.length}</b> entries
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
