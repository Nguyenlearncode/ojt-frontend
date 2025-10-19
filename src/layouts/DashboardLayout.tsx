import React from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div
      className="d-flex"
      style={{
        overflowX: "hidden", 
      }}
    >
      <Sidebar />
      <div
        className="flex-grow-1 p-0"
        style={{
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          minWidth: 0, 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
