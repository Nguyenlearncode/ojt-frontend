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
import Avatar from "react-avatar";
import LogoutButton from "../features/auth/components/LogoutButton";
import { getUserInfo } from "../utils/jwtHelper";
import "./Sidebar.css";

interface SidebarProps {
  onToggle?: (expanded: boolean) => void;
}

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

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [user, setUser] = useState<{ fullName: string; roleCode: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const info = getUserInfo();
    if (info) setUser({ fullName: info.FullName, roleCode: info.RoleCode });
  }, []);

  const toggleSidebar = () => {
    setExpanded((prev) => {
      const newState = !prev;
      onToggle?.(newState);
      return newState;
    });
  };

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleNavigation = (path: string, name?: string) => {
    if (name === "Profile") {
      const id = getUserInfo()?.sub;
      navigate(id ? `${path}?userId=${id}` : path);
    } else navigate(path);
  };

  const isActive = (path?: string) =>
    !!path && location.pathname.startsWith(path);

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      {/* Header */}
      <div className="sidebar-header">
        {expanded && <h2 className="sidebar-title">Laboratory Management</h2>}
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FiMenu size={22} />
        </button>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {menuItems.map(({ name, icon, path, submenu }) => (
          <li key={name}>
            <button
              className={`menu-item ${isActive(path) ? "active" : ""}`}
              onClick={() =>
                submenu
                  ? (expanded ? toggleSubmenu(name) : setExpanded(true))
                  : handleNavigation(path!)
              }
            >
              <div className="menu-left">
                {icon}
                {expanded && <span className="menu-text">{name}</span>}
              </div>
              {submenu && expanded && (
                <FiChevronDown
                  size={18}
                  className={`chevron ${openSubmenus.includes(name) ? "rotate" : ""}`}
                />
              )}
            </button>

            {submenu && expanded && openSubmenus.includes(name) && (
              <ul className="submenu">
                {submenu.map(({ name: subName, path: subPath }) => (
                  <li key={subName}>
                    <button
                      className={`submenu-item ${isActive(subPath) ? "active" : ""}`}
                      onClick={() => handleNavigation(subPath, subName)}
                    >
                      {subName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-info">
          <Avatar
            name={user?.fullName || "User"}
            size="40"
            round
            textSizeRatio={2}
          />
          {expanded && (
            <div>
              <p className="user-name">{user?.fullName || "Loading..."}</p>
              <p className="user-role">{user?.roleCode || "Loading..."}</p>
            </div>
          )}
        </div>
        <LogoutButton expanded={expanded} />
      </div>
    </div>
  );
};

export default Sidebar;
