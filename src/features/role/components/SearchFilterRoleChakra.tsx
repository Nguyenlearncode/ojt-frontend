import React, { useState } from "react";
import {
  Box,
  Input,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const MotionBox = motion(Box);

interface SearchFilterRoleChakraProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchFilterRoleChakra: React.FC<SearchFilterRoleChakraProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
        <Flex gap={3} align="center" flexWrap="wrap">
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
              skewX: [0, 5, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.45, ease: "linear" }}
            minW="50px"
          >
            <MotionBox
              mr={isSearchFocused || searchTerm ? 2 : 0}
              animate={{
                rotate: searchTerm ? 360 : 0,
                scale: isSearchFocused ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon as={FiSearch} color="#5cbdbb" boxSize={5} />
            </MotionBox>
            <Input
              placeholder="Tìm kiếm role..."
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
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default SearchFilterRoleChakra;

