// src/features/auth/components/LogoutButton.tsx

import React from "react";
import { Button, Icon, Text } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLogout } from "../hooks/useLogout";

const MotionButton = motion(Button);

interface LogoutButtonProps {
  expanded: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ expanded }) => {
  /* istanbul ignore next */
  const { logout = async () => {}, loading = false } = useLogout() || {};

  const handleLogoutClick = async () => {
    const refreshToken = localStorage.getItem("refreshToken") || "";
    try {
      await logout({ refreshToken });
    } catch (error) {
      // Logout error handled in useLogout hook
    }
  };

  return (
    <MotionButton
      onClick={handleLogoutClick}
      isLoading={loading}
      loadingText={expanded ? "Logging out..." : ""}
      width="full"
      size="md"
      colorScheme="red"
      variant="solid"
      leftIcon={<Icon as={FiLogOut} boxSize={5} />}
      justifyContent={expanded ? "flex-start" : "center"}
      pl={expanded ? 4 : 0}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      bg="red.500"
      color="white"
      _hover={{
        bg: "red.600",
        boxShadow: "lg",
      }}
      _active={{
        bg: "red.700",
      }}
      boxShadow="md"
      aria-label="logout-button"
    >
      {expanded && (
        <Text ml={2} fontWeight="600">
          Logout
        </Text>
      )}
    </MotionButton>
  );
};

export default LogoutButton;
