import { VStack, Flex } from "@chakra-ui/react";
import type { MenuItem } from "./types";

interface Props {
  item: MenuItem;
  expanded: boolean;
  openSubmenus: string[];
  isActive: (path?: string) => boolean;
  handleNavigation: (path: string, name?: string) => void;
}

const SidebarSubmenu: React.FC<Props> = ({
  item,
  expanded,
  openSubmenus,
  isActive,
  handleNavigation,
}) => {
  if (!item.submenu || !expanded) return null;

  const isOpen = openSubmenus.includes(item.name);

  return (
    <VStack spacing={1} pl={8} pt={2} align="stretch" hidden={!isOpen}>
      {item.submenu.map((sub) => (
        <Flex
          key={sub.name}
          p={2}
          pl={4}
          borderRadius="md"
          cursor="pointer"
          fontSize="sm"
          color={isActive(sub.path) ? "white" : "whiteAlpha.800"}
          fontWeight={isActive(sub.path) ? "600" : "400"}
          bg={isActive(sub.path) ? "whiteAlpha.300" : "transparent"}
          backdropFilter={isActive(sub.path) ? "blur(10px)" : "none"}
          textShadow="0px 1px 2px rgba(0,0,0,0.2)"
          _hover={{
            bg: isActive(sub.path) ? "whiteAlpha.400" : "whiteAlpha.200",
          }}
          transition="all 0.2s"
          onClick={() => handleNavigation(sub.path, sub.name)}
        >
          {sub.name}
        </Flex>
      ))}
    </VStack>
  );
};

export default SidebarSubmenu;
