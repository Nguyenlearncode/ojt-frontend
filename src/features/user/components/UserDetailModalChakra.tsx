import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Box,
  Icon,
  Flex,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiCreditCard,
  FiX,
} from "react-icons/fi";
import type { User } from "../api/userApi";
import DeleteUserButton from "./Button/DeleteUserButton";
import { formatGender } from "../../../utils/formatGender";

const MotionBox = motion(Box);

interface UserDetailModalChakraProps {
  user: User;
  onClose: () => void;
}

const UserDetailModalChakra: React.FC<UserDetailModalChakraProps> = ({
  user,
  onClose,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />

      <ModalContent 
        bg="white" 
        boxShadow="0 1px 20px 0 rgba(69,90,100,0.08)" 
        borderRadius="5px" 
        maxW="750px" 
        minH="400px"
      >
        <MotionBox
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          {/* Close Button */}
          <IconButton
            aria-label="Close"
            icon={<FiX />}
            position="absolute"
            top={4}
            right={4}
            zIndex={10}
            onClick={onClose}
            borderRadius="full"
            size="sm"
            colorScheme="whiteAlpha"
            bg="whiteAlpha.700"
            _hover={{ bg: "whiteAlpha.900" }}
          />

          <Grid templateColumns={{ base: "1fr", md: "280px 1fr" }} overflow="hidden" minH="400px">
            {/* Left Side - Gradient Background with Avatar */}
            <GridItem
              bgGradient="linear(to-r, #ee5a6f, #f29263)"
              borderRadius="5px 0 0 5px"
              p={6}
              color="white"
            >
              <VStack spacing={6} align="center" justify="center" h="full">
                <Avatar
                  name={user.fullName}
                  size="2xl"
                  border="3px solid white"
                  boxShadow="xl"
                />
                <VStack spacing={2} textAlign="center">
                  <Text fontSize="xl" fontWeight="bold" textShadow="0 2px 4px rgba(0,0,0,0.2)">
                    {user.fullName}
                  </Text>
                  <Badge
                    colorScheme="whiteAlpha"
                    bg="whiteAlpha.300"
                    color="white"
                    fontSize="sm"
                    px={4}
                    py={1}
                    borderRadius="full"
                    textTransform="uppercase"
                    fontWeight="600"
                  >
                    {user.role?.roleName || "N/A"}
                  </Badge>
                  <Text fontSize="xs" fontStyle="italic" opacity={0.8} mt={2}>
                    User ID: {user.userId}
                  </Text>
                </VStack>

                {/* Delete Button */}
                <Box mt="auto" w="full">
                  <DeleteUserButton userId={user.userId} fullName={user.fullName} />
                </Box>
              </VStack>
            </GridItem>

            {/* Right Side - User Information */}
            <GridItem p={6} bg="white">
              <VStack spacing={4} align="stretch" h="full">
                <Text fontSize="lg" fontWeight="600" color="gray.800" mb={2}>
                  Thông tin cá nhân
                </Text>

                {/* Email */}
                <Box pb={2} borderBottom="1px solid" borderColor="gray.200">
                  <HStack spacing={2} mb={1}>
                    <Icon as={FiMail} color="gray.500" boxSize={4} />
                    <Text fontSize="sm" fontWeight="600" color="gray.600">
                      Email
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.800" ml={6}>
                    {user.email}
                  </Text>
                </Box>

                {/* Phone */}
                <Box pb={2} borderBottom="1px solid" borderColor="gray.200">
                  <HStack spacing={2} mb={1}>
                    <Icon as={FiPhone} color="gray.500" boxSize={4} />
                    <Text fontSize="sm" fontWeight="600" color="gray.600">
                      Số điện thoại
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.800" ml={6}>
                    {user.phoneNumber || "N/A"}
                  </Text>
                </Box>

                {/* Date of Birth */}
                <Box pb={2} borderBottom="1px solid" borderColor="gray.200">
                  <HStack spacing={2} mb={1}>
                    <Icon as={FiCalendar} color="gray.500" boxSize={4} />
                    <Text fontSize="sm" fontWeight="600" color="gray.600">
                      Ngày sinh
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.800" ml={6}>
                    {user.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </Text>
                </Box>

                {/* Gender & Age */}
                <Flex gap={4} pb={2} borderBottom="1px solid" borderColor="gray.200">
                  <Box flex={1}>
                    <HStack spacing={2} mb={1}>
                      <Icon as={FiUser} color="gray.500" boxSize={4} />
                      <Text fontSize="sm" fontWeight="600" color="gray.600">
                        Giới tính
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.800" ml={6}>
                      {formatGender(user.gender)}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <HStack spacing={2} mb={1}>
                      <Icon as={FiUser} color="gray.500" boxSize={4} />
                      <Text fontSize="sm" fontWeight="600" color="gray.600">
                        Tuổi
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.800" ml={6}>
                      {user.age || "N/A"}
                    </Text>
                  </Box>
                </Flex>

                {/* ID Number */}
                <Box pb={2} borderBottom="1px solid" borderColor="gray.200">
                  <HStack spacing={2} mb={1}>
                    <Icon as={FiCreditCard} color="gray.500" boxSize={4} />
                    <Text fontSize="sm" fontWeight="600" color="gray.600">
                      CMND/CCCD
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.800" ml={6}>
                    {user.identifyNumber || "N/A"}
                  </Text>
                </Box>

                {/* Address */}
                <Box pb={2}>
                  <HStack spacing={2} mb={1}>
                    <Icon as={FiMapPin} color="gray.500" boxSize={4} />
                    <Text fontSize="sm" fontWeight="600" color="gray.600">
                      Địa chỉ
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.800" ml={6} lineHeight="1.6">
                    {user.address || "N/A"}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </MotionBox>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailModalChakra;
