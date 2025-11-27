import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import CityParticlesBackground from "../components/backgrounds/CityParticlesBackground";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import LogoAnimation from "../components/LogoAnimation";

const MotionBox = motion(Box);

const LoginPageChakra: React.FC = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const bgGradient = useColorModeValue(
    "linear(to-br, brand.500, primary.600)",
    "linear(to-br, brand.600, primary.700)"
  );
  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");
  const cardShadow = useColorModeValue("2xl", "dark-lg");

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      <CityParticlesBackground imageSrc="/backgrounds/laboratory.jpg" />

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
          {/* 🔙 Nút Back */}
          <Flex w="full" justify="flex-start" mb={4}>
            <Button
              as={Link}
              to="/"
              variant="ghost"
              colorScheme="gray"
              leftIcon={<span>←</span>}
              size="sm"
            >
              Back to Home
            </Button>
          </Flex>

          {/* Header */}
          <VStack spacing={6} mb={8}>
            <Flex align="center" gap={3}>
              <LogoAnimation />
              <Heading
                size="xl"
                bgGradient={bgGradient}
                bgClip="text"
                fontWeight="bold"
              >
                Laboratory Management
              </Heading>
            </Flex>
            <Text
              fontSize="27px"
              bgGradient={bgGradient}
              bgClip="text"
              fontWeight="bold"
              textTransform="uppercase"
            >
              LOGIN
            </Text>

          </VStack>


          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <EmailField
                value={formData.email}
                onChange={handleChange}
              />
              <PasswordField
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              {error && (
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Flex w="full" justify="flex-end">
                <Button
                  as={Link}
                  to="/forgot-password"
                  variant="link"
                  colorScheme="brand"
                  size="sm"
                >
                  Forgot password?
                </Button>
              </Flex>

              <Button
                type="submit"
                size="lg"
                w="full"
                variant="gradient"
                isLoading={loading}
                loadingText="Logging in..."
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
              >
                Login
              </Button>
            </VStack>
          </form>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default LoginPageChakra;
