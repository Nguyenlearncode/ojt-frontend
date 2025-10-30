import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="600" color="gray.700">
        Email Address
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiMail} color="gray.400" />
        </InputLeftElement>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={value}
          onChange={onChange}
          size="lg"
          bg="white"
          focusBorderColor="brand.500"
        />
      </InputGroup>
    </FormControl>
  );
};

export default EmailField;
