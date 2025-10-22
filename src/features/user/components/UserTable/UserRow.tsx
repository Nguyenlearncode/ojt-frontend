import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";
import { RoleBadge } from "./RoleBadge";
import { UserActionButtons } from "./UserActionButtons";
import type { User } from "../../api/userApi";
import { formatGender } from "../../../../utils/genderUtils";
import { UserStatusToggleButton } from "../Button/UserStatusToggleButton";


interface Props {
  user: User;
  index: number;
  onView: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export const UserRow: React.FC<Props> = ({
  user,
  index,
  onView,
  onEdit,
  onDelete,
  showDelete,
}) => {

  return (
    <motion.tr
      key={user.userId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ backgroundColor: "#f8fafc" }}
    >
      <td>{index + 1}</td>

      <td>
        <div className="user-info-cell">
          <div className="user-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
          <div className="user-details">
            <div className="user-name">{user.fullName}</div>
            <div className="user-id">ID: {user.userId.slice(0, 8)}...</div>
          </div>
        </div>
      </td>

      <td>
        <div className="contact-cell">
          <div className="contact-item">
            <FiMail size={14} /> <span>{user.email}</span>
          </div>
          <div className="contact-item">
            <FiPhone size={14} /> <span>{user.phoneNumber || "N/A"}</span>
          </div>
        </div>
      </td>

      <td><RoleBadge roleName={user.role?.roleName} /></td>
      <td><span className="gender-badge">{formatGender(user.gender)}</span></td>

      {/* ✅ Button toggle trạng thái */}
      <td>
        <UserStatusToggleButton
          userId={user.userId}
          fullName={user.fullName}
          initialActive={user.isActive !== false}
        />
      </td>


      <td>
        <UserActionButtons
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          showDelete={showDelete}
        />
      </td>
    </motion.tr>
  );
};
