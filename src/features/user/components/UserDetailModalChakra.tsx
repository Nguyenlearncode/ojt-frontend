import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Box,
  Icon,
  Image,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiCreditCard,
  FiX,
} from "react-icons/fi";
import type { User } from "../api/userApi";
import DeleteUserButton from "./Button/DeleteUserButton";
import { formatGender } from "../../../utils/formatGender";


const MotionBox = motion(Box);

interface UserDetailModalChakraProps {
  user: User;
  onClose: () => void;
}

const UserDetailModalChakra: React.FC<UserDetailModalChakraProps> = ({
  user,
  onClose,
}) => {
  // ✅ Màu mặc định cho avatar và badge
  const defaultColorScheme = "blue";

  // ✅ Danh sách thông tin hiển thị
  const infoItems = [
    { icon: FiMail, label: "Email", value: user.email },
    { icon: FiPhone, label: "Số điện thoại", value: user.phoneNumber },
    {
      icon: FiCalendar,
      label: "Ngày sinh",
      value: user.dateOfBirth
        ? new Date(user.dateOfBirth).toLocaleDateString("vi-VN")
        : "N/A",
    },
    { icon: FiUser, label: "Giới tính", value: formatGender(user.gender) },
    { icon: FiUser, label: "Tuổi", value: user.age },
    { icon: FiCreditCard, label: "CMND/CCCD", value: user.identifyNumber },
    { icon: FiMapPin, label: "Địa chỉ", value: user.address },
  ];

  return (
    <Modal isOpen={true} onClose={onClose} size="lg" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />

      <ModalContent bg="transparent" boxShadow="none" maxW="480px">
        <MotionBox
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          {/* Header Background */}
          <Box position="relative" borderTopRadius="xl" overflow="hidden">
            <Image
              src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800"
              alt="Profile background"
              w="full"
              h="90px"
              objectFit="cover"
              fallback={
                <Box
                  w="full"
                  h="90px"
                  bgGradient="linear(135deg, blue.400, cyan.500)"
                />
              }
            />
            <Button
              position="absolute"
              top={4}
              right={4}
              size="sm"
              colorScheme="whiteAlpha"
              onClick={onClose}
              borderRadius="full"
              leftIcon={<Icon as={FiX} />}
              bg="whiteAlpha.300"
              backdropFilter="blur(10px)"
              _hover={{ bg: "whiteAlpha.400" }}
            >
              Đóng
            </Button>
          </Box>

          {/* Nội dung chính */}
          <Box bg="white" px={6} pb={5} borderBottomRadius="xl" boxShadow="2xl">
            {/* Thông tin người dùng */}
            <VStack spacing={2} textAlign="center" mb={4}>
              <Avatar
                name={user.fullName}
                size="lg"
                bg={`${defaultColorScheme}.500`}
                color="white"
                mt={-6}
                border="3px solid white"
                boxShadow="lg"
              />
              <VStack spacing={0.5}>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {user.fullName}
                </Text>
                <Badge
                  colorScheme={defaultColorScheme}
                  fontSize="xs"
                  px={2.5}
                  py={0.5}
                  borderRadius="full"
                  textTransform="none"
                >
                  {user.role?.roleName || "N/A"}
                </Badge>
              </VStack>
            </VStack>

            <Divider mb={4} />

            {/* Grid thông tin */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
              {infoItems.map((item, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  gridColumn={item.label === "Địa chỉ" ? "span 2" : "span 1"}
                >
                  <Box
                    p={2.5}
                    bg="gray.50"
                    borderRadius="md"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.100", borderColor: "gray.300" }}
                    transition="all 0.2s"
                    h="full"
                  >
                    <HStack spacing={2} align="flex-start">
                      <Box
                        p={1.5}
                        bg="white"
                        borderRadius="md"
                        border="1px"
                        borderColor="gray.200"
                        flexShrink={0}
                      >
                        <Icon as={item.icon} color="gray.600" boxSize={3.5} />
                      </Box>
                      <VStack align="flex-start" spacing={0} flex={1} minW={0}>
                        <Text
                          fontSize="10px"
                          fontWeight="600"
                          color="gray.500"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          {item.label}
                        </Text>
                        <Text
                          fontSize="xs"
                          color="gray.800"
                          fontWeight="500"
                          wordBreak="break-all"
                          noOfLines={item.label === "Địa chỉ" ? 2 : 1}
                        >
                          {item.value || "N/A"}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              ))}
            </Box>

            {/* User ID và nút Xóa */}
            <VStack spacing={3} mt={5}>
              <Text
                fontSize="xs"
                color="gray.400"
                textAlign="center"
                fontStyle="italic"
              >
                User ID: {user.userId}
              </Text>

              {/* ✅ Nút xóa người dùng */}
              <DeleteUserButton userId={user.userId} fullName={user.fullName} />
            </VStack>
          </Box>
        </MotionBox>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailModalChakra;
