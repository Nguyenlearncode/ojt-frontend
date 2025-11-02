import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Alert,
  AlertIcon,
  Heading,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useChangePassword } from "../hooks/useChangePassword";

const MotionBox = motion(ModalContent);

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    loading,
    error,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useChangePassword();

  const [wasSubmitted, setWasSubmitted] = React.useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWasSubmitted(true);
    await handleSubmit(e);
  };

  // Close modal when password is successfully changed (form is reset)
  React.useEffect(() => {
    if (wasSubmitted && !loading && !error && !currentPassword && !newPassword && !confirmPassword) {
      // Form was reset after successful submission
      const timer = setTimeout(() => {
        onClose();
        setWasSubmitted(false);
      }, 1500); // Wait for toast to show
      return () => clearTimeout(timer);
    }
    if (wasSubmitted && error) {
      setWasSubmitted(false); // Reset on error so we can retry
    }
  }, [wasSubmitted, loading, error, currentPassword, newPassword, confirmPassword, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <MotionBox
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <ModalHeader>
          <VStack align="flex-start" spacing={1}>
            <Heading size="md" color="gray.800">
              Change Password
            </Heading>
            <Text fontSize="sm" color="gray.600" fontWeight="normal">
              Update your account password
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              {/* Current Password */}
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">
                  Current Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    size="md"
                    bg="gray.50"
                    focusBorderColor="brand.500"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      <Icon as={showCurrentPassword ? FiEyeOff : FiEye} boxSize={4} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* New Password */}
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">
                  New Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    size="md"
                    bg="gray.50"
                    focusBorderColor="brand.500"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <Icon as={showNewPassword ? FiEyeOff : FiEye} boxSize={4} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Confirm Password */}
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">
                  Confirm New Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    size="md"
                    bg="gray.50"
                    focusBorderColor="brand.500"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Icon as={showConfirmPassword ? FiEyeOff : FiEye} boxSize={4} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {error && (
                <Alert status="error" borderRadius="lg" w="full">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              isLoading={loading}
              loadingText="Changing..."
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
            >
              Change Password
            </Button>
          </ModalFooter>
        </form>
      </MotionBox>
    </Modal>
  );
};

export default ChangePasswordModal;

