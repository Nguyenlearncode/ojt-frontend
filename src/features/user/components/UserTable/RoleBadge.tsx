import React from "react";
import "../../styles/UserTableModern.css";

export const RoleBadge: React.FC<{ roleName?: string }> = ({ roleName }) => {
  const cls = `role-badge ${roleName?.toLowerCase() || "user"}`;
  return <span className={cls}>{roleName || "N/A"}</span>;
};
