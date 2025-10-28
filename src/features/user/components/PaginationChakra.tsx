import React from "react";
import { Box, Button, HStack, Text, Flex, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MotionBox = motion(Box);

interface PaginationChakraProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationChakra: React.FC<PaginationChakraProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ boxShadow: "xl" }}
    >
      <Box bg="white" p={4} borderRadius="xl" boxShadow="md">
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          {/* Info */}
          <Text color="gray.600" fontSize="sm">
            Hiển thị <strong>{startItem}</strong> đến <strong>{endItem}</strong> trong tổng số{" "}
            <strong>{totalItems}</strong> bản ghi
          </Text>

          {/* Pagination Controls */}
          <HStack spacing={2}>
            <Box
              as={motion.div}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                aria-label="Previous page"
                icon={<FiChevronLeft />}
                onClick={() => onPageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                variant="ghost"
                colorScheme="brand"
              />
            </Box>

            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <Box
                    as={motion.div}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Text px={2} color="gray.400">
                      ...
                    </Text>
                  </Box>
                ) : (
                  <Box
                    as={motion.div}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    animate={
                      currentPage === page
                        ? {
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <Button
                      size="sm"
                      onClick={() => onPageChange(page as number)}
                      variant={currentPage === page ? "solid" : "ghost"}
                      colorScheme={currentPage === page ? "brand" : "gray"}
                      transition="all 0.2s"
                    >
                      {page}
                    </Button>
                  </Box>
                )}
              </React.Fragment>
            ))}

            <Box
              as={motion.div}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                aria-label="Next page"
                icon={<FiChevronRight />}
                onClick={() => onPageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                variant="ghost"
                colorScheme="brand"
              />
            </Box>
          </HStack>
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default PaginationChakra;

