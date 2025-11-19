import React, { useState } from "react";
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
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
  Spinner,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  FiUserCheck,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiHash,
  FiUser,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";
import GenderSelect from "../../../components/common/GenderSelect";
import { useUpdateUserProfile } from "../hooks/useUpdateUserProfile";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const UpdateUserProfileChakra: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    setFormData,
    handleChange,
    handleSubmit,
    navigate,
  } = useUpdateUserProfile();

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  if (!formData) {
    return (
      <Center minH="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" thickness="4px" />
          <Text color="white" fontSize="lg" textShadow="0 2px 4px rgba(0,0,0,0.3)">
            Đang tải dữ liệu...
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Header */}
        <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} mb={6}>
          <HStack spacing={4} mb={6}>
            <Box
              p={3}
              bgGradient="linear(to-r, purple.400, purple.600)"
              borderRadius="xl"
              boxShadow="lg"
              as={motion.div}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Icon as={FiUserCheck} boxSize={8} color="white" />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Heading
                size="xl"
                bgGradient="linear(to-r, white, whiteAlpha.900)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Cập nhật Hồ sơ Người dùng
              </Heading>
              <Text color="whiteAlpha.900" fontSize="md" fontWeight="500">
                Chỉnh sửa và cập nhật thông tin tài khoản
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Form */}
        <MotionBox
          as="form"
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            bg="white"
            backdropFilter="blur(20px)"
            borderRadius="3xl"
            boxShadow="2xl"
            border="1px"
            borderColor="gray.200"
            overflow="hidden"
          >
            {/* Personal Information */}
            <MotionBox variants={itemVariants} p={8}>
              <HStack mb={6} spacing={3}>
                <Box
                  p={3}
                  bg="purple.50"
                  borderRadius="xl"
                  as={motion.div}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon as={FiUser} boxSize={6} color="purple.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Heading size="lg" color="gray.800">
                    Thông tin người dùng
                  </Heading>
                  <Text color="gray.500" fontSize="sm">
                    Cập nhật thông tin cá nhân
                  </Text>
                </VStack>
              </HStack>

              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {/* Full Name */}
                  <FormControl isRequired isInvalid={!!errors.fullName}>
                    <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                      <Icon as={FiUser} color="purple.500" mr={2} />
                      <Text as="span">Họ và tên</Text>
                    </FormLabel>
                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiUser} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="fullName"
                          value={formData.fullName || ""}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("fullName")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Nhập họ và tên"
                          focusBorderColor="purple.400"
                          bg={focusedField === "fullName" ? "purple.50" : "gray.50"}
                          transition="all 0.3s"
                          _hover={{ bg: "purple.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.fullName && (
                        <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.fullName}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>

                  {/* Email */}
                  <FormControl isRequired isInvalid={!!errors.email}>
                    <FormLabel
                      fontWeight="600"
                      color="gray.700"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FiMail} color="purple.500" mr={2} />
                      <Text as="span">Email</Text>
                    </FormLabel>

                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiMail} color="gray.400" />
                        </InputLeftElement>

                        <Input
                          type="email"
                          name="email"
                          value={formData.email || ""}
                          isDisabled      
                          placeholder="Email không thể thay đổi"
                          focusBorderColor="purple.400"
                          bg="gray.100"   
                          cursor="not-allowed"
                          height="48px"   
                          _disabled={{
                            opacity: 1,   
                            bg: "gray.100",
                            color: "gray.700",
                          }}
                        />
                      </InputGroup>
                    </MotionBox>

                    <AnimatePresence>
                      {errors.email && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          minH="20px" // ✅ giữ chỗ tránh nút bị nhảy khi lỗi xuất hiện
                        >
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.email}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>


                  {/* Phone */}
                  <FormControl isRequired isInvalid={!!errors.phoneNumber}>
                    <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                      <Icon as={FiPhone} color="purple.500" mr={2} />
                      <Text as="span">Số điện thoại</Text>
                    </FormLabel>
                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiPhone} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="phoneNumber"
                          value={formData.phoneNumber || ""}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phoneNumber")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Nhập số điện thoại"
                          focusBorderColor="purple.400"
                          bg={focusedField === "phoneNumber" ? "purple.50" : "gray.50"}
                          transition="all 0.3s"
                          _hover={{ bg: "purple.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.phoneNumber && (
                        <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.phoneNumber}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>

                  {/* Address */}
                  <FormControl isRequired isInvalid={!!errors.address}>
                    <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                      <Icon as={FiMapPin} color="purple.500" mr={2} />
                      <Text as="span">Địa chỉ</Text>
                    </FormLabel>
                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiMapPin} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("address")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Nhập địa chỉ"
                          focusBorderColor="purple.400"
                          bg={focusedField === "address" ? "purple.50" : "gray.50"}
                          transition="all 0.3s"
                          _hover={{ bg: "purple.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.address && (
                        <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.address}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>
                </SimpleGrid>

                {/* Gender - DOB - Age */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {/* Gender */}
                  <FormControl isRequired isInvalid={!!errors.gender}>
                    
                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <GenderSelect
                        value={formData.gender || ""}
                        onChange={(value) =>
                          setFormData({ ...formData, gender: value })
                        }
                      />
                    </MotionBox>
                    <AnimatePresence>
                      {errors.gender && (
                        <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.gender}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>

                  {/* Date of Birth */}
                  <FormControl isRequired isInvalid={!!errors.dateOfBirth}>
                    <FormLabel
                      fontWeight="600"
                      color="gray.700"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FiCalendar} color="purple.500" mr={2} />
                      <Text as="span">Ngày sinh</Text>
                    </FormLabel>
                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiCalendar} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dateOfBirth: e.target.value,
                            })
                          }
                          onFocus={() => setFocusedField("dateOfBirth")}
                          onBlur={() => setFocusedField(null)}
                          focusBorderColor="purple.400"
                          bg={
                            focusedField === "dateOfBirth"
                              ? "purple.50"
                              : "gray.50"
                          }
                          transition="all 0.3s"
                          _hover={{ bg: "purple.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.dateOfBirth && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.dateOfBirth}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>

                  {/* Age */}
                  <FormControl isRequired isInvalid={!!errors.age}>
                    <FormLabel
                      fontWeight="600"
                      color="gray.700"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FiHash} color="purple.500" mr={2} />
                      <Text as="span">Tuổi</Text>
                    </FormLabel>
                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiHash} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="number"
                          name="age"
                          value={formData.age || ""}
                          readOnly
                          focusBorderColor="purple.400"
                          bg="gray.100"
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.age && (
                        <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.age}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </MotionBox>

            {/* Action Buttons */}
            <Box p={8} bg="gray.50" borderTop="1px" borderColor="gray.200">
              <MotionFlex
                gap={4}
                variants={itemVariants}
                justify="space-between"
                flexWrap="wrap"
              >
                <Button
                  leftIcon={<Icon as={FiArrowLeft} />}
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  onClick={() => navigate(-1)}
                  minW="150px"
                  as={motion.button}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  leftIcon={<Icon as={FiSave} />}
                  bgGradient="linear(to-r, purple.400, purple.600)"
                  color="white"
                  size="lg"
                  isLoading={loading}
                  loadingText="Đang cập nhật..."
                  minW="180px"
                  _hover={{
                    bgGradient: "linear(to-r, purple.500, purple.700)",
                    transform: "scale(1.05)",
                    boxShadow: "xl",
                  }}
                  _active={{
                    transform: "scale(0.95)",
                  }}
                  transition="all 0.3s"
                  as={motion.button}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  Cập nhật
                </Button>
              </MotionFlex>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default UpdateUserProfileChakra;
