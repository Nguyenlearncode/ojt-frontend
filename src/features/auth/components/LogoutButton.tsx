// src/features/auth/components/LogoutButton.tsx

import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useLogout } from "../hooks/useLogout";
import "./LogoutButton.css";

interface LogoutButtonProps {
  expanded: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ expanded }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { logout = async () => {}, loading = false } = useLogout() || {};

  const handleLogoutClick = async () => {
    const refreshToken = localStorage.getItem("refreshToken") || "";
    try {
      await logout({ refreshToken });
    } catch (error) {
      // Logout error handled in useLogout hook
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const moveBg = (e: PointerEvent) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.x) / rect.width) * 100;
      const y = ((e.clientY - rect.y) / rect.height) * 100;
      button.style.setProperty("--x", String(x));
      button.style.setProperty("--y", String(y));
    };

    button.addEventListener("pointermove", moveBg);

    return () => {
      button.removeEventListener("pointermove", moveBg);
    };
  }, []);

  return (
    <>
      <Box
        as="button"
        ref={buttonRef}
        onClick={handleLogoutClick}
        disabled={loading}
        className="gooey-logout-button"
        width="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        aria-label="logout-button"
        position="relative"
      >
        {loading ? "Logging out..." : "Logout"}
      </Box>
      <Box
        as="svg"
        width="0"
        height="0"
        position="absolute"
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1"></feFuncA>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="-5 11"></feFuncA>
          </feComponentTransfer>
        </filter>
      </Box>
    </>
  );
};

export default LogoutButton;
