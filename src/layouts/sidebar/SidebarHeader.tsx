// src/layouts/sidebar/SidebarHeader.tsx
import { Flex, Text, IconButton, Icon } from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";

interface Props {
  expanded: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<Props> = ({ expanded, toggleSidebar }) => (
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
);

export default SidebarHeader;
