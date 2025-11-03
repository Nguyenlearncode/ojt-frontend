import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import EyeLottie from "./EyeLottie";

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
          <LockIcon color="gray.400" />
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
        <InputRightElement width="4rem">
          <IconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            icon={<EyeLottie />}
            variant="ghost"
            size="md"
            onClick={onTogglePassword}
            _hover={{ bg: "gray.100" }}
            transition="all 0.2s"
            minW="auto"
            h="auto"
            p={1}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordField;
