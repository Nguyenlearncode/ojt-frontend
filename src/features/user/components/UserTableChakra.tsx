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
  HStack,
  VStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiEye, FiEdit2 } from "react-icons/fi";
import type { User } from "../api/userApi";
import { formatGender } from "../../../utils/genderUtils";
import UserDetailModalChakra from "./UserDetailModalChakra";
import { UserStatusToggleButton } from "./Button/UserStatusToggleButton";

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
        <Text fontSize="6xl" mb={4}>
          👥
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
          Không tìm thấy người dùng
        </Text>
        <Text color="gray.500">Thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn</Text>
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
                <Th>#</Th>
                <Th>Thông tin</Th>
                <Th>Liên hệ</Th>
                <Th>Vai trò</Th>
                <Th>Giới tính</Th>
                <Th>Trạng thái</Th>
                <Th>Hành động</Th>
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
                  {/* STT */}
                  <Td fontWeight="600" color="gray.600">
                    {index + 1}
                  </Td>

                  {/* Thông tin người dùng */}
                  <Td>
                    <HStack spacing={3}>
                      <Avatar
                        name={user.fullName}
                        size="md"
                        bg="blue.500"
                        color="white"
                      />
                      <VStack align="flex-start" spacing={0}>
                        <Text fontWeight="600" color="gray.800">
                          {user.fullName}
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>

                  {/* Liên hệ */}
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

                  {/* Vai trò */}
                  <Td>
                    <Text fontSize="sm" color="gray.800">
                      {user.role?.roleName || "N/A"}
                    </Text>
                  </Td>

                  {/* Giới tính */}
                  <Td>
                    <Text fontSize="sm" color="gray.800">
                      {formatGender(user.gender)}
                    </Text>
                  </Td>

                  {/* ✅ Trạng thái — thay text bằng button */}
                  <Td>
                    <UserStatusToggleButton
                      userId={user.userId}
                      fullName={user.fullName}
                      initialActive={user.isActive ?? false}
                    />
                  </Td>

                  {/* Hành động */}
                  {/* Hành động */}
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="Xem chi tiết" placement="top" hasArrow>
                        <IconButton
                          aria-label="View details"
                          icon={<FiEye />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => setSelectedUser(user)}
                        />
                      </Tooltip>

                      {/* 🔒 Ẩn Edit khi role là admin hoặc administrator */}
                      {onEdit &&
                        !/^(admin|administrator)$/i.test(
                          user.role?.roleName?.trim() || ""
                        ) && (
                          <Tooltip label="Chỉnh sửa" placement="top" hasArrow>
                            <IconButton
                              aria-label="Edit user"
                              icon={<FiEdit2 />}
                              size="sm"
                              colorScheme="green"
                              variant="ghost"
                              onClick={() => onEdit(user)}
                            />
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

      {/* Modal chi tiết */}
      {selectedUser && (
        <UserDetailModalChakra
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};
