// src/features/UserManagement/components/AccountFields.tsx
import React from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
  formData: any;
  errors: { [key: string]: string };
  showPassword: boolean;
  showConfirm: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AccountFields: React.FC<Props> = ({
  formData,
  errors,
  showPassword,
  showConfirm,
  setShowPassword,
  setShowConfirm,
  handleChange,
}) => {
  const fields = [
    { name: "password", label: "Password", show: showPassword, toggle: () => setShowPassword(!showPassword) },
    { name: "confirmPassword", label: "Confirm Password", show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
  ];

  return (
    <section className="form-section">
      <h4 className="section-title">Account Credentials</h4>
      <div className="row g-3">
        {fields.map(({ name, label, show, toggle }) => (
          <div key={name} className="col-md-6 position-relative">
            <div className="form-field">
              <label className="field-label">
                <FiLock size={18} /> {label}
              </label>
              <div className="input-group">
                <input
                  type={show ? "text" : "password"}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`field-input ${errors[name] ? "is-invalid" : ""}`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggle}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderColor: "#ddd" }}
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors[name] && <div className="text-danger small mt-1">{errors[name]}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountFields;
