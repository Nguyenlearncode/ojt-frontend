import {
  Box,
  Flex,
  Divider,
  Avatar,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../features/auth/components/LogoutButton";

interface Props {
  expanded: boolean;
  user: { fullName: string; roleCode: string } | null;
}

const SidebarUserSection: React.FC<Props> = ({ expanded, user }) => {
  const navigate = useNavigate();

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
            cursor="pointer"
            onClick={() => navigate("/Profile")}
            _hover={{
              bg: "whiteAlpha.300",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
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

          <LogoutButton expanded={expanded} />
        </VStack>
      </Box>
    </Box>
  );
};

export default SidebarUserSection;
