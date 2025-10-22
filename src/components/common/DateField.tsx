import React from "react";
import { toInputDateFormat } from "../../utils/formatDate";

interface DateFieldProps {
  label?: string;
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  name,
  value = "",
  onChange,
  className = "form-control",
  disabled = false,
}) => {
  // Hàm xử lý khi người dùng chọn ngày
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; // yyyy-MM-dd
    onChange(newValue); // ✅ Truyền chính xác cho formData.dateOfBirth
  };

  const formattedValue = value && /^\d{4}-\d{2}-\d{2}$/.test(value)
  ? value
  : toInputDateFormat(value);

  return (
    <div className="date-field">
      {label && (
        <label htmlFor={name} className="form-label" style={{ fontWeight: 500 }}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type="date"
        className={className}
        value={formattedValue}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default DateField;
