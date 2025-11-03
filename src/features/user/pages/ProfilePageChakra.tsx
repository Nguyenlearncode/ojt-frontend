//src/features/user/pages/ProfilePageChakra.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Flex,
  Avatar,
  SimpleGrid,
  Divider,
  Icon,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiShield, FiLock, FiUserCheck } from "react-icons/fi";
import { getUserInfo, getUserPrivileges, type PrivilegeInfo } from "../../../utils/jwtHelper";
import ChangePasswordModal from "../../auth/components/ChangePasswordModal";

const MotionBox = motion(Box);

const ProfilePageChakra: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{
    sub: string;
    email: string;
    FullName: string;
    RoleCode: string;
    exp: number;
  } | null>(null);
  const [privileges, setPrivileges] = useState<PrivilegeInfo[]>([]);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  useEffect(() => {
    const info = getUserInfo();
    if (info) {
      setUserInfo(info);
    }
    const userPrivileges = getUserPrivileges();
    setPrivileges(userPrivileges);
  }, []);

  if (!userInfo) {
    return (
      <Flex minH="100vh" align="center" justify="center" direction="column" gap={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.600">Loading profile...</Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          mb={8}
        >
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <VStack align="flex-start" spacing={1}>
              <HStack spacing={3}>
                <Box
                  bg="whiteAlpha.300"
                  p={3}
                  borderRadius="lg"
                  color="white"
                  backdropFilter="blur(10px)"
                >
                  <FiUserCheck size={28} />
                </Box>
                <Box>
                  <Heading
                    size="xl"
                    bgGradient="linear(to-r, pink.300, white, blue.300)"
                    bgClip="text"
                    fontWeight="extrabold"
                  >
                    Thông tin cá nhân
                  </Heading>
                  <Text
                    bgGradient="linear(to-r, whiteAlpha.900, pink.200)"
                    bgClip="text"
                    fontSize="md"
                    textShadow="0px 1px 2px rgba(0,0,0,0.2)"
                  >
                    Quản lý thông tin tài khoản của bạn
                  </Text>
                </Box>
              </HStack>
            </VStack>
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                leftIcon={<Icon as={FiLock} />}
                variant="gradient"
                size="lg"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Đổi mật khẩu
              </Button>
            </MotionBox>
          </Flex>
        </MotionBox>

        {/* Profile Card */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
          >
            {/* Profile Header with Avatar */}
            <Box
              bgGradient="linear(to-r, brand.500, primary.600)"
              px={8}
              py={10}
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgImage: "url('/backgrounds/laboratory.jpg')",
                bgSize: "cover",
                bgPosition: "center",
                opacity: 0.1,
              }}
            >
              <Flex
                align="center"
                gap={6}
                position="relative"
                zIndex={1}
                flexDirection={{ base: "column", md: "row" }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Avatar
                  name={userInfo.FullName}
                  size="2xl"
                  bg="white"
                  color="brand.500"
                  fontWeight="bold"
                  fontSize="4xl"
                  border="4px solid white"
                  boxShadow="2xl"
                />
                <VStack align={{ base: "center", md: "flex-start" }} spacing={2} flex={1}>
                  <Heading size="xl" color="white" textShadow="0px 2px 4px rgba(0,0,0,0.3)">
                    {userInfo.FullName}
                  </Heading>
                  <HStack>
                    <Badge
                      colorScheme="purple"
                      fontSize="md"
                      px={4}
                      py={2}
                      borderRadius="full"
                      textTransform="uppercase"
                      fontWeight="bold"
                    >
                      {userInfo.RoleCode}
                    </Badge>
                  </HStack>
                  <Text color="whiteAlpha.900" fontSize="sm" fontWeight="medium">
                    {userInfo.email}
                  </Text>
                </VStack>
              </Flex>
            </Box>

            <Divider />

            {/* Information Grid */}
            <Box px={8} py={8}>
              <Heading size="md" color="gray.700" mb={6}>
                Thông tin tài khoản
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* User ID */}
                <Box
                  p={5}
                  bg="gray.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    bg: "gray.100",
                    borderColor: "brand.300",
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                  transition="all 0.2s"
                >
                  <HStack spacing={3} mb={3}>
                    <Box
                      p={2}
                      bg="brand.100"
                      borderRadius="lg"
                      color="brand.600"
                    >
                      <Icon as={FiUser} boxSize={5} />
                    </Box>
                    <Text
                      fontWeight="700"
                      color="gray.600"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      User ID
                    </Text>
                  </HStack>
                  <Text
                    color="gray.800"
                    fontSize="sm"
                    fontFamily="mono"
                    ml={11}
                    fontWeight="medium"
                    wordBreak="break-all"
                  >
                    {userInfo.sub}
                  </Text>
                </Box>

                {/* Full Name */}
                <Box
                  p={5}
                  bg="gray.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    bg: "gray.100",
                    borderColor: "green.300",
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                  transition="all 0.2s"
                >
                  <HStack spacing={3} mb={3}>
                    <Box
                      p={2}
                      bg="green.100"
                      borderRadius="lg"
                      color="green.600"
                    >
                      <Icon as={FiUser} boxSize={5} />
                    </Box>
                    <Text
                      fontWeight="700"
                      color="gray.600"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      Họ và tên
                    </Text>
                  </HStack>
                  <Text
                    color="gray.800"
                    fontSize="md"
                    ml={11}
                    fontWeight="600"
                  >
                    {userInfo.FullName}
                  </Text>
                </Box>

                {/* Email */}
                <Box
                  p={5}
                  bg="gray.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    bg: "gray.100",
                    borderColor: "blue.300",
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                  transition="all 0.2s"
                >
                  <HStack spacing={3} mb={3}>
                    <Box
                      p={2}
                      bg="blue.100"
                      borderRadius="lg"
                      color="blue.600"
                    >
                      <Icon as={FiMail} boxSize={5} />
                    </Box>
                    <Text
                      fontWeight="700"
                      color="gray.600"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      Email
                    </Text>
                  </HStack>
                  <Text
                    color="gray.800"
                    fontSize="md"
                    ml={11}
                    fontWeight="600"
                  >
                    {userInfo.email}
                  </Text>
                </Box>

                {/* Role */}
                <Box
                  p={5}
                  bg="gray.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    bg: "gray.100",
                    borderColor: "purple.300",
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                  transition="all 0.2s"
                >
                  <HStack spacing={3} mb={3}>
                    <Box
                      p={2}
                      bg="purple.100"
                      borderRadius="lg"
                      color="purple.600"
                    >
                      <Icon as={FiShield} boxSize={5} />
                    </Box>
                    <Text
                      fontWeight="700"
                      color="gray.600"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      Vai trò
                    </Text>
                  </HStack>
                  <Box ml={11}>
                    <Badge
                      colorScheme="purple"
                      fontSize="md"
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontWeight="bold"
                    >
                      {userInfo.RoleCode}
                    </Badge>
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>

            {/* Privileges Section */}
            {privileges.length > 0 && (
              <>
                <Divider />
                <Box px={8} py={6}>
                  <HStack spacing={3} mb={4}>
                    <Box
                      p={2}
                      bg="purple.100"
                      borderRadius="lg"
                      color="purple.600"
                    >
                      <Icon as={FiShield} boxSize={6} />
                    </Box>
                    <Box>
                      <Heading size="md" color="gray.700">
                        Quyền hạn (Privileges)
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        Danh sách quyền hạn của bạn trong hệ thống
                      </Text>
                    </Box>
                    <Badge colorScheme="purple" fontSize="md" px={3} py={1} borderRadius="full">
                      {privileges.length} privilege{privileges.length > 1 ? 's' : ''}
                    </Badge>
                  </HStack>

                  {/* Privileges badges only */}
                  <Flex gap={2} flexWrap="wrap">
                    {privileges.map((priv) => (
                      <Badge
                        key={priv.privilegeId}
                        colorScheme="purple"
                        fontSize="sm"
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontWeight="600"
                        textTransform="uppercase"
                      >
                        {priv.privilegeName}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </>
            )}
          </Box>
        </MotionBox>
      </Container>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </Box>
  );
};

export default ProfilePageChakra;

