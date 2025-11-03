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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useForgotPassword } from "../hooks/useForgotPassword";
import CityParticlesBackground from "../components/backgrounds/CityParticlesBackground";
import EmailField from "../components/EmailField";
import LogoAnimation from "../components/LogoAnimation";

const MotionBox = motion(Box);

const ForgotPasswordPageChakra: React.FC = () => {
  const { email, loading, error, handleChange, handleSubmit } = useForgotPassword();

  const bgGradient = useColorModeValue(
    "linear(to-br, brand.500, primary.600)",
    "linear(to-br, brand.600, primary.700)"
  );
  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");
  const cardShadow = useColorModeValue("2xl", "dark-lg");

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
                Forgot Password?
              </Heading>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Enter your email address and we'll send you a link to reset your password.
              </Text>
            </VStack>
          </VStack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <EmailField
                value={email}
                onChange={handleChange}
              />

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
                loadingText="Sending..."
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
              >
                Send Reset Link
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

export default ForgotPasswordPageChakra;

