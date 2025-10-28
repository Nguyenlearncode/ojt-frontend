import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
  Image,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useLogin } from "../hooks/useLogin";
import CityParticlesBackground from "../components/backgrounds/CityParticlesBackground";
import logo from "../../../assets/react.svg";

const MotionBox = motion(Box);

const LoginPageChakra: React.FC = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = React.useState(false);

  const bgGradient = useColorModeValue(
    "linear(to-br, brand.500, primary.600)",
    "linear(to-br, brand.600, primary.700)"
  );

  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");
  const cardShadow = useColorModeValue("2xl", "dark-lg");

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Background với particles */}
      <CityParticlesBackground imageSrc="/backgrounds/lab.jpg" />

      {/* Content */}
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
          bg={cardBg}
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          boxShadow={cardShadow}
          p={8}
          border="1px solid"
          borderColor="whiteAlpha.300"
        >
          {/* Logo & Header */}
          <VStack spacing={6} mb={8}>
            <Flex align="center" gap={3}>
              <Image src={logo} alt="Lab Logo" boxSize="50px" />
              <Heading
                size="lg"
                bgGradient={bgGradient}
                bgClip="text"
                fontWeight="bold"
              >
                Laboratory Management
              </Heading>
            </Flex>
            <Text fontSize="md" color="gray.600" fontWeight="medium">
              LOGIN
            </Text>
          </VStack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              {/* Email Field */}
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">
                  Email Address
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiMail} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    size="lg"
                    focusBorderColor="brand.500"
                    bg="white"
                  />
                </InputGroup>
              </FormControl>

              {/* Password Field */}
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">
                  Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    size="lg"
                    focusBorderColor="brand.500"
                    bg="white"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                    >
                      <Icon as={showPassword ? FiEyeOff : FiEye} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Error Message */}
              {error && (
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              {/* Forgot Password Link */}
              <Flex w="full" justify="flex-end">
                <Button variant="link" colorScheme="brand" size="sm">
                  Forgot password?
                </Button>
              </Flex>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                w="full"
                variant="gradient"
                isLoading={loading}
                loadingText="Logging in..."
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
                transition="all 0.2s"
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

