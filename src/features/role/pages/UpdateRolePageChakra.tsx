import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Icon,
  Badge,
  Flex,
  Checkbox,
  InputGroup,
  InputLeftElement,
  Spinner,
  useColorModeValue,
  SimpleGrid,
  IconButton,
  Tooltip,
  Collapse,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FiShield,
  FiArrowLeft,
  FiSave,
  FiRotateCcw,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useUpdateRole } from "../hooks/useUpdateRole";
import { usePrivileges } from "../hooks/usePrivileges";
import { roleApi, type Role } from "../api/roleApi";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const UpdateRolePageChakra: React.FC = () => {
  const { roleCode } = useParams<{ roleCode: string }>();
  const [role, setRole] = useState<Role | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);

  // Fetch role data by roleCode
  useEffect(() => {
    const fetchRole = async () => {
      if (!roleCode) return;
      try {
        setLoadingRole(true);
        const roles = await roleApi.getAllRoles();
        const foundRole = roles.find((r) => r.roleCode === roleCode);
        if (foundRole) {
          setRole(foundRole);
        }
      } catch (error) {
        // Silent error handling
      } finally {
        setLoadingRole(false);
      }
    };

    fetchRole();
  }, [roleCode]);

  const {
    formData,
    setFormData,
    errors,
    loading,
    handleChange,
    togglePrivilege,
    handleSubmit,
  } = useUpdateRole(role);

  const { privileges, loading: privilegesLoading } = usePrivileges();
  const [searchPrivilege, setSearchPrivilege] = useState("");
  const [compactView, setCompactView] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  // Auto enable compact view if too many privileges
  useEffect(() => {
    if (privileges.length > 15) {
      setCompactView(true);
    }
  }, [privileges.length]);

  // Filter privileges based on search
  const filteredPrivileges = useMemo(() => {
    if (!searchPrivilege.trim()) return privileges;
    const searchLower = searchPrivilege.toLowerCase();
    return privileges.filter(
      (p) =>
        p.privilegeName.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
    );
  }, [privileges, searchPrivilege]);

  // Check if all filtered privileges are selected
  const allFilteredSelected = useMemo(() => {
    if (filteredPrivileges.length === 0) return false;
    return filteredPrivileges.every((p) =>
      formData.privileges.some((selected) => selected.privilegeId === p.privilegeId)
    );
  }, [filteredPrivileges, formData.privileges]);

  // Select/Deselect all filtered privileges
  const handleToggleAllFiltered = () => {
    if (allFilteredSelected) {
      const filteredIds = new Set(filteredPrivileges.map((p) => p.privilegeId));
      setFormData((prev) => ({
        ...prev,
        privileges: prev.privileges.filter((p) => !filteredIds.has(p.privilegeId)),
      }));
    } else {
      const existingIds = new Set(formData.privileges.map((p) => p.privilegeId));
      const toAdd = filteredPrivileges.filter((p) => !existingIds.has(p.privilegeId));
      setFormData((prev) => ({
        ...prev,
        privileges: [...prev.privileges, ...toAdd],
      }));
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loadingRole) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" thickness="4px" />
          <Text color="white" fontSize="lg">
            Đang tải thông tin role...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!role) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Alert status="error" maxW="md" borderRadius="xl">
          <AlertIcon />
          <VStack align="flex-start" spacing={2}>
            <Text fontWeight="600">Không tìm thấy role</Text>
            <Button onClick={handleBack} size="sm" variant="outline">
              Quay lại
            </Button>
          </VStack>
        </Alert>
      </Box>
    );
  }

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Tiêu đề */}
        <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} mb={6}>
          <HStack spacing={4}>
            <Box
              p={3}
              bgGradient="linear(to-r, blue.400, cyan.500)"
              borderRadius="xl"
              boxShadow="lg"
              as={motion.div}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon as={FiShield} boxSize={8} color="white" />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Heading size="xl" color="white">
                Cập nhật Role
              </Heading>
              <Text color="whiteAlpha.900" fontSize="md">
                Chỉnh sửa thông tin role và privileges
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
            borderRadius="3xl"
            boxShadow="2xl"
            border="1px"
            borderColor="gray.200"
            overflow="hidden"
          >
            {/* Thông tin Role */}
            <MotionBox variants={itemVariants} p={8} borderBottom="1px" borderColor="gray.100">
              <HStack mb={6} spacing={3}>
                <Icon as={FiShield} boxSize={6} color="blue.500" />
                <Heading size="lg" color="gray.800">
                  Thông tin Role
                </Heading>
              </HStack>

              <VStack spacing={6}>
                {/* Role Name */}
                <FormControl isRequired isInvalid={!!errors.roleName}>
                  <FormLabel fontWeight="600" color="gray.700">
                    Tên Role
                  </FormLabel>
                  <Input
                    placeholder="Ví dụ: Nhân viên phòng thí nghiệm"
                    value={formData.roleName}
                    onChange={(e) => handleChange("roleName", e.target.value)}
                    size="lg"
                    focusBorderColor="blue.400"
                    bg="gray.50"
                  />
                  {errors.roleName && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.roleName}
                    </Text>
                  )}
                </FormControl>

                {/* Role Code */}
                <FormControl isRequired isInvalid={!!errors.roleCode}>
                  <FormLabel fontWeight="600" color="gray.700">
                    Mã Role
                  </FormLabel>
                  <Input
                    value={formData.roleCode}
                    size="lg"
                    bg="gray.200"
                    isReadOnly
                    cursor="not-allowed"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Mã role không thể thay đổi
                  </Text>
                </FormControl>

                {/* Role Description */}
                <FormControl>
                  <FormLabel fontWeight="600" color="gray.700">
                    Mô tả
                  </FormLabel>
                  <Textarea
                    placeholder="Mô tả về role này..."
                    value={formData.roleDescription}
                    onChange={(e) => handleChange("roleDescription", e.target.value)}
                    size="lg"
                    focusBorderColor="blue.400"
                    bg="gray.50"
                    rows={4}
                  />
                </FormControl>
              </VStack>
            </MotionBox>

            {/* Privileges */}
            <MotionBox variants={itemVariants} p={8}>
              <HStack mb={6} spacing={3} justify="space-between" flexWrap="wrap">
                <HStack spacing={3}>
                  <Icon as={FiShield} boxSize={6} color="blue.500" />
                  <Heading size="lg" color="gray.800">
                    Privileges
                  </Heading>
                  {formData.privileges.length > 0 && (
                    <Badge colorScheme="blue" fontSize="md" px={3} py={1} borderRadius="full">
                      {formData.privileges.length}/{privileges.length} đã chọn
                    </Badge>
                  )}
                </HStack>
                <HStack spacing={2}>
                  <Tooltip label={compactView ? "Chế độ chi tiết" : "Chế độ compact"}>
                    <IconButton
                      aria-label="Toggle view"
                      icon={compactView ? <FiList /> : <FiGrid />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => setCompactView(!compactView)}
                    />
                  </Tooltip>
                  {filteredPrivileges.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      onClick={handleToggleAllFiltered}
                      isDisabled={loading}
                    >
                      {allFilteredSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                    </Button>
                  )}
                </HStack>
              </HStack>

              {privilegesLoading ? (
                <Box
                  p={12}
                  textAlign="center"
                  bg={bgColor}
                  borderRadius="xl"
                  border="1px"
                  borderColor={borderColor}
                >
                  <Spinner size="xl" color="blue.500" mb={4} thickness="4px" />
                  <Text fontSize="lg" color="gray.600" fontWeight="500">
                    Đang tải privileges...
                  </Text>
                </Box>
              ) : (
                <VStack align="stretch" spacing={4}>
                  {/* Search box */}
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiSearch} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Tìm kiếm privilege..."
                      value={searchPrivilege}
                      onChange={(e) => setSearchPrivilege(e.target.value)}
                      bg="white"
                      focusBorderColor="blue.400"
                      borderWidth="2px"
                    />
                  </InputGroup>

                  {/* Selected privileges summary */}
                  {formData.privileges.length > 0 && (
                    <Box
                      p={4}
                      bg="blue.50"
                      borderRadius="xl"
                      border="2px"
                      borderColor="blue.200"
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        mb={showSummary ? 3 : 0}
                      >
                        <HStack
                          cursor="pointer"
                          onClick={() => setShowSummary(!showSummary)}
                          flex={1}
                        >
                          <Icon as={FiShield} color="blue.500" />
                          <Text fontSize="sm" color="gray.700" fontWeight="600">
                            Đã chọn {formData.privileges.length} privilege{formData.privileges.length > 1 ? 's' : ''}
                          </Text>
                          <Icon
                            as={showSummary ? FiChevronUp : FiChevronDown}
                            boxSize={4}
                            color="blue.500"
                          />
                        </HStack>
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData((prev) => ({ ...prev, privileges: [] }));
                          }}
                          leftIcon={<Icon as={FiRotateCcw} />}
                        >
                          Bỏ chọn tất cả
                        </Button>
                      </Flex>
                      <Collapse in={showSummary} animateOpacity>
                        <Flex gap={2} flexWrap="wrap" maxH="150px" overflowY="auto">
                          {formData.privileges.map((priv) => (
                            <Badge
                              key={priv.privilegeId}
                              colorScheme="blue"
                              fontSize="xs"
                              px={3}
                              py={1.5}
                              borderRadius="full"
                            >
                              {priv.privilegeName}
                            </Badge>
                          ))}
                        </Flex>
                      </Collapse>
                    </Box>
                  )}

                  {/* Privileges list */}
                  <Box
                    maxH="600px"
                    overflowY="auto"
                    p={compactView ? 3 : 4}
                    bg={bgColor}
                    borderRadius="xl"
                    border="2px"
                    borderColor={borderColor}
                    css={{
                      '&::-webkit-scrollbar': {
                        width: '10px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#3182CE',
                        borderRadius: '10px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#2C5282',
                      },
                    }}
                  >
                    {filteredPrivileges.length === 0 ? (
                      <Text fontSize="md" color="gray.500" textAlign="center" py={8}>
                        {searchPrivilege
                          ? "Không tìm thấy privilege nào"
                          : "Không có privilege nào"}
                      </Text>
                    ) : compactView ? (
                      // Compact view: Grid layout
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
                        {filteredPrivileges.map((privilege) => {
                          const isSelected = formData.privileges.some(
                            (p) => p.privilegeId === privilege.privilegeId
                          );
                          return (
                            <Box
                              key={privilege.privilegeId}
                              p={3}
                              borderRadius="lg"
                              bg={isSelected ? "blue.50" : "white"}
                              border="2px"
                              borderColor={isSelected ? "blue.400" : borderColor}
                              cursor="pointer"
                              onClick={() => togglePrivilege(privilege)}
                              _hover={{
                                borderColor: isSelected ? "blue.500" : "blue.300",
                                bg: isSelected ? "blue.100" : "blue.50",
                                transform: "translateY(-2px)",
                                boxShadow: "md",
                              }}
                              transition="all 0.2s"
                            >
                              <Flex align="center" gap={3}>
                                <Checkbox
                                  isChecked={isSelected}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    togglePrivilege(privilege);
                                  }}
                                  colorScheme="blue"
                                  size="lg"
                                />
                                <Text
                                  fontSize="sm"
                                  fontWeight="600"
                                  color="gray.800"
                                  flex={1}
                                  noOfLines={2}
                                >
                                  {privilege.privilegeName}
                                </Text>
                              </Flex>
                            </Box>
                          );
                        })}
                      </SimpleGrid>
                    ) : (
                      // Detailed view: List layout
                      <VStack align="stretch" spacing={3}>
                        {filteredPrivileges.map((privilege) => {
                          const isSelected = formData.privileges.some(
                            (p) => p.privilegeId === privilege.privilegeId
                          );
                          return (
                            <Box
                              key={privilege.privilegeId}
                              as={motion.div}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              p={4}
                              borderRadius="xl"
                              bg={isSelected ? "blue.50" : "white"}
                              border="2px"
                              borderColor={isSelected ? "blue.400" : borderColor}
                              cursor="pointer"
                              onClick={() => togglePrivilege(privilege)}
                              _hover={{
                                borderColor: isSelected ? "blue.500" : "blue.300",
                                bg: isSelected ? "blue.100" : "blue.50",
                                transform: "translateX(4px)",
                                boxShadow: "lg",
                              }}
                              transition="all 0.2s"
                            >
                              <Flex align="flex-start" gap={4}>
                                <Checkbox
                                  isChecked={isSelected}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    togglePrivilege(privilege);
                                  }}
                                  colorScheme="blue"
                                  size="lg"
                                  mt={1}
                                />
                                <VStack align="flex-start" spacing={1} flex={1}>
                                  <Text fontSize="md" fontWeight="600" color="gray.800">
                                    {privilege.privilegeName}
                                  </Text>
                                  {privilege.description && (
                                    <Text fontSize="sm" color="gray.600" lineHeight="1.5">
                                      {privilege.description}
                                    </Text>
                                  )}
                                </VStack>
                              </Flex>
                            </Box>
                          );
                        })}
                      </VStack>
                      )}
                    </Box>
                </VStack>
              )}

              {errors.submit && (
                <Alert status="error" borderRadius="xl" mt={4}>
                  <AlertIcon />
                  {errors.submit}
                </Alert>
              )}
            </MotionBox>
          </Box>

          {/* Action Buttons */}
          <MotionFlex
            variants={itemVariants}
            justify="space-between"
            mt={8}
            gap={4}
            flexWrap="wrap"
          >
            <Button
              leftIcon={<FiArrowLeft />}
              size="lg"
              variant="outline"
              onClick={handleBack}
              isDisabled={loading}
              colorScheme="gray"
            >
              Quay lại
            </Button>

            <Button
              type="submit"
              leftIcon={<FiSave />}
              size="lg"
              variant="gradient"
              isLoading={loading}
              loadingText="Đang cập nhật..."
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
            >
              Cập nhật Role
            </Button>
          </MotionFlex>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default UpdateRolePageChakra;

