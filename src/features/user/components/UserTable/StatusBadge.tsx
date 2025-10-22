import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import "../../styles/UserTableModern.css";

export const StatusBadge: React.FC<{ active?: boolean }> = ({ active }) => (
  <motion.span
    className={`status-badge ${active ? "active" : "inactive"}`}
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.05 }}
  >
    {active ? <FiCheckCircle size={16} /> : <FiXCircle size={16} />}
    <span>{active ? "Active" : "Inactive"}</span>
  </motion.span>
);
