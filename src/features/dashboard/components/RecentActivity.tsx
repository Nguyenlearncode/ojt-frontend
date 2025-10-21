// src/features/dashboard/components/RecentActivity.tsx
import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiXCircle } from "react-icons/fi";
import type { Activity } from "../api/dashboardApi";
import "../styles/RecentActivity.css";

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="activity-icon success" />;
      case "warning":
        return <FiAlertCircle className="activity-icon warning" />;
      case "error":
        return <FiXCircle className="activity-icon error" />;
      default:
        return <FiInfo className="activity-icon info" />;
    }
  };

  return (
    <div className="recent-activity-card">
      <h3 className="card-title">Recent Activity</h3>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="activity-icon-wrapper">{getIcon(activity.type)}</div>
            <div className="activity-content">
              <div className="activity-user">{activity.user}</div>
              <div className="activity-action">{activity.action}</div>
            </div>
            <div className="activity-time">{activity.time}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
