import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Sidebar onToggle={setIsSidebarExpanded} />
      <div
        style={{
          marginLeft: isSidebarExpanded ? "250px" : "80px",
          width: "100%",
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
