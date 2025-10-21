// src/features/dashboard/components/StatCard.tsx
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import "../styles/StatCard.css";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  prefix = "",
  suffix = "",
  trend,
  delay = 0,
}) => {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
    >
      <div className="stat-card-icon" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <div className="stat-card-content">
        <h3 className="stat-card-title">{title}</h3>
        <div className="stat-card-value">
          <CountUp
            start={0}
            end={value}
            duration={2}
            separator=","
            prefix={prefix}
            suffix={suffix}
            delay={delay}
          />
        </div>
        {trend && (
          <div className={`stat-card-trend ${trend.isUp ? "up" : "down"}`}>
            <span className="trend-icon">{trend.isUp ? "↑" : "↓"}</span>
            <span>{trend.value}%</span>
            <span className="trend-label">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;

