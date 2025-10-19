// src/features/auth/components/PasswordField.tsx
import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ParticleContext } from "../contexts/ParticleContext";

interface PasswordFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id = "password",
  label = "Password",
  placeholder = "Enter your password",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(ParticleContext);
  const triggerGather = context?.triggerGather ?? (() => {});

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
    // Giữ nguyên logic trigger nhưng đơn giản hoá để test dễ
    triggerGather(50, 50);
  };

  return (
    <div className="input-group password-group">
      <label htmlFor={id}>{label}</label>
      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          className="toggle-password"
          onClick={handleToggle}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
