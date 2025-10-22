import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiLoader, FiLock } from "react-icons/fi";
import { userApi } from "../../api/userApi";
import { getCurrentUserId } from "../../../../utils/tokenUtils";

interface Props {
  userId: string;
  fullName: string;
  initialActive: boolean;
}

export const UserStatusToggleButton: React.FC<Props> = ({
  userId,
  initialActive,
}) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialActive);

  // ✅ Lấy ID người đang đăng nhập
  const currentUserId = getCurrentUserId();
  const isSelf = currentUserId === userId; // so sánh GUID

  const handleToggleStatus = async () => {
    if (loading || isSelf) return;

    setLoading(true);
    try {
      if (isActive) {
        await userApi.lockUser(userId);
        setIsActive(false);
      } else {
        await userApi.unlockUser(userId);
        setIsActive(true);
      }
    } catch (error) {
      console.error("Toggle user status failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      type="button"
      className={`status-badge ${isActive ? "active" : "inactive"} ${
        isSelf ? "disabled" : ""
      }`}
      whileHover={!isSelf ? { scale: 1.05 } : {}}
      whileTap={!isSelf ? { scale: 0.95 } : {}}
      disabled={loading || isSelf}
      title={
        isSelf
          ? "Không thể tự khóa tài khoản của chính bạn"
          : isActive
          ? "Click để khóa"
          : "Click để mở khóa"
      }
      onClick={handleToggleStatus}
    >
      {loading ? (
        <FiLoader className="spin" size={16} />
      ) : isSelf ? (
        <>
          <FiLock size={16} /> <span>Không thể tự khóa</span>
        </>
      ) : isActive ? (
        <>
          <FiCheckCircle size={16} /> <span>Hoạt động</span>
        </>
      ) : (
        <>
          <FiXCircle size={16} /> <span>Không hoạt động</span>
        </>
      )}
    </motion.button>
  );
};
