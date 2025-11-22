import React, { useState } from "react";
import SidebarChakra from "./SidebarChakra";
import ParticlesBackground from "../components/common/ParticlesBackground";

export default function DashboardLayoutChakra({ children }: { children?: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      
      <ParticlesBackground />

      <SidebarChakra onToggle={setIsSidebarExpanded} />

      <div
        style={{
          marginLeft: isSidebarExpanded ? "250px" : "80px",
          width: "100%",
          transition: "margin-left 0.3s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
