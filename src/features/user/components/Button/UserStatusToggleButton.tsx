import React, { useState } from "react";
import { motion } from "framer-motion";
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
  const isSelf = currentUserId === userId;

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
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Xác định màu sắc theo trạng thái
  const getColorStyle = () => {
    if (isSelf) {
      return { backgroundColor: "#f1f5f9", color: "#64748b", cursor: "not-allowed" }; // xám
    }
    if (isActive) {
      return { backgroundColor: "#dcfce7", color: "#166534" }; // xanh lá
    } else {
      return { backgroundColor: "#fee2e2", color: "#991b1b" }; // đỏ
    }
  };

  return (
    <motion.button
      type="button"
      style={{
        ...getColorStyle(),
        padding: "6px 12px",
        borderRadius: "9999px",
        border: "none",
        fontSize: "0.85rem",
        fontWeight: 600,
        transition: "all 0.2s ease",
        minWidth: "120px",
      }}
      whileHover={!isSelf ? { scale: 1.05 } : {}}
      whileTap={!isSelf ? { scale: 0.95 } : {}}
      disabled={loading || isSelf}
      onClick={handleToggleStatus}
      title={
        isSelf
          ? "Không thể tự khóa tài khoản của chính bạn"
          : isActive
          ? "Click để khóa người dùng"
          : "Click để mở khóa người dùng"
      }
    >
      {loading
        ? "Đang xử lý..."
        : isSelf
        ? "Không thể tự khóa"
        : isActive
        ? "Hoạt động"
        : "Không hoạt động"}
    </motion.button>
  );
};
