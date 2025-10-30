import {
  Box,
  Flex,
  HStack,
  Text,
  Tooltip,
  Icon,
  VStack,
  Collapse,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import SidebarSubmenu from "./SidebarSubmenu";
import type { MenuItem } from "./types";

interface Props {
  expanded: boolean;
  openSubmenus: string[];
  toggleSubmenu: (name: string) => void;
  handleNavigation: (path: string, name?: string) => void;
  isActive: (path?: string) => boolean;
  menuItems: MenuItem[];
  toggleSidebar: () => void; // 👈 thêm prop toggleSidebar
}

const SidebarMenu: React.FC<Props> = ({
  expanded,
  openSubmenus,
  toggleSubmenu,
  handleNavigation,
  isActive,
  menuItems,
  toggleSidebar,
}) => {
  const handleSubmenuClick = (name: string) => {
    if (expanded) {
      toggleSubmenu(name);
    } else {
      // Gọi nút mở sidebar y như bấm header
      toggleSidebar();
      // Mở submenu sau khi animation mở rộng kết thúc
      setTimeout(() => toggleSubmenu(name), 300);
    }
  };

  return (
    <VStack spacing={2} p={4} flex="1 1 auto" align="stretch">
      {menuItems.map((item) => (
        <Box key={item.name}>
          <Tooltip label={item.name} placement="right" isDisabled={expanded}>
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
                bg: isActive(item.path)
                  ? "whiteAlpha.400"
                  : "whiteAlpha.200",
              }}
              transition="all 0.2s"
              onClick={() => {
                if (item.submenu) {
                  handleSubmenuClick(item.name);
                } else if (item.path) {
                  handleNavigation(item.path);
                }
              }}
            >
              <HStack spacing={3}>
                <Icon as={item.icon} boxSize={5} />
                {expanded && (
                  <Text
                    fontSize="sm"
                    textShadow="0px 1px 2px rgba(0,0,0,0.2)"
                  >
                    {item.name}
                  </Text>
                )}
              </HStack>
              {item.submenu && expanded && (
                <Icon
                  as={FiChevronDown}
                  transform={
                    openSubmenus.includes(item.name)
                      ? "rotate(180deg)"
                      : ""
                  }
                  transition="transform 0.2s"
                />
              )}
            </Flex>
          </Tooltip>

          {/* Submenu */}
          <Collapse in={openSubmenus.includes(item.name)} animateOpacity>
            <SidebarSubmenu
              item={item}
              expanded={expanded}
              openSubmenus={openSubmenus}
              isActive={isActive}
              handleNavigation={handleNavigation}
            />
          </Collapse>
        </Box>
      ))}
    </VStack>
  );
};

export default SidebarMenu;
