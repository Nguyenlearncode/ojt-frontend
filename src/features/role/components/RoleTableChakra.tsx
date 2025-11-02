import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  IconButton,
  Tooltip,
  Badge,
  Flex,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiShield } from "react-icons/fi";
import type { Role } from "../api/roleApi";

const MotionTr = motion(Tr);
const MotionBox = motion(Box);

interface RoleTableChakraProps {
  roles: Role[];
  onEdit?: (role: Role) => void;
  onDelete?: (roleCode: string) => void;
}

export const RoleTableChakra: React.FC<RoleTableChakraProps> = ({
  roles,
  onEdit,
  onDelete,
}) => {
  if (roles.length === 0) {
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
          🛡️
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
          Không tìm thấy roles
        </Text>
        <Text color="gray.500">Thử điều chỉnh tìm kiếm hoặc tạo role mới</Text>
      </MotionBox>
    );
  }

  return (
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
              <Th>Tên Role</Th>
              <Th>Mã Role</Th>
              <Th>Mô tả</Th>
              <Th>Privileges</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>

          <Tbody>
            {roles.map((role, index) => (
              <MotionTr
                key={role.roleCode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                _hover={{ bg: "gray.50" }}
              >
                {/* STT */}
                <Td fontWeight="600" color="gray.600">
                  {index + 1}
                </Td>

                {/* Tên Role */}
                <Td>
                  <HStack spacing={3}>
                    <Box
                      p={2}
                      bg="blue.50"
                      borderRadius="lg"
                      color="blue.500"
                    >
                      <FiShield size={20} />
                    </Box>
                    <Text fontWeight="600" color="gray.800">
                      {role.roleName}
                    </Text>
                  </HStack>
                </Td>

                {/* Mã Role */}
                <Td>
                  <Badge colorScheme="purple" fontSize="sm" px={2} py={1} borderRadius="md">
                    {role.roleCode}
                  </Badge>
                </Td>

                {/* Mô tả */}
                <Td>
                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                    {role.roleDescription || "N/A"}
                  </Text>
                </Td>

                {/* Privileges */}
                <Td>
                  <Wrap spacing={1} maxW="300px">
                    {role.privileges && role.privileges.length > 0 ? (
                      role.privileges.slice(0, 3).map((priv) => (
                        <WrapItem key={priv.privilegeId}>
                          <Badge colorScheme="green" fontSize="xs">
                            {priv.privilegeName}
                          </Badge>
                        </WrapItem>
                      ))
                    ) : (
                      <Text fontSize="xs" color="gray.400">No privileges</Text>
                    )}
                    {role.privileges && role.privileges.length > 3 && (
                      <WrapItem>
                        <Badge colorScheme="gray" fontSize="xs">
                          +{role.privileges.length - 3} more
                        </Badge>
                      </WrapItem>
                    )}
                  </Wrap>
                </Td>

                {/* Hành động */}
                <Td>
                  <HStack spacing={2}>
                    {onEdit && (
                      <Tooltip label="Chỉnh sửa" placement="top" hasArrow>
                        <IconButton
                          aria-label="Edit role"
                          icon={<FiEdit2 />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => onEdit(role)}
                        />
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip label="Xóa" placement="top" hasArrow>
                        <IconButton
                          aria-label="Delete role"
                          icon={<FiTrash2 />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => onDelete(role.roleCode)}
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
  );
};

