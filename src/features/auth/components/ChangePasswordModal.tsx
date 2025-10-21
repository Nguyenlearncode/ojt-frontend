import React, { useState } from "react";
import "../styles/ChangePasswordModal.css";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleVisibility = (field: string) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }

    console.log("Password changed:", formData);
    alert("Password changed successfully!");
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    onClose(); // đóng modal sau khi đổi xong
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Change Password</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Current Password */}
          <div className="form-group">
            <label>Current Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-btn"
                onClick={() => toggleVisibility("current")}
              >
                {showPassword.current ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label>New Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-btn"
                onClick={() => toggleVisibility("new")}
              >
                {showPassword.new ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-btn"
                onClick={() => toggleVisibility("confirm")}
              >
                {showPassword.confirm ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button type="submit" className="btn-save">
              Save Password
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
