import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import SidebarChakra from "./SidebarChakra";
import ParticlesBackground from "../components/common/ParticlesBackground";

interface DashboardLayoutChakraProps {
  children: React.ReactNode;
}

const DashboardLayoutChakra: React.FC<DashboardLayoutChakraProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <Box display="flex" minH="100vh" position="relative" overflow="hidden">
      {/* Particles Background */}
      <ParticlesBackground />
      
      <SidebarChakra onToggle={setIsSidebarExpanded} />
      <Box
        ml={isSidebarExpanded ? "250px" : "80px"}
        w="full"
        transition="margin-left 0.3s ease"
        position="relative"
        zIndex={1}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayoutChakra;

