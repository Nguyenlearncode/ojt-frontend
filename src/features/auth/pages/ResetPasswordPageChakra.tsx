import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  useColorModeValue,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useResetPassword } from "../hooks/useResetPassword";
import CityParticlesBackground from "../components/backgrounds/CityParticlesBackground";
import LogoAnimation from "../components/LogoAnimation";

const MotionBox = motion(Box);

const ResetPasswordPageChakra: React.FC = () => {
  const {
    token,
    password,
    confirmPassword,
    loading,
    error,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useResetPassword();

  const bgGradient = useColorModeValue(
    "linear(to-br, brand.500, primary.600)",
    "linear(to-br, brand.600, primary.700)"
  );
  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");
  const cardShadow = useColorModeValue("2xl", "dark-lg");

  if (!token) {
    return (
      <Box position="relative" minH="100vh" overflow="hidden">
        <CityParticlesBackground imageSrc="/backgrounds/lab.jpg" />
        <Container
          maxW="container.sm"
          centerContent
          position="relative"
          zIndex={10}
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            w="full"
            maxW="md"
            p={8}
            bg={cardBg}
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="2xl"
            boxShadow={cardShadow}
            backdropFilter="blur(10px)"
          >
            <VStack spacing={6}>
              <Alert status="error" borderRadius="lg">
                <AlertIcon />
                Invalid or missing reset token. Please check your email link.
              </Alert>
              <Button
                as={Link}
                to="/"
                variant="gradient"
                leftIcon={<FiArrowLeft />}
              >
                Back to Login
              </Button>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    );
  }

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      <CityParticlesBackground imageSrc="/backgrounds/lab.jpg" />

      <Container
        maxW="container.sm"
        centerContent
        position="relative"
        zIndex={10}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="full"
          maxW="md"
          p={8}
          bg={cardBg}
          border="1px solid"
          borderColor="whiteAlpha.300"
          borderRadius="2xl"
          boxShadow={cardShadow}
          backdropFilter="blur(10px)"
        >
          {/* Header */}
          <VStack spacing={6} mb={8}>
            <Flex align="center" gap={3}>
              <LogoAnimation />
              <Heading
                size="md"
                bgGradient={bgGradient}
                bgClip="text"
                fontWeight="bold"
              >
                Laboratory Management
              </Heading>
            </Flex>
            <VStack spacing={1}>
              <Heading size="lg" color="gray.800">
                Reset Password
              </Heading>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Enter your new password below.
              </Text>
            </VStack>
          </VStack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              {/* New Password */}
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">
                  New Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={handlePasswordChange}
                    size="lg"
                    bg="white"
                    focusBorderColor="brand.500"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon as={showPassword ? FiEyeOff : FiEye} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Confirm Password */}
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    size="lg"
                    bg="white"
                    focusBorderColor="brand.500"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Icon as={showConfirmPassword ? FiEyeOff : FiEye} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {error && (
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                w="full"
                variant="gradient"
                isLoading={loading}
                loadingText="Resetting..."
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
              >
                Reset Password
              </Button>

              <Button
                as={Link}
                to="/"
                variant="ghost"
                size="sm"
                leftIcon={<FiArrowLeft />}
                colorScheme="gray"
              >
                Back to Login
              </Button>
            </VStack>
          </form>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ResetPasswordPageChakra;

