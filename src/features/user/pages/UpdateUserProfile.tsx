import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UpdateUserProfile.css";
import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { useUserById } from "../hooks/useUserById";
import { getUserInfo } from "../../../utils/jwtHelper";
import DeleteUserButton from "../components/Button/DeleteUserButton"; // 🔹 import component mới
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiSave,
  FiX,
  FiLoader,
  FiEdit,
  FiAlertTriangle
} from "react-icons/fi";

const UpdateUserProfile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const userFromState = location.state?.user;
  const userIdFromUrl = searchParams.get("userId");

  // Lấy ID người dùng hiện tại từ token nếu không có trong URL
  const currentUserInfo = getUserInfo();
  const currentUserId = currentUserInfo?.sub;

  // Dùng userId trong URL hoặc fallback sang user hiện tại
  const targetUserId = userIdFromUrl || currentUserId;

  // Fetch thông tin user từ API
  const {
    user: userFromApi,
    loading: loadingUser,
    error: errorUser,
  } = useUserById(targetUserId || undefined);

  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    fullName: "",
    gender: "",
    age: 0,
    dateOfBirth: "",
    phone: "",
    address: "",
    email: "",
    cccd: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Cập nhật dữ liệu form khi load user xong
  useEffect(() => {
    const userData = userFromApi || userFromState;
    if (userData) {
      setFormData({
        userId: userData.userId || "",
        username: userData.email?.split("@")[0] || "",
        fullName: userData.fullName || "",
        gender: userData.gender || "",
        age: userData.age || 0,
        dateOfBirth: userData.dateOfBirth || "",
        phone: userData.phoneNumber || "",
        address: userData.address || "",
        email: userData.email || "",
        cccd: userData.identifyNumber || "",
      });
    }
  }, [userFromApi, userFromState]);

  /** 🔹 Xử lý thay đổi input */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /** 🔹 Cập nhật ngày sinh và tuổi */
  const handleDateChange = (value: string) => {
    const birthDate = new Date(value);
    const today = new Date();
    const age =
      today.getFullYear() -
      birthDate.getFullYear() -
      (today < new Date(birthDate.setFullYear(today.getFullYear())) ? 1 : 0);
    setFormData({ ...formData, dateOfBirth: value, age });
  };

  /** 🔹 Lưu thay đổi */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    setIsEditMode(false);
  };

  // 🌀 Loading
  if (loadingUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          flexDirection: "column",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader size={48} color="#667eea" />
        </motion.div>
        <p style={{ marginTop: "1rem", color: "#6b7280" }}>
          Loading user information...
        </p>
      </div>
    );
  }

  // ⚠️ Error
  if (errorUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: "center",
            padding: "2rem",
            background: "#fee2e2",
            borderRadius: "12px",
          }}
        >
          <FiAlertTriangle size={48} color="#ef4444" />
          <h3 style={{ marginTop: "1rem", color: "#dc2626" }}>{errorUser}</h3>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/UserManagement")}
          >
            Quay lại
          </button>
        </motion.div>
      </div>
    );
  }

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
              {isEditMode ? "Update User Profile" : "View User Profile"}
            </h1>
            <p className="profile-subtitle">
              {isEditMode
                ? "Edit and update user account information"
                : "View user account information"}
            </p>
          </div>
          {!isEditMode && (
            <motion.button
              className="create-user-btn"
              onClick={() => setIsEditMode(true)}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "700",
                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
                border: "none",
                color: "white",
              }}
            >
              <FiEdit size={22} />
              <span>Edit Profile</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="profile-content-wrapper">
        <div className="row g-4">
          {/* 🔹 Cột trái - Avatar */}
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
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      formData.fullName || "User"
                    )}&size=200&background=667eea&color=fff`}
                    className="avatar-image"
                    alt="avatar"
                  />
                </div>
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
                {/* Full Name */}
                <div className="form-field">
                  <label className="field-label">
                    <FiUser size={18} />
                    Họ và tên
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    disabled={!isEditMode}
                  />
                </div>

                {/* Email */}
                <div className="form-field">
                  <label className="field-label">
                    <FiMail size={18} />
                    Email
                  </label>
                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    disabled={!isEditMode}
                  />
                </div>

                {/* Phone */}
                <div className="form-field">
                  <label className="field-label">
                    <FiPhone size={18} />
                    Số điện thoại
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    disabled={!isEditMode}
                  />
                </div>

                {/* Address */}
                <div className="form-field">
                  <label className="field-label">
                    <FiMapPin size={18} />
                    Địa chỉ
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    disabled={!isEditMode}
                  />
                </div>

                {/* Row: Gender & DOB */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-field">
                      <label className="field-label">
                        <FiUser size={18} />
                        Giới tính
                      </label>
                      <GenderSelect
                        value={formData.gender}
                        onChange={(gender) =>
                          isEditMode && setFormData({ ...formData, gender })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-field">
                      <label className="field-label">
                        <FiCalendar size={18} />
                        Ngày sinh
                      </label>
                      <DateField
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleDateChange}
                        disabled={!isEditMode}
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

                {/* 🔹 Action Buttons */}
                {isEditMode && (
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
                      onClick={() => setIsEditMode(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiX size={18} />
                      Cancel
                    </motion.button>

                    {/* ✅ Dùng component tách riêng */}
                    <DeleteUserButton
                      userId={formData.userId}
                      fullName={formData.fullName}
                    />
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
