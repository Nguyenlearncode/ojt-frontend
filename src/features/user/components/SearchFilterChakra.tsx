import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Icon,
  VStack,
  Text,
  Button,
  Wrap,
  WrapItem,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { FiSearch, FiUsers, FiX } from "react-icons/fi";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { roleApi } from "../../role/api/roleApi";

interface SearchFilterChakraProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  genderFilter: string;
  onGenderFilterChange: (value: string) => void;
}

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

  const [roles, setRoles] = useState<
    { value: string; label: string; color: string }[]
  >([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await roleApi.getAllRoles();
        setRoles(
          data.map((role, index) => ({
            value: role.roleCode,
            label: role.roleName,
            color: ["purple", "blue", "green", "orange", "pink", "teal", "red"][index % 7],
          }))
        );
      } catch (error) {}
    };

    fetchRoles();
  }, []);

  const activeFiltersCount = [roleFilter, genderFilter].filter(Boolean).length;

  return (
    <Box mb={6}>
      <Box
        bg="white"
        p={6}
        borderRadius="2xl"
        boxShadow="md"
        border="1px"
        borderColor="gray.100"
      >
        <VStack spacing={5} align="stretch">
          <Box>
            <Flex gap={3} mb={3} align="center" flexWrap="wrap">
              
              {/* SIMPLE SEARCH BOX */}
              <Flex
                bg="gray.100"
                h="40px"
                borderRadius="30px"
                px={4}
                align="center"
              >
                <Icon as={FiSearch} color="teal.400" boxSize={5} mr={2} />
                <Input
                  placeholder="Tìm kiếm theo tên/email/sđt"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  bg="transparent"
                  border="none"
                  outline="none"
                  w="300px"
                  _focus={{ boxShadow: "none" }}
                />
              </Flex>

              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Lọc theo:
              </Text>

              {/* Role Filter */}
              <Button
                size="sm"
                variant={showRoles ? "solid" : "outline"}
                colorScheme="purple"
                leftIcon={<FiUsers />}
                onClick={() => setShowRoles(!showRoles)}
              >
                Vai trò
                {roleFilter && (
                  <Badge ml={2} colorScheme="purple">
                    1
                  </Badge>
                )}
              </Button>

              {/* Gender Filter */}
              <Button
                size="sm"
                variant={showGenders ? "solid" : "outline"}
                colorScheme="pink"
                leftIcon={<BsGenderMale />}
                onClick={() => setShowGenders(!showGenders)}
              >
                Giới tính
                {genderFilter && (
                  <Badge ml={2} colorScheme="pink">
                    1
                  </Badge>
                )}
              </Button>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  leftIcon={<FiX />}
                  onClick={() => {
                    onRoleFilterChange("");
                    onGenderFilterChange("");
                  }}
                >
                  Xóa bộ lọc ({activeFiltersCount})
                </Button>
              )}
            </Flex>

            {/* ROLE OPTIONS */}
            {showRoles && (
              <Box p={4} bg="purple.50" borderRadius="xl" border="1px" borderColor="purple.100" mb={3}>
                <Text fontSize="xs" mb={2} fontWeight="600" color="purple.700">
                  CHỌN VAI TRÒ
                </Text>

                <Wrap spacing={2}>
                  {roles.map((role) => (
                    <WrapItem key={role.value}>
                      <Button
                        size="sm"
                        variant={roleFilter === role.value ? "solid" : "outline"}
                        colorScheme={role.color}
                        onClick={() =>
                          onRoleFilterChange(roleFilter === role.value ? "" : role.value)
                        }
                        borderRadius="full"
                      >
                        {role.label}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            )}

            {/* GENDER OPTIONS */}
            {showGenders && (
              <Box p={4} bg="pink.50" borderRadius="xl" border="1px" borderColor="pink.100">
                <Text fontSize="xs" mb={2} fontWeight="600" color="pink.700">
                  CHỌN GIỚI TÍNH
                </Text>

                <Wrap spacing={3}>
                  {genders.map((gender) => (
                    <WrapItem key={gender.value}>
                      <Button
                        size="md"
                        variant={genderFilter === gender.value ? "solid" : "outline"}
                        colorScheme={gender.color}
                        leftIcon={<gender.icon />}
                        onClick={() =>
                          onGenderFilterChange(genderFilter === gender.value ? "" : gender.value)
                        }
                        borderRadius="full"
                        px={6}
                      >
                        {gender.label}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default SearchFilterChakra;
