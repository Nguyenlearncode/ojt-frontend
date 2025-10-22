// src/features/dashboard/components/QuickActions.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiUserPlus, FiUsers, FiFileText, FiSettings } from "react-icons/fi";
import "../styles/QuickActions.css";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: "create-user",
      title: "Create User",
      description: "Add a new user to the system",
      icon: <FiUserPlus size={24} />,
      color: "#3b82f6",
      path: "/CreateUser",
    },
    {
      id: "manage-users",
      title: "Manage Users",
      description: "View and edit user accounts",
      icon: <FiUsers size={24} />,
      color: "#10b981",
      path: "/UserManagement",
    },
    {
      id: "reports",
      title: "Generate Report",
      description: "Create system reports",
      icon: <FiFileText size={24} />,
      color: "#f59e0b",
      path: "/reports",
    },
    {
      id: "settings",
      title: "System Settings",
      description: "Configure system preferences",
      icon: <FiSettings size={24} />,
      color: "#8b5cf6",
      path: "/settings",
    },
  ];

  return (
    <div className="quick-actions-card">
      <h3 className="card-title">Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            className="action-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
          >
            <div className="action-icon" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
              {action.icon}
            </div>
            <div className="action-content">
              <h4 className="action-title">{action.title}</h4>
              <p className="action-description">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
