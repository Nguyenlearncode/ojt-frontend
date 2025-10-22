import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UpdateUserProfile.css";
import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { userApi } from "../api/userApi";
import { useUserById } from "../hooks/useUserById";
import { getUserInfo } from "../../../utils/jwtHelper";
import { 
  FiTrash2, 
  FiAlertTriangle, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar,
  FiCamera,
  FiSave,
  FiX,
  FiLoader,
  FiEdit
} from "react-icons/fi";

const UpdateUserProfile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const userFromState = location.state?.user;
  const userIdFromUrl = searchParams.get("userId");
  
  // Get current logged-in user's ID from token if no userId in URL
  const currentUserInfo = getUserInfo();
  const currentUserId = currentUserInfo?.sub;
  
  // Use userId from URL, or fallback to current user's ID
  const targetUserId = userIdFromUrl || currentUserId;
  
  // Use API to fetch user
  const { user: userFromApi, loading: loadingUser, error: errorUser } = useUserById(targetUserId || undefined);

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
    avatar: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Update form data when user is loaded from API or state
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
        avatar: "",
      });
    }
  }, [userFromApi, userFromState]);

  /** 🔹 Xử lý thay đổi input chung */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (value: string) => {
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear() - 
      (today < new Date(birthDate.setFullYear(today.getFullYear())) ? 1 : 0);
    setFormData({ ...formData, dateOfBirth: value, age });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, avatar: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  /** 🔹 Lưu thay đổi */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    setIsEditMode(false);
  };

  const handleDeleteAccount = async () => {
    if (!formData.userId) return alert("Không tìm thấy User ID!");

    setIsDeleting(true);
    try {
      await userApi.deleteUser(formData.userId);
      alert("Đã xóa tài khoản thành công!");
      navigate("/UserManagement");
    } catch (error) {
      alert("Không thể xóa tài khoản. Vui lòng thử lại!");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loadingUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <FiLoader size={48} color="#667eea" />
        </motion.div>
        <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading user information...</p>
      </div>
    );
  }

  if (errorUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '2rem', background: '#fee2e2', borderRadius: '12px' }}
        >
          <FiAlertTriangle size={48} color="#ef4444" />
          <h3 style={{ marginTop: '1rem', color: '#dc2626' }}>{errorUser}</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/UserManagement")}>
            Back to User Management
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
              {isEditMode ? "Edit and update user account information" : "View user account information"}
            </p>
          </div>
          {!isEditMode && (
            <motion.button
              className="create-user-btn"
              onClick={() => setIsEditMode(true)}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 24px rgba(102, 126, 234, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '700',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
                border: 'none',
                color: 'white',
                opacity: 1,
                zIndex: 10
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
                  {isEditMode && (
                    <div className="avatar-overlay">
                      <FiCamera size={32} />
                      <span>Change Photo</span>
                    </div>
                  )}
                </div>
                {isEditMode && (
                  <>
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
                  </>
                )}
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
                    disabled={!isEditMode}
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
                    disabled={!isEditMode}
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
                    disabled={!isEditMode}
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
                    disabled={!isEditMode}
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
                        onChange={(gender) => isEditMode && setFormData({ ...formData, gender })}
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

                {/* Action Buttons - Only show in Edit Mode */}
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
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>

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
              <span className="delete-modal-warning">⚠️ Hành động này không thể hoàn tác!</span>
            </p>
            <div className="delete-modal-actions">
              <button className="btn btn-secondary me-2" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Hủy
              </button>
              <button className="btn btn-danger" onClick={handleDeleteAccount} disabled={isDeleting}>
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
    </div>
  );
};

export default UpdateUserProfile;
