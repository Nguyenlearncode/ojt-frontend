import { FiHome, FiPieChart, FiUsers, FiSettings, FiShield, FiFileText } from "react-icons/fi";
import type { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
  {
    name: "Báo cáo",
    icon: FiPieChart,
    submenu: [
      { name: "Reports", path: "/reports" },
      { name: "Statistics", path: "/statistics" },
      { name: "Performance", path: "/performance" },
    ],
  },
  { name: "Quản lí tài khoản", icon: FiUsers, path: "/UserManagement" },
  { name: "Quản lý vai trò", icon: FiShield, path: "/RoleManagement" },

  { name: "Quản lý hồ sơ bệnh nhân", icon: FiFileText, path: "/PatientMedicalRecords" },

  {
    name: "Cài đặt",
    icon: FiSettings,
    submenu: [
      { name: "Profile", path: "/Profile" },
      { name: "Preferences", path: "/preferences" },
    ],
  },
];
