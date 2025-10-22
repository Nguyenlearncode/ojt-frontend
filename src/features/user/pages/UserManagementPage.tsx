// src/features/user/pages/UserManagementPage.tsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiUsers } from "react-icons/fi";
import "../styles/UserManagementPage.css";
import SearchFilter from "../components/SearchFilter";
import UserTableModern from "../components/UserTableModern";
import Pagination from "../components/Pagination";
import { useUsers } from "../hooks/useUsers";

const UserManagementPage: React.FC = () => {
  const { users, loading, error } = useUsers();
  const navigate = useNavigate();

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber?.includes(searchTerm);

      const matchesRole = roleFilter === "" || user.role?.roleName === roleFilter;
      const matchesGender = genderFilter === "" || user.gender === genderFilter;

      return matchesSearch && matchesRole && matchesGender;
    });
  }, [users, searchTerm, roleFilter, genderFilter]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handlers
  const handleEdit = (user: any) => {
    navigate("/UpdateUserProfile", { state: { user } });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiUsers size={48} />
        </motion.div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes("Session expired") || error.includes("login");
    
    return (
      <div className="error-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="error-card"
        >
          {isAuthError ? (
            <>
              <h3>🔒 {error}</h3>
              <p>Phiên đăng nhập đã hết hạn. Đang chuyển hướng đến trang đăng nhập...</p>
              <button 
                className="btn-retry" 
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Đi đến trang đăng nhập ngay
              </button>
            </>
          ) : (
            <>
              <h3>❌ {error}</h3>
              <p>Không thể tải người dùng. Vui lòng thử lại.</p>
              <button className="btn-retry" onClick={() => window.location.reload()}>
                Thử lại
              </button>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="user-management-page">
      {/* Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div>
            <h1 className="page-title">Quản lý người dùng</h1>
            <p className="page-subtitle">Quản lý và giám sát tất cả người dùng trong hệ thống</p>
          </div>
          <motion.button
            className="create-user-btn"
            onClick={() => navigate("/CreateUser")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus size={20} />
            <span>Tạo người dùng mới</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        genderFilter={genderFilter}
        onGenderFilterChange={setGenderFilter}
      />

      {/* Table */}
      <UserTableModern
        users={paginatedUsers}
        onEdit={handleEdit}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
