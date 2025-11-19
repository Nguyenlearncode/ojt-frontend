import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiUsers } from "react-icons/fi";
import SearchFilterChakra from "../components/SearchFilterChakra";
import { UserTableChakra } from "../components/UserTableChakra";
import PaginationChakra from "../components/PaginationChakra";
import { useUsers } from "../hooks/useUsers";

const MotionBox = motion(Box);

const UserManagementPageChakra: React.FC = () => {
  const { users, loading, error, refetch } = useUsers();
  const navigate = useNavigate();

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Auto refetch when window gets focus
  useEffect(() => {
    const handleFocus = () => refetch && refetch();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetch]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber?.includes(searchTerm);

      const matchesRole =
  roleFilter === "" || user.role?.roleCode === roleFilter;

      const matchesGender = genderFilter === "" || user.gender === genderFilter;

      return matchesSearch && matchesRole && matchesGender;
    });
  }, [users, searchTerm, roleFilter, genderFilter]);

  // Pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Edit handler
  const handleEdit = (user: any) => {
    navigate(`/UpdateUserProfile/${user.userId}`);
  };

  // Loading state
  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" direction="column" gap={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.600">Đang tải dữ liệu người dùng...</Text>
      </Flex>
    );
  }

  // Error state
  if (error) {
    const isAuthError = error.includes("Session expired") || error.includes("login");

    return (
      <Container maxW="container.md" py={10}>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          minH="200px"
          borderRadius="xl"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <Text mt={4} mb={1} fontSize="lg" fontWeight="bold">
            {error}
          </Text>
          {isAuthError ? (
            <>
              <Text color="gray.600" mb={4}>
                Phiên đăng nhập đã hết hạn. Đang chuyển hướng...
              </Text>
              <Button
                colorScheme="red"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Đi đến trang đăng nhập
              </Button>
            </>
          ) : (
            <>
              <Text color="gray.600" mb={4}>
                Không thể tải dữ liệu người dùng. Vui lòng thử lại.
              </Text>
              <Button colorScheme="blue" onClick={() => refetch()}>
                Thử lại
              </Button>
            </>
          )}
        </Alert>
      </Container>
    );
  }

  // Main UI
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
                  <FiUsers size={28} />
                </Box>
                <Box>
                  <Heading 
                    size="xl" 
                    bgGradient="linear(to-r, pink.300, white, blue.300)"
                    bgClip="text"
                    fontWeight="extrabold"
                  >
                    Quản lý người dùng
                  </Heading>
                  <Text 
                    bgGradient="linear(to-r, whiteAlpha.900, pink.200)"
                    bgClip="text" 
                    fontSize="md"
                    textShadow="0px 1px 2px rgba(0,0,0,0.2)"
                  >
                    Quản lý và giám sát tất cả người dùng trong hệ thống
                  </Text>
                </Box>
              </HStack>
            </VStack>
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                leftIcon={<FiPlus />}
                variant="gradient"
                size="lg"
                onClick={() => navigate("/CreateUser")}
              >
                Tạo người dùng mới
              </Button>
            </MotionBox>
          </Flex>
        </MotionBox>

        {/* Search & Filter */}
        <SearchFilterChakra
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
        />

        {/* Table */}
        <UserTableChakra users={paginatedUsers} onEdit={handleEdit} />

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationChakra
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </Container>
    </Box>
  );
};

export default UserManagementPageChakra;

