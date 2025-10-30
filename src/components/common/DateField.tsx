import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { toInputDateFormat } from "../../utils/formatDate";

interface DateFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange: (value: string, age: number) => void;
  colorScheme?: "blue" | "purple";
  format?: "MM/dd/yyyy" | "dd/MM/yyyy";
  isInvalid?: boolean;
  error?: string;
}

export const DateField: React.FC<DateFieldProps> = ({
  label,
  name,
  value = "",
  onChange,
  colorScheme = "blue",
  format = "MM/dd/yyyy",
  isInvalid,
  error,
}) => {
  // 🔹 Hàm tính tuổi
  const calcAge = (dob: string): number => {
    if (!dob) return 0;
    const [year, month, day] = dob.split("-").map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // 🔹 Xử lý thay đổi ngày
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!raw) {
      onChange("", 0);
      return;
    }
    const [year, month, day] = raw.split("-");
    let formatted = "";
    if (format === "MM/dd/yyyy") formatted = `${month}/${day}/${year}`;
    else formatted = `${day}/${month}/${year}`;
    const age = calcAge(raw);
    onChange(formatted, age);
  };

  // 🔹 Hiển thị value trong input dưới dạng yyyy-MM-dd
  const inputValue =
    value && /^\d{2}[/]\d{2}[/]\d{4}$/.test(value)
      ? toInputDateFormat(value)
      : toInputDateFormat(value);

  return (
    <FormControl isInvalid={isInvalid} isRequired>
      <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
        <Icon as={FiCalendar} color={`${colorScheme}.500`} mr={2} />
        {label}
      </FormLabel>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={FiCalendar} color="gray.400" />
        </InputLeftElement>
        <Input
          type="date"
          id={name}
          name={name}
          value={inputValue || ""}
          onChange={handleChange}
          focusBorderColor={`${colorScheme}.400`}
          bg="gray.50"
          transition="all 0.3s"
          _hover={{ bg: `${colorScheme}.50` }}
        />
      </InputGroup>
      {error && (
        <p style={{ color: "red", fontSize: "0.875rem", marginTop: "4px" }}>{error}</p>
      )}
    </FormControl>
  );
};
