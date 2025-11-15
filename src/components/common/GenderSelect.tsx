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
  // Convert value to proper case for display
  const normalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  
  return (
    <FormControl>
      <FormLabel fontWeight="600" color="gray.700">
        {label}
      </FormLabel>
      <Select
        value={normalizedValue}
        onChange={(e) => {
          // Convert to proper case (Male/Female) for backend
          const selected = e.target.value;
          onChange(selected);
        }}
        size="lg"
        focusBorderColor="blue.400"
        bg="gray.50"
        _hover={{ bg: "white" }}
      >
        <option value="Male">Nam</option>
        <option value="Female">Nữ</option>
      </Select>
    </FormControl>
  );
};

export default GenderSelect;
