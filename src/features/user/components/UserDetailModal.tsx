import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser } from "react-icons/fi";
import type { User } from "../api/userApi";
import "../styles/UserDetailModal.css";
import DeleteUserButton from "./DeleteUserButton";

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

// 🧩 Component hiển thị 1 dòng thông tin
const InfoItem = ({
  icon: Icon,
  label,
  value,
  fullWidth,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
  fullWidth?: boolean;
}) => (
  <div className={`info-item ${fullWidth ? "full-width" : ""}`}>
    <div className="info-label">
      <Icon size={18} />
      <span>{label}</span>
    </div>
    <div className="info-value">{value || "N/A"}</div>
  </div>
);

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  // 🧾 Cấu hình thông tin hiển thị
  const infoFields = [
    { icon: FiUser, label: "User ID", value: user.userId },
    { icon: FiMail, label: "Email", value: user.email },
    { icon: FiPhone, label: "Phone Number", value: user.phoneNumber },
    { icon: FiCalendar, label: "Date of Birth", value: user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : null },
    { icon: FiUser, label: "Gender", value: user.gender },
    { icon: FiUser, label: "Age", value: user.age },
    { icon: FiMapPin, label: "Address", value: user.address, fullWidth: true },
  ];

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
            <h2>Thông tin người dùng</h2>
            <button className="close-btn" onClick={onClose}>
              <FiX size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <div className="user-profile">
              <div className="profile-avatar-large">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
              <h3 className="profile-name">{user.fullName}</h3>
              <span
                className={`role-badge ${
                  user.role?.roleName?.toLowerCase() || ""
                }`}
              >
                {user.role?.roleName || "N/A"}
              </span>
            </div>

            {/* ✅ Render động các thông tin */}
            <div className="user-info-grid">
              {infoFields.map((f, i) => (
                <InfoItem
                  key={i}
                  icon={f.icon}
                  label={f.label}
                  value={String(f.value ?? "")}
                  fullWidth={f.fullWidth}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Đóng
            </button>
            <DeleteUserButton userId={user.userId} fullName={user.fullName} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserDetailModal;
