import React from "react";

interface EmailFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({
  id = "email",
  label = "Email Address",
  placeholder = "Enter your email",
  value,
  onChange,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="email"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="email"
        required
      />
    </div>
  );
};

export default EmailField;
