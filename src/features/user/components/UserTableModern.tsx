// src/features/user/components/UserTableModern.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiEye, FiMail, FiPhone, FiCheckCircle, FiXCircle } from "react-icons/fi";
import type { User } from "../api/userApi";
import UserDetailModal from "./UserDetailModal";
import "../styles/UserTableModern.css";

interface UserTableModernProps {
  users: User[];
  onEdit?: (user: User) => void;
}

const UserTableModern: React.FC<UserTableModernProps> = ({
  users,
  onEdit,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user: User) => {
    if (onEdit) onEdit(user);
  };

  const getRoleBadgeClass = (roleName: string) => {
    switch (roleName?.toLowerCase()) {
      case "administrator":
        return "role-badge admin";
      case "manager":
        return "role-badge manager";
      case "staff":
        return "role-badge staff";
      default:
        return "role-badge user";
    }
  };

  return (
    <>
      <div className="modern-table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((user, index) => (
                <motion.tr
                  key={user.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                >
                  <td className="index-cell">{index + 1}</td>
                  
                  <td>
                    <div className="user-info-cell">
                      <div className="user-avatar">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.fullName}</div>
                        <div className="user-id">ID: {user.userId.slice(0, 8)}...</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="contact-cell">
                      <div className="contact-item">
                        <FiMail size={14} />
                        <span>{user.email}</span>
                      </div>
                      <div className="contact-item">
                        <FiPhone size={14} />
                        <span>{user.phoneNumber || "N/A"}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={getRoleBadgeClass(user.role?.roleName)}>
                      {user.role?.roleName || "N/A"}
                    </span>
                  </td>

                  <td>
                    <span className="gender-badge">{user.gender}</span>
                  </td>

                  <td>
                    <div className="status-badge-wrapper">
                      {user.isActive !== false ? (
                        <motion.span
                          className="status-badge active"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <FiCheckCircle size={16} />
                          <span>Active</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          className="status-badge inactive"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <FiXCircle size={16} />
                          <span>Inactive</span>
                        </motion.span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <motion.button
                        className="action-btn view"
                        onClick={() => handleView(user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </motion.button>

                      <motion.button
                        className="action-btn edit"
                        onClick={() => handleEdit(user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit User"
                      >
                        <FiEdit2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {users.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-icon">👥</div>
            <h3>No users found</h3>
            <p>Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {showViewModal && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </>
  );
};

export default UserTableModern;

