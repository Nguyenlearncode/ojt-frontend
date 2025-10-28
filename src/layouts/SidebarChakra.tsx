import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  IconButton,
  Avatar,
  Collapse,
  useDisclosure,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiSettings,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import LogoutButton from "../features/auth/components/LogoutButton";
import { getUserInfo } from "../utils/jwtHelper";
import ShootingStarsSidebar from "../components/common/ShootingStarsSidebar";
import "./Sidebar.css";

const MotionBox = motion(Box);

interface SidebarProps {
  onToggle?: (expanded: boolean) => void;
}

interface MenuItem {
  name: string;
  icon: any;
  path?: string;
  submenu?: { name: string; path: string }[];
}

const menuItems: MenuItem[] = [
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
  {
    name: "Quản lí tài khoản",
    icon: FiUsers,
    path: "/UserManagement",
  },
  {
    name: "Cài đặt",
    icon: FiSettings,
    submenu: [
      { name: "Profile", path: "/Profile" },
      { name: "Preferences", path: "/preferences" },
    ],
  },
];

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
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#CBD5E0",
          borderRadius: "24px",
        },
      }}
    >
      {/* Shooting Stars Background */}
      <ShootingStarsSidebar />
      
      <Box
        position="relative"
        zIndex={1}
        h="full"
        display="flex"
        flexDirection="column"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#CBD5E0",
            borderRadius: "24px",
          },
        }}
      >
        <VStack spacing={0} align="stretch" flex={1} minH="0">
        {/* Header */}
        <Flex
          p={4}
          align="center"
          justify="space-between"
          borderBottom="1px"
          borderColor="whiteAlpha.300"
          minH="70px"
        >
          {expanded && (
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="white"
              textShadow="0px 2px 4px rgba(0,0,0,0.3)"
            >
              Laboratory Management
            </Text>
          )}
          <IconButton
            aria-label="Toggle sidebar"
            icon={<Icon as={expanded ? FiX : FiMenu} />}
            variant="ghost"
            onClick={toggleSidebar}
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          />
        </Flex>

        {/* Menu Items */}
        <VStack spacing={2} p={4} flex="1 1 auto" align="stretch" overflowY="auto">
          {menuItems.map((item) => (
            <Box key={item.name}>
              <Tooltip
                label={item.name}
                placement="right"
                isDisabled={expanded}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  p={3}
                  borderRadius="lg"
                  cursor="pointer"
                  bg={isActive(item.path) ? "whiteAlpha.300" : "transparent"}
                  color={isActive(item.path) ? "white" : "whiteAlpha.900"}
                  fontWeight={isActive(item.path) ? "600" : "500"}
                  backdropFilter={isActive(item.path) ? "blur(10px)" : "none"}
                  _hover={{
                    bg: isActive(item.path) ? "whiteAlpha.400" : "whiteAlpha.200",
                  }}
                  transition="all 0.2s"
                  onClick={() => {
                    if (item.submenu) {
                      if (expanded) {
                        toggleSubmenu(item.name);
                      } else {
                        setExpanded(true);
                      }
                    } else if (item.path) {
                      handleNavigation(item.path);
                    }
                  }}
                >
                  <HStack spacing={3}>
                    <Icon as={item.icon} boxSize={5} />
                    {expanded && (
                      <Text fontSize="sm" textShadow="0px 1px 2px rgba(0,0,0,0.2)">
                        {item.name}
                      </Text>
                    )}
                  </HStack>
                  {item.submenu && expanded && (
                    <Icon
                      as={FiChevronDown}
                      transform={
                        openSubmenus.includes(item.name) ? "rotate(180deg)" : ""
                      }
                      transition="transform 0.2s"
                    />
                  )}
                </Flex>
              </Tooltip>

              {/* Submenu */}
              {item.submenu && expanded && (
                <Collapse in={openSubmenus.includes(item.name)} animateOpacity>
                  <VStack spacing={1} pl={8} pt={2} align="stretch">
                    {item.submenu.map((subItem) => (
                      <Flex
                        key={subItem.name}
                        p={2}
                        pl={4}
                        borderRadius="md"
                        cursor="pointer"
                        fontSize="sm"
                        color={
                          isActive(subItem.path) ? "white" : "whiteAlpha.800"
                        }
                        fontWeight={isActive(subItem.path) ? "600" : "400"}
                        bg={
                          isActive(subItem.path) ? "whiteAlpha.300" : "transparent"
                        }
                        backdropFilter={isActive(subItem.path) ? "blur(10px)" : "none"}
                        textShadow="0px 1px 2px rgba(0,0,0,0.2)"
                        _hover={{
                          bg: isActive(subItem.path)
                            ? "whiteAlpha.400"
                            : "whiteAlpha.200",
                        }}
                        transition="all 0.2s"
                        onClick={() => handleNavigation(subItem.path, subItem.name)}
                      >
                        {subItem.name}
                      </Flex>
                    ))}
                  </VStack>
                </Collapse>
              )}
            </Box>
          ))}
        </VStack>

        {/* Bottom Section - Always visible */}
        <Box flex="0 0 auto" mt="auto">
          <Divider borderColor="whiteAlpha.300" />

          {/* User Info & Logout */}
          <Box p={4}>
          <Flex
            align="center"
            gap={3}
            p={3}
            borderRadius="lg"
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
            mb={3}
          >
            <Avatar
              name={user?.fullName || "User"}
              size="sm"
              bg="brand.500"
              color="white"
            />
            {expanded && (
              <Box flex={1} overflow="hidden">
                <Text 
                  fontSize="sm" 
                  fontWeight="600" 
                  color="white" 
                  noOfLines={1}
                  textShadow="0px 1px 2px rgba(0,0,0,0.3)"
                >
                  {user?.fullName || "Loading..."}
                </Text>
                <Text 
                  fontSize="xs" 
                  color="whiteAlpha.800" 
                  noOfLines={1}
                  textShadow="0px 1px 2px rgba(0,0,0,0.3)"
                >
                  {user?.roleCode || "Loading..."}
                </Text>
              </Box>
            )}
          </Flex>
          <LogoutButton expanded={expanded} />
          </Box>
        </Box>
      </VStack>
      </Box>
    </MotionBox>
  );
};

export default SidebarChakra;

