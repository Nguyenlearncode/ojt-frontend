// src/features/auth/components/PasswordField.tsx

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { ParticleContext } from "../contexts/ParticleContext"; // Correct path

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
    // Trigger gather to the button position
    const button = document.querySelector('.toggle-password');
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth * 100;
      const y = (rect.top + rect.height / 2) / window.innerHeight * 100;
      triggerGather(x, y);
    }
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
