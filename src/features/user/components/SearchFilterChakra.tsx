import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  VStack,
  Text,
  Button,
  Wrap,
  WrapItem,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiUsers, FiX } from "react-icons/fi";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface SearchFilterChakraProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  genderFilter: string;
  onGenderFilterChange: (value: string) => void;
}

const roles = [
  { value: "Administrator", label: "Administrator", color: "purple" },
  { value: "Lab Manager", label: "Lab Manager", color: "blue" },
  { value: "Service", label: "Service", color: "green" },
  { value: "Lab User", label: "Lab User", color: "orange" },
  { value: "Custom Role", label: "Custom Role", color: "pink" },
];

const genders = [
  { value: "Male", label: "Nam", icon: BsGenderMale, color: "blue" },
  { value: "Female", label: "Nữ", icon: BsGenderFemale, color: "pink" },
];

const SearchFilterChakra: React.FC<SearchFilterChakraProps> = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  genderFilter,
  onGenderFilterChange,
}) => {
  const [showRoles, setShowRoles] = useState(false);
  const [showGenders, setShowGenders] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const activeFiltersCount = [roleFilter, genderFilter].filter(Boolean).length;

  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      mb={6}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="2xl"
        boxShadow="lg"
        position="relative"
        overflow="hidden"
        border="1px"
        borderColor="gray.100"
      >
        {/* Animated background gradient */}
        <Box
          position="absolute"
          top="-50%"
          right="-10%"
          width="300px"
          height="300px"
          bgGradient="linear(to-br, purple.200, pink.200, blue.200)"
          opacity={0.15}
          borderRadius="full"
          filter="blur(60px)"
          as={motion.div}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          // @ts-ignore - Framer Motion transition prop
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <VStack spacing={5} align="stretch" position="relative" zIndex={1}>
          {/* Filter Section */}
          <Box>
            <Flex gap={3} mb={3} align="center" flexWrap="wrap">
              {/* Modern Neumorphic Search Box */}
              <MotionBox
                bg="white"
                h="40px"
                borderRadius="30px"
                px={4}
                py={2}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                cursor="pointer"
                boxShadow="4px 4px 6px 0 rgba(255,255,255,.3), -4px -4px 6px 0 rgba(116, 125, 136, .2), inset -4px -4px 6px 0 rgba(255,255,255,.2), inset 4px 4px 6px 0 rgba(0, 0, 0, .2)"
                onMouseEnter={() => setIsSearchFocused(true)}
                onMouseLeave={() => !searchTerm && setIsSearchFocused(false)}
                whileHover={{
                  skew: [0, 5, -5, 5, -5, 0],
                }}
                // @ts-ignore
                transition={{ duration: 0.45, ease: "linear" }}
                minW="50px"
              >
                <Box
                  as={motion.div}
                  mr={isSearchFocused || searchTerm ? 2 : 0}
                  animate={{
                    rotate: searchTerm ? 360 : 0,
                    scale: isSearchFocused ? [1, 1.2, 1] : 1,
                  }}
                  // @ts-ignore
                  transition={{ duration: 0.5 }}
                >
                  <Icon as={FiSearch} color="#5cbdbb" boxSize={5} />
                </Box>
              <Input
                  placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => !searchTerm && setIsSearchFocused(false)}
                  bg="transparent"
                  border="none"
                  outline="none"
                  w={isSearchFocused || searchTerm ? "350px" : "0px"}
                  fontWeight="500"
                  fontSize="15px"
                  transition="width 0.8s"
                  _placeholder={{
                    color: "gray.400",
                  }}
                _focus={{
                    boxShadow: "none",
                    border: "none",
                  }}
                  px={isSearchFocused || searchTerm ? 2 : 0}
                />
              </MotionBox>

              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Lọc theo:
              </Text>
              
              {/* Role Filter Toggle */}
              <MotionButton
                size="sm"
                variant={showRoles ? "solid" : "outline"}
                colorScheme={showRoles ? "purple" : "gray"}
                leftIcon={<Icon as={FiUsers} />}
                onClick={() => setShowRoles(!showRoles)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                boxShadow={showRoles ? "md" : "sm"}
              >
                Vai trò
                {roleFilter && (
                  <Badge ml={2} colorScheme="purple" variant="solid">
                    1
                  </Badge>
                )}
              </MotionButton>

              {/* Gender Filter Toggle */}
              <MotionButton
                size="sm"
                variant={showGenders ? "solid" : "outline"}
                colorScheme={showGenders ? "pink" : "gray"}
                leftIcon={<Icon as={BsGenderMale} />}
                onClick={() => setShowGenders(!showGenders)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                boxShadow={showGenders ? "md" : "sm"}
              >
                Giới tính
                {genderFilter && (
                  <Badge ml={2} colorScheme="pink" variant="solid">
                    1
                  </Badge>
                )}
              </MotionButton>

              {/* Clear All Filters */}
              <AnimatePresence>
                {activeFiltersCount > 0 && (
                  <MotionButton
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    leftIcon={<Icon as={FiX} />}
                    onClick={() => {
                      onRoleFilterChange("");
                      onGenderFilterChange("");
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Xóa bộ lọc ({activeFiltersCount})
                  </MotionButton>
                )}
              </AnimatePresence>
            </Flex>

            {/* Role Pills */}
            <AnimatePresence>
              {showRoles && (
                <MotionBox
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  mb={3}
                >
                  <Box
                    p={4}
                    bg="purple.50"
                    borderRadius="xl"
                    border="1px"
                    borderColor="purple.100"
                  >
                    <Text fontSize="xs" fontWeight="600" color="purple.700" mb={2}>
                      CHỌN VAI TRÒ
                    </Text>
                    <Wrap spacing={2}>
                      {roles.map((role, index) => (
                        <WrapItem key={role.value}>
                          <MotionButton
                            size="sm"
                            variant={roleFilter === role.value ? "solid" : "outline"}
                            colorScheme={role.color}
                            onClick={() =>
                              onRoleFilterChange(
                                roleFilter === role.value ? "" : role.value
                              )
                            }
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            borderRadius="full"
                            fontWeight="600"
                            boxShadow={roleFilter === role.value ? "md" : "sm"}
                          >
                            {role.label}
                          </MotionButton>
                        </WrapItem>
                      ))}
                    </Wrap>
            </Box>
                </MotionBox>
              )}
            </AnimatePresence>

            {/* Gender Pills */}
            <AnimatePresence>
              {showGenders && (
                <MotionBox
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    p={4}
                    bg="pink.50"
                    borderRadius="xl"
                    border="1px"
                    borderColor="pink.100"
                  >
                    <Text fontSize="xs" fontWeight="600" color="pink.700" mb={2}>
                      CHỌN GIỚI TÍNH
                    </Text>
                    <Wrap spacing={3}>
                      {genders.map((gender, index) => (
                        <WrapItem key={gender.value}>
                          <MotionButton
                            size="md"
                            variant={genderFilter === gender.value ? "solid" : "outline"}
                            colorScheme={gender.color}
                            leftIcon={<Icon as={gender.icon} />}
                            onClick={() =>
                              onGenderFilterChange(
                                genderFilter === gender.value ? "" : gender.value
                              )
                            }
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            borderRadius="full"
                            fontWeight="600"
                            boxShadow={genderFilter === gender.value ? "md" : "sm"}
                            px={6}
                          >
                            {gender.label}
                          </MotionButton>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>
            </Box>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default SearchFilterChakra;

