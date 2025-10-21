import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UpdateUserProfile.css";
import ChangePasswordModal from "../../auth/components/ChangePasswordModal";
import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { formatDate } from "../../../utils/formatDate";

const UpdateUserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "janeuser",
    fullName: "Jane Bishop",
    gender: "Female",
    age: 28,
    dateOfBirth: "1997-02-10",
    phone: "0987654321",
    address: "123 Main Street, Hanoi",
    email: "janesemail@gmail.com",
    cccd: "079123456789",
    avatar: "",
  });

  const [showChangePassword, setShowChangePassword] = useState(false);

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
    console.log("Updated profile:", formattedData);
    alert("Profile updated successfully!");
  };

  /** 🔹 Hủy thay đổi */
  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="container update-profile-container">
      <h3>Chỉnh sửa thông tin cá nhân</h3>
      <hr />

      <div className="row">
        {/* 🔹 Cột trái - Avatar */}
        <div className="col-md-3 text-center user-avatar-wrapper">
          <img
            src={formData.avatar || "https://placehold.it/220"}
            className="user-avatar-img"
            alt="avatar"
          />
          <h6 className="user-avatar-text">Tải lên ảnh đại diện mới</h6>
          <input
            type="file"
            className="form-control user-avatar-input"
            onChange={handleFileChange}
          />
        </div>

        {/* 🔹 Cột phải - Thông tin */}
        <div className="col-md-9 personal-info">
          <h3>Thông tin cá nhân</h3>

          <form className="form-horizontal" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group row mb-3">
              <label className="col-lg-3 col-form-label">Tên tài khoản:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={formData.username}
                  readOnly
                />
              </div>
            </div>

            {/* Full name */}
            <div className="form-group row mb-3">
              <label className="col-lg-3 col-form-label">Họ và tên:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
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

            {/* Age */}
            <div className="form-group row mb-3">
              <label className="col-lg-3 col-form-label">Tuổi:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="number"
                  name="age"
                  value={formData.age}
                  readOnly
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group row mb-3">
              <label className="col-lg-3 col-form-label">Số điện thoại:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="phone"
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
                  className="form-control"
                  type="text"
                  name="address"
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
                  className="form-control"
                  type="email"
                  name="email"
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
                  className="form-control"
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  readOnly
                />
              </div>
            </div>

            {/* Change password button */}
            <div className="form-group row mb-3">
              <label className="col-md-3 col-form-label"></label>
              <div className="col-md-8">
                <button
                  type="button"
                  className="btn btn-warning text-white"
                  onClick={() => setShowChangePassword(true)}
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="form-group row">
              <div className="col-md-8 offset-md-3">
                <button type="submit" className="btn btn-primary me-2">
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Hủy
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

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
