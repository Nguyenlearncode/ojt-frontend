import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiActivity, FiClock, FiCheckCircle, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { useDashboard } from "../hooks/useDashboard";
import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";
import PerformanceChart from "../components/PerformanceChart";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const { stats, activities, chartData, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="dashboard-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiActivity size={48} />
        </motion.div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <motion.div
          className="error-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3>❌ {error}</h3>
          <button onClick={() => window.location.reload()}>Retry</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="dashboard-title">Laboratory Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening in your lab today.
          </p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<FiUsers size={28} />}
          color="#3b82f6"
          trend={{ value: 12.5, isUp: true }}
          delay={0}
        />
        <StatCard
          title="Total Tests"
          value={stats?.totalTests || 0}
          icon={<FiActivity size={28} />}
          color="#10b981"
          trend={{ value: 8.3, isUp: true }}
          delay={0.1}
        />
        <StatCard
          title="Pending Tests"
          value={stats?.pendingTests || 0}
          icon={<FiClock size={28} />}
          color="#f59e0b"
          trend={{ value: 3.2, isUp: false }}
          delay={0.2}
        />
        <StatCard
          title="Completed Tests"
          value={stats?.completedTests || 0}
          icon={<FiCheckCircle size={28} />}
          color="#8b5cf6"
          trend={{ value: 15.7, isUp: true }}
          delay={0.3}
        />
        <StatCard
          title="Active Projects"
          value={stats?.activeProjects || 0}
          icon={<FiTrendingUp size={28} />}
          color="#ec4899"
          trend={{ value: 5.1, isUp: true }}
          delay={0.4}
        />
        <StatCard
          title="Today's Revenue"
          value={stats?.todayRevenue || 0}
          icon={<FiDollarSign size={28} />}
          color="#06b6d4"
          prefix="$"
          trend={{ value: 18.2, isUp: true }}
          delay={0.5}
        />
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Chart Section */}
        <div className="grid-left">
          <PerformanceChart data={chartData} />
          <QuickActions />
        </div>

        {/* Activity Section */}
        <div className="grid-right">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
