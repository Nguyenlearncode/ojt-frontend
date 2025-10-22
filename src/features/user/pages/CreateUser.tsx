import React from "react";
import { motion } from "framer-motion";
import {
  FiUserPlus,
  FiShield,
  FiCheckCircle,
  FiSave,
  FiRefreshCw,
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiHash,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CreateUser.css";

import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import AccountFields from "../components/AccountFields";
import { useCreateUserForm } from "../hooks/useCreateUserForm";

const CreateUser: React.FC = () => {
  const {
    formData,
    setFormData,
    errors,
    loading,
    showPassword,
    showConfirm,
    setShowPassword,
    setShowConfirm,
    handleChange,
    handleSubmit,
    handleReset,
    handleBack,
  } = useCreateUserForm();

  return (
    <div className="create-user-modern-container">
      {/* Header */}
      <motion.div
        className="create-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <h1 className="create-title">
            <FiUserPlus className="me-2" /> Create New User Account
          </h1>
          <p className="create-subtitle">
            Add a new user to the laboratory management system
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        className="create-form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="form-card-header">
          <FiCheckCircle size={24} />
          <h3>User Information</h3>
        </div>

        <form className="modern-create-form" onSubmit={handleSubmit}>
          {/* Role */}
          <div className="form-field">
            <label className="field-label">
              <FiShield size={18} /> Role
            </label>
            <select
              name="roleCode"
              value={formData.roleCode}
              onChange={handleChange}
              className="field-input"
              required
            >
              <option value="LAB_USER">LAB_USER</option>
              <option value="SERVICE">SERVICE</option>
              <option value="LAB_MANAGER">LAB_MANAGER</option>
              <option value="CUSTOM_ROLE">CUSTOM_ROLE</option>
            </select>
          </div>

          {/* Account Fields */}
          <AccountFields
            formData={formData}
            errors={errors}
            showPassword={showPassword}
            showConfirm={showConfirm}
            setShowPassword={setShowPassword}
            setShowConfirm={setShowConfirm}
            handleChange={handleChange}
          />

          {/* Personal Info */}
          <section className="form-section">
            <h4 className="section-title">Personal Information</h4>

            {[
              { name: "fullName", label: "Full Name", icon: <FiUser size={18} /> },
              { name: "email", label: "Email Address", icon: <FiMail size={18} /> },
              { name: "phone", label: "Phone Number", icon: <FiPhone size={18} /> },
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
                      setFormData((prev) => ({ ...prev, gender }))
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
                      setFormData((prev) => ({ ...prev, dateOfBirth: value }))
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

            <div className="form-field">
              <label className="field-label">
                <FiUser size={18} /> ID Number (CCCD)
              </label>
              <input
                name="cccd"
                value={formData.cccd}
                onChange={handleChange}
                className={`field-input ${errors.cccd ? "is-invalid" : ""}`}
                placeholder="Enter ID number"
              />
              {errors.cccd && (
                <div className="text-danger small mt-1">{errors.cccd}</div>
              )}
            </div>
          </section>

          {/* Buttons */}
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
                  Creating...
                </>
              ) : (
                <>
                  <FiSave size={18} /> Create Account
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              className="btn-reset"
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiRefreshCw size={18} /> Reset Form
            </motion.button>

            <motion.button
              type="button"
              className="btn-back"
              onClick={handleBack}
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

export default CreateUser;
