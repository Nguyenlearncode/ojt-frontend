import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  Badge,
  HStack,
  VStack,
  IconButton,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiEye, FiEdit2 } from "react-icons/fi";
import type { User } from "../api/userApi";
import { formatGender } from "../../../utils/genderUtils";
import UserDetailModalChakra from "./UserDetailModalChakra";

const MotionTr = motion(Tr);
const MotionBox = motion(Box);

interface UserTableChakraProps {
  users: User[];
  onEdit?: (user: User) => void;
}

export const UserTableChakra: React.FC<UserTableChakraProps> = ({
  users,
  onEdit,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getRoleBadgeColor = (roleName?: string) => {
    switch (roleName?.toLowerCase()) {
      case "administrator":
        return "purple";
      case "lab manager":
        return "blue";
      case "service":
        return "green";
      case "lab user":
        return "cyan";
      default:
        return "gray";
    }
  };

  const getStatusColor = (isActive?: boolean) => {
    return isActive !== false ? "green" : "red";
  };

  if (users.length === 0) {
    return (
      <MotionBox
        bg="white"
        p={12}
        borderRadius="xl"
        boxShadow="md"
        textAlign="center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MotionBox
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Text fontSize="6xl" mb={4}>
            👥
          </Text>
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
            Không tìm thấy người dùng
          </Text>
          <Text color="gray.500">
            Thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn
          </Text>
        </MotionBox>
      </MotionBox>
    );
  }

  return (
    <>
      <MotionBox
        bg="white"
        borderRadius="xl"
        boxShadow="md"
        overflow="hidden"
        mb={6}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ boxShadow: "xl" }}
      >
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
                  #
                </Th>
                <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
                  Thông tin
                </Th>
                <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
                  Liên hệ
                </Th>
                <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
                  Vai trò
                </Th>
                <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
                  Giới tính
                </Th>
                <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
                  Trạng thái
                </Th>
                <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
                  Hành động
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <MotionTr
                  key={user.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  _hover={{ bg: "gray.50" }}
                >
                  {/* Index */}
                  <Td fontWeight="600" color="gray.600">
                    {index + 1}
                  </Td>

                  {/* User Info */}
                  <Td>
                    <HStack spacing={3}>
                      <Box
                        as={motion.div}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition="0.2s"
                      >
                        <Avatar
                          name={user.fullName}
                          size="md"
                          bg="brand.500"
                          color="white"
                        />
                      </Box>
                      <VStack align="flex-start" spacing={0}>
                        <Text fontWeight="600" color="gray.800">
                          {user.fullName}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          ID: {user.userId.slice(0, 8)}...
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>

                  {/* Contact */}
                  <Td>
                    <VStack align="flex-start" spacing={1}>
                      <HStack spacing={2}>
                        <FiMail size={14} color="gray" />
                        <Text fontSize="sm" color="gray.700">
                          {user.email}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <FiPhone size={14} color="gray" />
                        <Text fontSize="sm" color="gray.700">
                          {user.phoneNumber || "N/A"}
                        </Text>
                      </HStack>
                    </VStack>
                  </Td>

                  {/* Role */}
                  <Td>
                    <Box
                      as={motion.div}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        colorScheme={getRoleBadgeColor(user.role?.roleName)}
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderRadius="full"
                        cursor="pointer"
                      >
                        {user.role?.roleName || "N/A"}
                      </Badge>
                    </Box>
                  </Td>

                  {/* Gender */}
                  <Td>
                    <Box
                      as={motion.div}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge colorScheme="gray" fontSize="sm" px={3} py={1} borderRadius="md">
                        {formatGender(user.gender)}
                      </Badge>
                    </Box>
                  </Td>

                  {/* Status */}
                  <Td>
                    <Box
                      as={motion.div}
                      whileHover={{ scale: 1.1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge
                        colorScheme={getStatusColor(user.isActive)}
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        {user.isActive !== false ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </Box>
                  </Td>

                  {/* Actions */}
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="Xem chi tiết" placement="top" hasArrow>
                        <Box
                          as={motion.div}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            aria-label="View details"
                            icon={<FiEye />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => setSelectedUser(user)}
                          />
                        </Box>
                      </Tooltip>
                      {onEdit && (
                        <Tooltip label="Chỉnh sửa" placement="top" hasArrow>
                          <Box
                            as={motion.div}
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              aria-label="Edit user"
                              icon={<FiEdit2 />}
                              size="sm"
                              colorScheme="green"
                              variant="ghost"
                              onClick={() => onEdit(user)}
                            />
                          </Box>
                        </Tooltip>
                      )}
                    </HStack>
                  </Td>
                </MotionTr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </MotionBox>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModalChakra
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

