import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiSettings,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";
import "./Sidebar.css";
import LogoutButton from "../features/auth/components/LogoutButton";
import { getUserInfo } from "../utils/jwtHelper";

interface SidebarProps {
  onToggle?: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const [expandedSubmenus, setExpandedSubmenus] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<{
    fullName: string;
    roleCode: string;
  } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin user từ token
  useEffect(() => {
    const info = getUserInfo();
    if (info) {
      setUserInfo({
        fullName: info.FullName,
        roleCode: info.RoleCode,
      });
    }
  }, []);

  // Toggle sidebar mở/đóng
  const toggleSidebar = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (onToggle) {
      onToggle(newExpanded);
    }
  };

  // Toggle submenu
  const toggleSubmenu = (name: string) => {
    setExpandedSubmenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Danh sách menu
  const menuItems = [
    { name: "Dashboard", icon: <FiHome size={22} />, path: "/dashboard" },
    {
      name: "Báo cáo",
      icon: <FiPieChart size={22} />,
      submenu: [
        { name: "Reports", path: "/reports" },
        { name: "Statistics", path: "/statistics" },
        { name: "Performance", path: "/performance" },
      ],
    },
    {
      name: "Quản lí tài khoản",
      icon: <FiUsers size={22} />,
      path: "/UserManagement",
    },
    {
      name: "Cài đặt",
      icon: <FiSettings size={22} />,
      submenu: [
        { name: "Profile", path: "/UpdateUserProfile" },
        { name: "Preferences", path: "/preferences" },
      ],
    },
  ];

  // Xác định menu đang active
  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      {/* Nội dung chính */}
      <div className="sidebar-content">
        {/* Header */}
        <div className="sidebar-header">
          {expanded && <h2 className="sidebar-title">Laboratory Management</h2>}
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FiMenu size={22} />
          </button>
        </div>

        {/* Menu */}
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`menu-item ${isActive(item.path) ? "active" : ""}`}
                onClick={() => {
                  if (item.submenu) {
                    if (!expanded) setExpanded(true);
                    toggleSubmenu(item.name);
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                <div className="menu-left">
                  {item.icon}
                  {expanded && <span className="menu-text">{item.name}</span>}
                </div>
                {item.submenu && expanded && (
                  <FiChevronDown
                    size={18}
                    className={`chevron ${expandedSubmenus.includes(item.name) ? "rotate" : ""
                      }`}
                  />
                )}
              </button>

              {item.submenu &&
                expanded &&
                expandedSubmenus.includes(item.name) && (
                  <ul className="submenu">
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <button
                          className={`submenu-item ${isActive(sub.path) ? "active" : ""
                            }`}
                          onClick={() => navigate(sub.path)}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-info">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="user"
            className="avatar"
          />
          {expanded && (
            <div>
              <p className="user-name">{userInfo?.fullName || "Loading..."}</p>
              <p className="user-role">{userInfo?.roleCode || "Loading..."}</p>
            </div>
          )}
        </div>

        <LogoutButton expanded={expanded} />
      </div>
    </div>
  );
};

export default Sidebar;