import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  showPassword,
  onTogglePassword,
}) => {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="600" color="gray.700">
        Password
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiLock} color="gray.400" />
        </InputLeftElement>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
          size="lg"
          bg="white"
          focusBorderColor="brand.500"
        />
        <InputRightElement width="3rem">
          <Button
            h="1.75rem"
            size="sm"
            variant="ghost"
            onClick={onTogglePassword}
          >
            <Icon as={showPassword ? FiEyeOff : FiEye} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordField;
