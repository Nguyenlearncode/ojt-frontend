import React from "react";
import SelectField from "./SelectField";
import { formatGender, parseGender } from "../../utils/formatGender";

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ value, onChange }) => {
  const options = [
    { label: "Nam", value: "Male" },
    { label: "Nữ", value: "Female" },
  ];

  return (
    <SelectField
      name="gender"
      value={parseGender(formatGender(value)) ? value : parseGender(value)}
      onChange={(val) => onChange(val)}
      options={options}
    />
  );
};

export default GenderSelect;
