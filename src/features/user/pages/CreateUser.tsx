import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; //
import "../styles/CreateUser.css";
import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { formatDate } from "../../../utils/formatDate";

const CreateUser: React.FC = () => {
  const navigate = useNavigate(); // 👈 hook điều hướng

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

    console.log("Created account:", payload);
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
    <div className="container create-account-container">
      <h3>Tạo tài khoản mới</h3>
      <hr />

      <form className="form-horizontal" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Tên tài khoản:</label>
          <div className="col-lg-8">
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Mật khẩu:</label>
          <div className="col-lg-8">
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Xác nhận mật khẩu:</label>
          <div className="col-lg-8">
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Full name */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Họ và tên:</label>
          <div className="col-lg-8">
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Giới tính:</label>
          <div className="col-lg-8">
            <GenderSelect
              value={formData.gender}
              onChange={(gender) => setFormData({ ...formData, gender })}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Ngày sinh:</label>
          <div className="col-lg-8">
            <DateField
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Số điện thoại:</label>
          <div className="col-lg-8">
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Địa chỉ:</label>
          <div className="col-lg-8">
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Email:</label>
          <div className="col-lg-8">
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* CCCD */}
        <div className="form-group row mb-3">
          <label className="col-lg-3 col-form-label">Số CCCD:</label>
          <div className="col-lg-8">
            <input
              type="text"
              name="cccd"
              className="form-control"
              value={formData.cccd}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="form-group row">
          <div className="col-md-9 offset-md-3 d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Tạo tài khoản
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Làm mới
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleBack}
            >
              Quay về
            </button>
          </div>
        </div>
      </form>

      <hr />
    </div>
  );
};
export default CreateUser;
