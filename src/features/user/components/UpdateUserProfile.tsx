import React from "react";
import { motion } from "framer-motion";
import {
  FiUserCheck,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiHash,
  FiUser,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CreateUser.css";
import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { useUpdateUserProfile } from "../hooks/useUpdateUserProfile";

const UpdateUserProfile: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    setFormData,
    handleChange,
    handleSubmit,
    navigate,
  } = useUpdateUserProfile();

  if (!formData) return <p className="text-center mt-5">Đang tải dữ liệu...</p>;

  return (
    <div className="create-user-modern-container">
      <motion.div
        className="create-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <h1 className="create-title">
            <FiUserCheck className="me-2" /> Update User Profile
          </h1>
          <p className="create-subtitle">
            Edit and update your existing account information
          </p>
        </div>
      </motion.div>

      <motion.div
        className="create-form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="form-card-header">
          <FiUser size={24} />
          <h3>User Information</h3>
        </div>

        <form className="modern-create-form" onSubmit={handleSubmit}>
          {[
            { name: "fullName", label: "Full Name", icon: <FiUser size={18} /> },
            { name: "email", label: "Email Address", icon: <FiMail size={18} /> },
            { name: "phoneNumber", label: "Phone Number", icon: <FiPhone size={18} /> },
            { name: "address", label: "Address", icon: <FiMapPin size={18} /> },
          ].map(({ name, label, icon }) => (
            <div className="form-field" key={name}>
              <label className="field-label">
                {icon} {label}
              </label>
              <input
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className={`field-input ${errors[name] ? "is-invalid" : ""}`}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              {errors[name] && (
                <div className="text-danger small mt-1">{errors[name]}</div>
              )}
            </div>
          ))}

          <div className="row g-3">
            <div className="col-md-4">
              <div className="form-field">
                <label className="field-label">
                  <FiUser size={18} /> Gender
                </label>
                <GenderSelect
                  value={formData.gender}
                  onChange={(gender) =>
                    setFormData((prev) => (prev ? { ...prev, gender } : prev))
                  }
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-field">
                <label className="field-label">
                  <FiCalendar size={18} /> Date of Birth
                </label>
                <DateField
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(value) =>
                    setFormData((prev) =>
                      prev ? { ...prev, dateOfBirth: value } : prev
                    )
                  }
                />
                {errors.dateOfBirth && (
                  <div className="text-danger small mt-1">
                    {errors.dateOfBirth}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-field">
                <label className="field-label">
                  <FiHash size={18} /> Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  readOnly
                  className="field-input bg-light"
                />
                {errors.age && (
                  <div className="text-danger small mt-1">{errors.age}</div>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <motion.button
              type="submit"
              className="btn-create"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Updating...
                </>
              ) : (
                <>
                  <FiSave size={18} /> Update Profile
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              className="btn-back"
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiArrowLeft size={18} /> Go Back
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateUserProfile;
