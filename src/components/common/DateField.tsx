import React from "react";
import { toInputDateFormat } from "../../utils/formatDate";

interface DateFieldProps {
  label?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  name,
  value,
  onChange,
  className = "form-control",
  disabled = false,
}) => {
  return (
    <div className="date-field">
      {label && (
        <label
          htmlFor={name}
          className="form-label"
          style={{ fontWeight: 500 }}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type="date"
        className={className}
        value={toInputDateFormat(value)} // đảm bảo format chuẩn YYYY-MM-DD
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default DateField;
