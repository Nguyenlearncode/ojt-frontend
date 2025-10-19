// src/features/auth/components/LogoutButton.tsx

import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "../hooks/useLogout";

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
      console.error("Logout failed:", error);
    }
  };

  const renderButton = () => {
    /* istanbul ignore next */
    const isDisabled = loading;

    return (
      <button
        type="button"
        className="logout-btn"
        aria-label="logout-button"
        disabled={isDisabled}
        onClick={!isDisabled ? handleLogoutClick : undefined}
      >
        <FiLogOut size={20} />
        {expanded && <span>Logout</span>}
      </button>
    );
  };

  return renderButton();
};

export default LogoutButton;
