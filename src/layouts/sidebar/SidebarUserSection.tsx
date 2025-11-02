import {
  Box,
  Flex,
  Divider,
  Avatar,
  Text,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import LogoutButton from "../../features/auth/components/LogoutButton";
import ChangePasswordModal from "../../features/auth/components/ChangePasswordModal";

interface Props {
  expanded: boolean;
  user: { fullName: string; roleCode: string } | null;
}

const SidebarUserSection: React.FC<Props> = ({ expanded, user }) => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <Box flex="0 0 auto" mt="auto">
      <Divider borderColor="whiteAlpha.300" />
      <Box p={4}>
        <VStack spacing={2} align="stretch">
          <Flex
            align="center"
            gap={3}
            p={3}
            borderRadius="lg"
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
          >
            <Avatar name={user?.fullName || "User"} size="sm" bg="brand.500" color="white" />
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

          <Button
            onClick={() => setIsChangePasswordOpen(true)}
            size="md"
            variant="outline"
            colorScheme="whiteAlpha"
            leftIcon={<Icon as={FiSettings} />}
            justifyContent={expanded ? "flex-start" : "center"}
            pl={expanded ? 4 : 0}
            borderColor="whiteAlpha.300"
            color="white"
            _hover={{
              bg: "whiteAlpha.200",
              borderColor: "whiteAlpha.400",
            }}
          >
            {expanded ? "Change Password" : ""}
          </Button>

          <LogoutButton expanded={expanded} />
        </VStack>
      </Box>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </Box>
  );
};

export default SidebarUserSection;
