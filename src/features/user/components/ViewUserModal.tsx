// src/features/user/components/ViewUserModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser } from "react-icons/fi";
import type { User } from "../api/userApi";
import "../styles/ViewUserModal.css";

interface ViewUserModalProps {
  user: User;
  onClose: () => void;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ user, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="view-modal-container"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <h2>User Details</h2>
            <button className="close-btn" onClick={onClose}>
              <FiX size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <div className="user-profile">
              <div className="profile-avatar-large">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <h3 className="profile-name">{user.fullName}</h3>
              <span className={`role-badge ${user.role?.roleName?.toLowerCase()}`}>
                {user.role?.roleName || "N/A"}
              </span>
            </div>

            <div className="user-info-grid">
              <div className="info-item">
                <div className="info-label">
                  <FiUser size={18} />
                  <span>User ID</span>
                </div>
                <div className="info-value">{user.userId}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <FiMail size={18} />
                  <span>Email</span>
                </div>
                <div className="info-value">{user.email}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <FiPhone size={18} />
                  <span>Phone Number</span>
                </div>
                <div className="info-value">{user.phoneNumber || "N/A"}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <FiCalendar size={18} />
                  <span>Date of Birth</span>
                </div>
                <div className="info-value">
                  {user.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <FiUser size={18} />
                  <span>Gender</span>
                </div>
                <div className="info-value">{user.gender}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <FiUser size={18} />
                  <span>Age</span>
                </div>
                <div className="info-value">{user.age || "N/A"}</div>
              </div>

              <div className="info-item full-width">
                <div className="info-label">
                  <FiMapPin size={18} />
                  <span>Address</span>
                </div>
                <div className="info-value">{user.address || "N/A"}</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewUserModal;

