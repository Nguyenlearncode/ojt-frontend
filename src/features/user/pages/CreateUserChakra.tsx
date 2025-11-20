// src/features/user/pages/CreateUserChakra.tsx
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Icon,
  Flex,
  Tooltip,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion, type Variants } from "framer-motion";
import {
  FiUserPlus,
  FiShield,
  FiSave,
  FiRefreshCw,
  FiArrowLeft,
} from "react-icons/fi";

import GenderSelect from "../../../components/common/GenderSelect";
import { useCreateUserForm } from "../hooks/useCreateUserForm";
import { useRoles } from "../../role/hooks/useRoles";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const CreateUserChakra: React.FC = () => {
  const {
    formData,
    setFormData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleReset,
    handleBack,
  } = useCreateUserForm();
  
  const { roles, loading: rolesLoading } = useRoles();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Tiêu đề */}
        <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} mb={6}>
          <HStack spacing={4}>
            <Box
              p={3}
              bgGradient="linear(to-r, green.400, teal.500)"
              borderRadius="xl"
              boxShadow="lg"
              as={motion.div}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon as={FiUserPlus} boxSize={8} color="white" />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Heading size="xl" color="white">
                Tạo người dùng mới
              </Heading>
              <Text color="whiteAlpha.900" fontSize="md">
                Thêm thành viên mới vào đội ngũ phòng xét nghiệm
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Form */}
        <MotionBox as="form" onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible">
          <Box
            bg="white"
            borderRadius="3xl"
            boxShadow="2xl"
            border="1px"
            borderColor="gray.200"
            overflow="hidden"
          >
            {/* Thiết lập tài khoản */}
            <MotionBox variants={itemVariants} p={8} borderBottom="1px" borderColor="gray.100">
              <HStack mb={6} spacing={3}>
                <Icon as={FiShield} boxSize={6} color="green.500" />
                <Heading size="lg" color="gray.800">
                  Thiết lập tài khoản
                </Heading>
              </HStack>
              <FormControl isRequired isInvalid={!!errors.roleCode}>
                <FormLabel fontWeight="600" color="gray.700">Vai trò</FormLabel>
                <Select
                  name="roleCode"
                  value={formData.roleCode}
                  onChange={handleChange}
                  size="lg"
                  focusBorderColor="green.400"
                  bg="gray.50"
                  isDisabled={rolesLoading}
                >
                  <option value="">{rolesLoading ? "Đang tải..." : "Chọn vai trò"}</option>
                  {roles.map((role) => (
                    <option key={role.roleCode} value={role.roleCode}>
                      {role.roleName}
                    </option>
                  ))}
                </Select>
                {rolesLoading && (
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Đang tải danh sách roles...
                  </Text>
                )}
                {errors.roleCode && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.roleCode}
                  </Text>
                )}
              </FormControl>
            </MotionBox>

            {/* Thông tin cá nhân */}
            <MotionBox variants={itemVariants} p={8}>
              <Heading size="lg" mb={6} color="gray.800">
                Thông tin cá nhân
              </Heading>

              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {/* Họ và tên */}
                  <FormControl isRequired isInvalid={!!errors.fullName}>
                    <FormLabel>Họ và tên</FormLabel>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>

                  {/* Email */}
                  <FormControl isRequired isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ email"
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>

                  {/* Số điện thoại */}
                  <FormControl isRequired isInvalid={!!errors.phoneNumber}>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>

                  {/* Địa chỉ */}
                  <FormControl isRequired isInvalid={!!errors.address}>
                    <FormLabel>Địa chỉ</FormLabel>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ"
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>
                </SimpleGrid>

                {/* Giới tính - Ngày sinh - Tuổi */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {/* Giới tính */}
                  <FormControl isRequired>
                    
                    <GenderSelect
                      value={formData.gender}
                      onChange={(value) => setFormData({ ...formData, gender: value })}
                    />
                  </FormControl>

                  {/* Ngày sinh */}
                  <FormControl isRequired isInvalid={!!errors.dateOfBirth}>
                    <FormLabel>Ngày sinh</FormLabel>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ""}
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        setFormData({
                          ...formData,
                          dateOfBirth: selectedDate,
                        });
                      }}
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>

                  {/* Tuổi */}
                  <FormControl isRequired isInvalid={!!errors.age}>
                    <FormLabel>Tuổi</FormLabel>
                    <Input
                      type="number"
                      name="age"
                      value={formData.age}
                      readOnly
                      focusBorderColor="blue.400"
                      bg="gray.100"
                    />
                  </FormControl>
                </SimpleGrid>

                {/* CCCD */}
                <FormControl isRequired isInvalid={!!errors.cccd}>
                  <FormLabel>Số CCCD / CMND</FormLabel>
                  <Input
                    name="cccd"
                    value={formData.cccd}
                    onChange={handleChange}
                    placeholder="Nhập số CCCD hoặc CMND"
                    focusBorderColor="blue.400"
                    bg="gray.50"
                  />
                </FormControl>
              </VStack>
            </MotionBox>

            {/* Nút hành động */}
            <Box p={8} bg="gray.50" borderTop="1px" borderColor="gray.200">
              <MotionFlex gap={4} justify="space-between">
                <Button
                  leftIcon={<FiArrowLeft />}
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  onClick={handleBack}
                >
                  Quay lại
                </Button>
                <HStack spacing={4}>
                  <Tooltip label="Xóa toàn bộ dữ liệu trong form">
                    <Button
                      leftIcon={<FiRefreshCw />}
                      variant="outline"
                      colorScheme="orange"
                      size="lg"
                      onClick={handleReset}
                    >
                      Làm mới
                    </Button>
                  </Tooltip>
                  <Button
                    type="submit"
                    leftIcon={<FiSave />}
                    bgGradient="linear(to-r, green.400, teal.500)"
                    color="white"
                    size="lg"
                    isLoading={loading}
                    loadingText="Đang tạo..."
                    _hover={{
                      bgGradient: "linear(to-r, green.500, teal.600)",
                      transform: "scale(1.05)",
                      boxShadow: "xl",
                    }}
                  >
                    Tạo người dùng
                  </Button>
                </HStack>
              </MotionFlex>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CreateUserChakra;
