// src/layouts/SidebarChakra.tsx
import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../utils/jwtHelper";
import ShootingStarsSidebar from "./sidebar/ShootingStarsSidebar";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarMenu from "./sidebar/SidebarMenu";
import SidebarUserSection from "./sidebar/SidebarUserSection";
import { menuItems } from "./sidebar/menuItems";
import type { SidebarProps } from "./sidebar/types";

const MotionBox = motion(Box);

const SidebarChakra: React.FC<SidebarProps> = ({ onToggle }) => {
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

  const toggleSubmenu = (name: string) =>
    setOpenSubmenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const handleNavigation = (path: string, name?: string) => {
    if (name === "Profile") {
      const id = getUserInfo()?.sub;
      navigate(id ? `${path}?userId=${id}` : path);
    } else navigate(path);
  };

  const isActive = (path?: string) => !!path && location.pathname.startsWith(path);

  return (
    <MotionBox
      initial={{ x: -300 }}
      animate={{ x: 0, width: expanded ? "250px" : "80px" }}
      transition={{ duration: 0.3 }}
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      boxShadow="xl"
      zIndex={1000}
      overflow="hidden"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <ShootingStarsSidebar />

      <Box
        position="relative"
        zIndex={1}
        h="full"
        display="flex"
        flexDirection="column"
        bg="transparent"
      >
        {/* Header */}
        <SidebarHeader expanded={expanded} toggleSidebar={toggleSidebar} />

        {/* Scrollable Menu */}
        <Box
          flex="1"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <SidebarMenu
            expanded={expanded}
            openSubmenus={openSubmenus}
            toggleSubmenu={toggleSubmenu}
            handleNavigation={handleNavigation}
            isActive={isActive}
            menuItems={menuItems}
            toggleSidebar={toggleSidebar}
          />

        </Box>

        {/* Fixed bottom section */}
        <SidebarUserSection expanded={expanded} user={user} />
      </Box>
    </MotionBox>

  );
};

export default SidebarChakra;
