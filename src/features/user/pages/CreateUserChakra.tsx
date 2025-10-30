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
        {/* Header */}
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
                Create New User
              </Heading>
              <Text color="whiteAlpha.900" fontSize="md">
                Add a new member to your laboratory team
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
            {/* Role */}
            <MotionBox variants={itemVariants} p={8} borderBottom="1px" borderColor="gray.100">
              <HStack mb={6} spacing={3}>
                <Icon as={FiShield} boxSize={6} color="green.500" />
                <Heading size="lg" color="gray.800">
                  Account Setup
                </Heading>
              </HStack>
              <FormControl isRequired isInvalid={!!errors.roleCode}>
                <FormLabel fontWeight="600" color="gray.700">Role</FormLabel>
                <Select
                  name="roleCode"
                  value={formData.roleCode}
                  onChange={handleChange}
                  size="lg"
                  focusBorderColor="green.400"
                  bg="gray.50"
                >
                  <option value="">Select role</option>
                  <option value="LAB_USER">Lab User</option>
                  <option value="LAB_MANAGER">Lab Manager</option>
                  <option value="ADMIN">Administrator</option>
                  <option value="SERVICE">Service</option>
                </Select>
              </FormControl>
            </MotionBox>

            {/* Personal Info */}
            <MotionBox variants={itemVariants} p={8}>
              <Heading size="lg" mb={6} color="gray.800">
                Personal Details
              </Heading>

              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {/* Full Name */}
                  <FormControl isRequired isInvalid={!!errors.fullName}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
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
                      placeholder="Enter email"
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>

                  {/* Phone */}
                  <FormControl isRequired isInvalid={!!errors.phoneNumber}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>

                  {/* Address */}
                  <FormControl isRequired isInvalid={!!errors.address}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      focusBorderColor="blue.400"
                      bg="gray.50"
                    />
                  </FormControl>
                </SimpleGrid>

                {/* Gender - DOB - Age */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {/* Gender */}
                  <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>
                    <GenderSelect
                      value={formData.gender}
                      onChange={(value) => setFormData({ ...formData, gender: value })}
                    />
                  </FormControl>

                  {/* Date of Birth */}
                  <FormControl isRequired isInvalid={!!errors.dateOfBirth}>
                    <FormLabel>Date of Birth</FormLabel>
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

                  {/* Age */}
                  <FormControl isRequired isInvalid={!!errors.age}>
                    <FormLabel>Age</FormLabel>
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
                  <FormLabel>CCCD / Identify Number</FormLabel>
                  <Input
                    name="cccd"
                    value={formData.cccd}
                    onChange={handleChange}
                    placeholder="Enter identify number"
                    focusBorderColor="blue.400"
                    bg="gray.50"
                  />
                </FormControl>
              </VStack>
            </MotionBox>

            {/* Actions */}
            <Box p={8} bg="gray.50" borderTop="1px" borderColor="gray.200">
              <MotionFlex gap={4} justify="space-between">
                <Button
                  leftIcon={<FiArrowLeft />}
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <HStack spacing={4}>
                  <Tooltip label="Clear all fields">
                    <Button
                      leftIcon={<FiRefreshCw />}
                      variant="outline"
                      colorScheme="orange"
                      size="lg"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Tooltip>
                  <Button
                    type="submit"
                    leftIcon={<FiSave />}
                    bgGradient="linear(to-r, green.400, teal.500)"
                    color="white"
                    size="lg"
                    isLoading={loading}
                    loadingText="Creating..."
                    _hover={{
                      bgGradient: "linear(to-r, green.500, teal.600)",
                      transform: "scale(1.05)",
                      boxShadow: "xl",
                    }}
                  >
                    Create User
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
