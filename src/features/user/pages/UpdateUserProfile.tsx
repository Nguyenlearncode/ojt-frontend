import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UpdateUserProfile.css";
import ChangePasswordModal from "../../auth/components/ChangePasswordModal";
import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { formatDate } from "../../../utils/formatDate";
import { userApi } from "../api/userApi";
import { 
  FiTrash2, 
  FiAlertTriangle, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar,
  FiKey,
  FiCamera,
  FiSave,
  FiX
} from "react-icons/fi";

const UpdateUserProfile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userFromState = location.state?.user;

  const [formData, setFormData] = useState({
    userId: userFromState?.userId || "",
    username: userFromState?.username || "janeuser",
    fullName: userFromState?.fullName || "Jane Bishop",
    gender: userFromState?.gender || "Female",
    age: userFromState?.age || 28,
    dateOfBirth: userFromState?.dateOfBirth || "1997-02-10",
    phone: userFromState?.phoneNumber || "0987654321",
    address: userFromState?.address || "123 Main Street, Hanoi",
    email: userFromState?.email || "janesemail@gmail.com",
    cccd: userFromState?.cccd || "079123456789",
    avatar: "",
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /** 🔹 Xử lý thay đổi input chung */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /** 🔹 Xử lý chọn ngày sinh → cập nhật tuổi */
  const handleDateChange = (value: string) => {
    const birthDate = new Date(value);
    const today = new Date();
    const age =
      today.getFullYear() -
      birthDate.getFullYear() -
      (today < new Date(birthDate.setFullYear(today.getFullYear())) ? 1 : 0);
    setFormData({ ...formData, dateOfBirth: value, age });
  };

  /** 🔹 Xử lý upload ảnh đại diện */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setFormData({ ...formData, avatar: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  /** 🔹 Lưu thay đổi */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      dateOfBirth: formatDate(formData.dateOfBirth),
    };
    // TODO: Implement API call to update user
    alert("Profile updated successfully!");
  };

  /** 🔹 Hủy thay đổi */
  const handleCancel = () => {
    navigate("/UserManagement");
  };

  /** 🔹 Xóa tài khoản */
  const handleDeleteAccount = async () => {
    if (!formData.userId) {
      alert("Không tìm thấy User ID!");
      return;
    }

    setIsDeleting(true);
    try {
      await userApi.deleteUser(formData.userId);
      alert("Đã xóa tài khoản thành công!");
      navigate("/UserManagement");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Không thể xóa tài khoản. Vui lòng thử lại!");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="update-profile-modern-container">
      {/* Header */}
      <motion.div
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div>
            <h1 className="profile-title">
              <FiUser className="me-2" />
              Update User Profile
            </h1>
            <p className="profile-subtitle">
              Manage and update user account information
            </p>
          </div>
        </div>
      </motion.div>

      <div className="profile-content-wrapper">
        <div className="row g-4">
          {/* 🔹 Cột trái - Avatar Card */}
          <div className="col-lg-4">
            <motion.div
              className="avatar-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="avatar-wrapper">
                <div className="avatar-container">
                  <img
                    src={formData.avatar || "https://ui-avatars.com/api/?name=" + formData.fullName + "&size=200&background=667eea&color=fff"}
                    className="avatar-image"
                    alt="avatar"
                  />
                  <div className="avatar-overlay">
                    <FiCamera size={32} />
                    <span>Change Photo</span>
                  </div>
                </div>
                <input
                  type="file"
                  className="avatar-file-input"
                  id="avatarInput"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <label htmlFor="avatarInput" className="avatar-upload-btn">
                  <FiCamera className="me-2" />
                  Upload New Photo
                </label>
              </div>

              <div className="user-info-card">
                <h4 className="user-name">{formData.fullName}</h4>
                <p className="user-email">{formData.email}</p>
                <div className="user-meta">
                  <span className="meta-badge">
                    <FiUser size={14} />
                    {formData.username}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 🔹 Cột phải - Form */}
          <div className="col-lg-8">
            <motion.div
              className="form-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="form-card-title">Personal Information</h3>

              <form className="modern-form" onSubmit={handleSubmit}>
                {/* Full name */}
                <div className="form-field">
                  <label className="field-label">
                    <FiUser size={18} />
                    Full Name
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div className="form-field">
                  <label className="field-label">
                    <FiMail size={18} />
                    Email Address
                  </label>
                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>

                {/* Phone */}
                <div className="form-field">
                  <label className="field-label">
                    <FiPhone size={18} />
                    Phone Number
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Address */}
                <div className="form-field">
                  <label className="field-label">
                    <FiMapPin size={18} />
                    Address
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </div>

                {/* Row: Gender & Date of Birth */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-field">
                      <label className="field-label">
                        <FiUser size={18} />
                        Gender
                      </label>
                      <GenderSelect
                        value={formData.gender}
                        onChange={(gender) => setFormData({ ...formData, gender })}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-field">
                      <label className="field-label">
                        <FiCalendar size={18} />
                        Date of Birth
                      </label>
                      <DateField
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Row: Age & CCCD */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-field">
                      <label className="field-label">
                        <FiCalendar size={18} />
                        Age
                      </label>
                      <input
                        className="field-input"
                        type="number"
                        name="age"
                        value={formData.age}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-field">
                      <label className="field-label">
                        <FiUser size={18} />
                        ID Number (CCCD)
                      </label>
                      <input
                        className="field-input"
                        type="text"
                        name="cccd"
                        value={formData.cccd}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Change Password Button */}
                <div className="form-field">
                  <button
                    type="button"
                    className="btn-change-password"
                    onClick={() => setShowChangePassword(true)}
                  >
                    <FiKey size={18} />
                    Change Password
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="form-actions">
                  <motion.button
                    type="submit"
                    className="btn-save"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiSave size={18} />
                    Save Changes
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    className="btn-cancel"
                    onClick={handleCancel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiX size={18} />
                    Cancel
                  </motion.button>

                  <motion.button
                    type="button"
                    className="btn-delete"
                    onClick={() => setShowDeleteConfirm(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiTrash2 size={18} />
                    Delete Account
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <FiAlertTriangle size={64} color="#ef4444" />
            </div>
            <h3 className="delete-modal-title">Xác nhận xóa tài khoản</h3>
            <p className="delete-modal-message">
              Bạn có chắc chắn muốn xóa tài khoản <strong>{formData.fullName}</strong>?
              <br />
              <span className="delete-modal-warning">
                ⚠️ Hành động này không thể hoàn tác!
              </span>
            </p>
            <div className="delete-modal-actions">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Hủy
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <FiTrash2 size={16} className="me-2" />
                    Xác nhận xóa
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <hr />
    </div>
  );
};

export default UpdateUserProfile;
