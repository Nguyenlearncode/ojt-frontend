import React from "react";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

/**
 * Component chọn giới tính chuẩn Chakra UI
 */
interface GenderSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ label = "Giới tính", value, onChange }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        value={value.toLowerCase()}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </Select>
    </FormControl>
  );
};

export default GenderSelect;
