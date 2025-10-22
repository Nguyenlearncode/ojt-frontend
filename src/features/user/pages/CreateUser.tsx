import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CreateUser.css";
import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { formatDate } from "../../../utils/formatDate";
import {
  FiUserPlus,
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiSave,
  FiRefreshCw,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";

const CreateUser: React.FC = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    gender: "Male",
    dateOfBirth: "",
    phone: "",
    address: "",
    email: "",
    cccd: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (value: string) => {
    setFormData({ ...formData, dateOfBirth: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const payload = {
      ...formData,
      dateOfBirth: formatDate(formData.dateOfBirth),
    };

    // TODO: Implement API call to create user
    alert("Tạo tài khoản thành công!");
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      fullName: "",
      gender: "Male",
      dateOfBirth: "",
      phone: "",
      address: "",
      email: "",
      cccd: "",
    });
    setConfirmPassword("");
  };

  const handleBack = () => {
    navigate(-1); // 👈 quay lại trang trước
  };

  return (
    <div className="create-user-modern-container">
      {/* Header */}
      <motion.div
        className="create-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div>
            <h1 className="create-title">
              <FiUserPlus className="me-2" />
              Create New User Account
            </h1>
            <p className="create-subtitle">
              Add a new user to the laboratory management system
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form Card */}
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
          {/* Account Credentials Section */}
          <div className="form-section">
            <h4 className="section-title">Account Credentials</h4>
            
            <div className="form-field">
              <label className="field-label">
                <FiUser size={18} />
                Username
              </label>
              <input
                type="text"
                name="username"
                className="field-input"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-field">
                  <label className="field-label">
                    <FiLock size={18} />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="field-input"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-field">
                  <label className="field-label">
                    <FiLock size={18} />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="field-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="form-section">
            <h4 className="section-title">Personal Information</h4>

            <div className="form-field">
              <label className="field-label">
                <FiUser size={18} />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="field-input"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <FiMail size={18} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="field-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <FiPhone size={18} />
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                className="field-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <FiMapPin size={18} />
                Address
              </label>
              <input
                type="text"
                name="address"
                className="field-input"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>

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

            <div className="form-field">
              <label className="field-label">
                <FiUser size={18} />
                ID Number (CCCD)
              </label>
              <input
                type="text"
                name="cccd"
                className="field-input"
                value={formData.cccd}
                onChange={handleChange}
                placeholder="Enter ID number"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <motion.button
              type="submit"
              className="btn-create"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiSave size={18} />
              Create Account
            </motion.button>

            <motion.button
              type="button"
              className="btn-reset"
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiRefreshCw size={18} />
              Reset Form
            </motion.button>

            <motion.button
              type="button"
              className="btn-back"
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiArrowLeft size={18} />
              Go Back
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
export default CreateUser;
