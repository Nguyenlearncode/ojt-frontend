import React from "react";
import { motion } from "framer-motion";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import "../../../user/styles/UserTableModern.css";

interface Props {
  onView: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export const UserActionButtons: React.FC<Props> = ({
  onView,
  onEdit,
  onDelete,
  showDelete,
}) => (
  <div className="action-buttons">
    <motion.button
      className="action-btn view"
      onClick={onView}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="View Details"
    >
      <FiEye size={16} />
    </motion.button>

    {onEdit && (
      <motion.button
        className="action-btn edit"
        onClick={onEdit}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Edit User"
      >
        <FiEdit2 size={16} />
      </motion.button>
    )}

    {showDelete && onDelete && (
      <motion.button
        className="action-btn delete"
        onClick={onDelete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Delete User"
      >
        <FiTrash2 size={16} />
      </motion.button>
    )}
  </div>
);
