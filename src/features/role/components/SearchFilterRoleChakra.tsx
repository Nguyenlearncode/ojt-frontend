import React from "react";
import {
  Box,
  Input,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

interface SearchFilterRoleChakraProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchFilterRoleChakra: React.FC<SearchFilterRoleChakraProps> = ({
  searchTerm,
  onSearchChange,
}) => {
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
        <Flex align="center" gap={3}>
          {/* Simple Search Box */}
          <Flex
            bg="gray.100"
            h="40px"
            borderRadius="30px"
            px={4}
            align="center"
          >
            <Icon as={FiSearch} color="teal.400" boxSize={5} mr={2} />

            <Input
              placeholder="Tìm kiếm role..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              bg="transparent"
              border="none"
              outline="none"
              w="300px"
              fontWeight="500"
              fontSize="15px"
              _focus={{ boxShadow: "none" }}
              _placeholder={{ color: "gray.400" }}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default SearchFilterRoleChakra;
