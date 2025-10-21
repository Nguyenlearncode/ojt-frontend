import React from "react";

interface SelectOption {
  label: string; 
  value: string; 
}

interface SelectFieldProps {
  label?: string; 
  name?: string; 
  value: string; 
  onChange: (value: string) => void; 
  options: SelectOption[]; 
  className?: string; 
  disabled?: boolean; 
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  className = "form-control",
  disabled = false,
}) => {
  return (
    <div className="select-field">
      {label && (
        <label
          htmlFor={name}
          className="form-label"
          style={{ fontWeight: 500 }}
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
