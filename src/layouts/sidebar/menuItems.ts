import {
  FiHome,
  FiUsers,
  FiShield,
  FiFileText,
  FiFlag,
} from "react-icons/fi";
import type { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },

  { name: "Quản lí tài khoản", icon: FiUsers, path: "/UserManagement" },
  { name: "Quản lý vai trò", icon: FiShield, path: "/RoleManagement" },

  { name: "Quản lý hồ sơ bệnh nhân", icon: FiFileText, path: "/PatientMedicalRecords" },
  { name: "Danh sách đơn xét nghiệm", icon: FiFileText, path: "/TestOrders" },
  { name: "Cấu hình Flagging", icon: FiFlag, path: "/FlaggingSets" },

];
