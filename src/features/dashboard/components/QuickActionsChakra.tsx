// src/features/dashboard/components/QuickActionsChakra.tsx
import React from "react";
import { Box, Heading, SimpleGrid, Flex, Text, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiUserPlus, FiUsers } from "react-icons/fi";

const MotionBox = motion(Box);

const QuickActionsChakra: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: "create-user",
      title: "Tạo người dùng",
      description: "Thêm người dùng mới vào hệ thống",
      icon: FiUserPlus,
      color: "blue.500",
      bgColor: "blue.50",
      path: "/CreateUser",
    },
    {
      id: "manage-users",
      title: "Quản lý người dùng",
      description: "Xem và chỉnh sửa tài khoản người dùng",
      icon: FiUsers,
      color: "green.500",
      bgColor: "green.50",
      path: "/UserManagement",
    },

  ];

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.3s"
    >
      <Heading size="md" mb={6} color="gray.700">
        Quick Actions
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {actions.map((action, index) => (
          <MotionBox
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flex
              p={4}
              borderRadius="lg"
              bg={action.bgColor}
              cursor="pointer"
              onClick={() => navigate(action.path)}
              align="center"
              gap={4}
              transition="all 0.2s"
              _hover={{
                boxShadow: "md",
                bg: `${action.color.split('.')[0]}.100`,
              }}
            >
              {/* Icon */}
              <Flex
                bg="white"
                color={action.color}
                p={3}
                borderRadius="lg"
                boxShadow="sm"
                flexShrink={0}
              >
                <Icon as={action.icon} boxSize={6} />
              </Flex>

              {/* Content */}
              <Box flex={1}>
                <Text fontWeight="700" color="gray.800" fontSize="sm" mb={1}>
                  {action.title}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {action.description}
                </Text>
              </Box>
            </Flex>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QuickActionsChakra;

