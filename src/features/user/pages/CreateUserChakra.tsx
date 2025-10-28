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
  Select,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  IconButton,
  Icon,
  Flex,
  Divider,
  Badge,
  Progress,
  Tooltip,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUserPlus,
  FiShield,
  FiSave,
  FiRefreshCw,
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiHash,
  FiEye,
  FiEyeOff,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";

import GenderSelect from "../../../components/common/GenderSelect";
import DateField from "../../../components/common/DateField";
import { useCreateUserForm } from "../hooks/useCreateUserForm";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const CreateUserChakra: React.FC = () => {
  const {
    formData,
    setFormData,
    errors,
    loading,
    showPassword,
    showConfirm,
    setShowPassword,
    setShowConfirm,
    handleChange,
    handleSubmit,
    handleReset,
    handleBack,
  } = useCreateUserForm();

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Calculate form completion
  const calculateProgress = () => {
    const fields = [
      formData.roleCode,
      formData.password,
      formData.confirmPassword,
      formData.fullName,
      formData.email,
      formData.phoneNumber,
      formData.address,
      formData.gender,
      formData.dob,
      formData.age,
    ];
    const filled = fields.filter(Boolean).length;
    return (filled / fields.length) * 100;
  };

  const progress = calculateProgress();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Simple Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          mb={6}
        >
          <HStack spacing={4} mb={6}>
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
              <Heading
                size="xl"
                bgGradient="linear(to-r, white, whiteAlpha.900)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Create New User
              </Heading>
              <Text color="whiteAlpha.900" fontSize="md" fontWeight="500">
                Add a new member to your laboratory team
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Main Form Card */}
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
            {/* Section 1: Role Selection */}
            <MotionBox
              variants={itemVariants}
              p={8}
              bg="white"
              borderBottom="1px"
              borderColor="gray.100"
            >
              <HStack mb={6} spacing={3}>
                <Box
                  p={3}
                  bg="green.50"
                  borderRadius="xl"
                  as={motion.div}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon as={FiShield} boxSize={6} color="green.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Heading size="lg" color="gray.800">
                    Account Setup
                  </Heading>
                  <Text color="gray.500" fontSize="sm">
                    Configure user role
                  </Text>
                </VStack>
              </HStack>

              <SimpleGrid columns={{ base: 1 }} spacing={6}>
                {/* Role */}
                <FormControl isRequired isInvalid={!!errors.roleCode}>
                  <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                    <Icon as={FiShield} color="green.500" mr={2} />
                    <Text as="span">Role</Text>
                  </FormLabel>
                  <MotionBox
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Select
                      name="roleCode"
                      value={formData.roleCode}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("roleCode")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Select role"
                      size="lg"
                      focusBorderColor="green.400"
                      bg={focusedField === "roleCode" ? "green.50" : "gray.50"}
                      transition="all 0.3s"
                      _hover={{ bg: "green.50" }}
                    >
                      <option value="LAB_USER">Lab User</option>
                      <option value="LAB_MANAGER">Lab Manager</option>
                      <option value="ADMIN">Administrator</option>
                      <option value="SERVICE">Service</option>
                    </Select>
                  </MotionBox>
                  <AnimatePresence>
                    {errors.roleCode && (
                      <MotionBox
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.roleCode}
                        </Text>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </FormControl>
              </SimpleGrid>
            </MotionBox>

            {/* Divider with Icon */}
            <Flex align="center" px={8} py={4} bg="gray.50">
              <Divider />
              <Box
                mx={4}
                p={2}
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                as={motion.div}
                animate={{ rotate: 360 }}
                // @ts-ignore
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Icon as={FiUser} color="blue.500" />
              </Box>
              <Divider />
            </Flex>

            {/* Section 2: Personal Information */}
            <MotionBox variants={itemVariants} p={8}>
              <HStack mb={6} spacing={3}>
                <Box
                  p={3}
                  bg="blue.50"
                  borderRadius="xl"
                  as={motion.div}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Icon as={FiUser} boxSize={6} color="blue.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Heading size="lg" color="gray.800">
                    Personal Details
                  </Heading>
                  <Text color="gray.500" fontSize="sm">
                    User's personal information
                  </Text>
                </VStack>
              </HStack>

              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {/* Full Name */}
                  <FormControl isRequired isInvalid={!!errors.fullName}>
                    <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                      <Icon as={FiUser} color="blue.500" mr={2} />
                      <Text as="span">Full Name</Text>
                    </FormLabel>
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiUser} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("fullName")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Enter full name"
                          focusBorderColor="blue.400"
                          bg={focusedField === "fullName" ? "blue.50" : "gray.50"}
                          transition="all 0.3s"
                          _hover={{ bg: "blue.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.fullName && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.fullName}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>

                  {/* Email */}
                  <FormControl isRequired isInvalid={!!errors.email}>
                    <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                      <Icon as={FiMail} color="blue.500" mr={2} />
                      <Text as="span">Email Address</Text>
                    </FormLabel>
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiMail} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Enter email"
                          focusBorderColor="blue.400"
                          bg={focusedField === "email" ? "blue.50" : "gray.50"}
                          transition="all 0.3s"
                          _hover={{ bg: "blue.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.email && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
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
                      <Icon as={FiPhone} color="blue.500" mr={2} />
                      <Text as="span">Phone Number</Text>
                    </FormLabel>
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiPhone} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phoneNumber")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Enter phone number"
                          focusBorderColor="blue.400"
                          bg={
                            focusedField === "phoneNumber" ? "blue.50" : "gray.50"
                          }
                          transition="all 0.3s"
                          _hover={{ bg: "blue.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.phoneNumber && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
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
                      <Icon as={FiMapPin} color="blue.500" mr={2} />
                      <Text as="span">Address</Text>
                    </FormLabel>
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiMapPin} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("address")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Enter address"
                          focusBorderColor="blue.400"
                          bg={focusedField === "address" ? "blue.50" : "gray.50"}
                          transition="all 0.3s"
                          _hover={{ bg: "blue.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.address && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.address}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>
                </SimpleGrid>

                {/* Gender, DOB, Age Row */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <FormControl isRequired isInvalid={!!errors.gender}>
                    <FormLabel fontWeight="600" color="gray.700">
                      Gender
                    </FormLabel>
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GenderSelect
                        value={formData.gender}
                        onChange={(value) =>
                          setFormData({ ...formData, gender: value })
                        }
                      />
                    </MotionBox>
                    <AnimatePresence>
                      {errors.gender && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.gender}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.dob}>
                    <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                      <Icon as={FiCalendar} color="blue.500" mr={2} />
                      <Text as="span">Date of Birth</Text>
                    </FormLabel>
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <DateField
                        value={formData.dob}
                        onChange={(value) =>
                          setFormData({ ...formData, dob: value })
                        }
                      />
                    </MotionBox>
                    <AnimatePresence>
                      {errors.dob && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.dob}
                          </Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.age}>
                    <FormLabel fontWeight="600" color="gray.700" display="flex" alignItems="center">
                      <Icon as={FiHash} color="blue.500" mr={2} />
                      <Text as="span">Age</Text>
                    </FormLabel>
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiHash} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("age")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Age"
                          focusBorderColor="blue.400"
                          bg={focusedField === "age" ? "blue.50" : "gray.50"}
                          transition="all 0.3s"
                          _hover={{ bg: "blue.50" }}
                        />
                      </InputGroup>
                    </MotionBox>
                    <AnimatePresence>
                      {errors.age && (
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
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
                  onClick={handleBack}
                  minW="150px"
                  as={motion.button}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </Button>
                <HStack spacing={4}>
                  <Tooltip label="Clear all fields" placement="top">
                    <Button
                      leftIcon={<Icon as={FiRefreshCw} />}
                      variant="outline"
                      colorScheme="orange"
                      size="lg"
                      onClick={handleReset}
                      minW="150px"
                      as={motion.button}
                      whileHover={{ scale: 1.05, rotate: 180 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reset
                    </Button>
                  </Tooltip>
                  <Button
                    type="submit"
                    leftIcon={<Icon as={FiSave} />}
                    bgGradient="linear(to-r, green.400, teal.500)"
                    color="white"
                    size="lg"
                    isLoading={loading}
                    loadingText="Creating..."
                    minW="180px"
                    _hover={{
                      bgGradient: "linear(to-r, green.500, teal.600)",
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
                    Create User
                  </Button>
                </HStack>
              </MotionFlex>
            </Box>
          </Box>
        </MotionBox>
      </Container>

      {/* Global keyframes for shimmer effect */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default CreateUserChakra;
