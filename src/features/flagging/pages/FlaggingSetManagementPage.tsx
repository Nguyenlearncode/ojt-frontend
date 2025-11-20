import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useDisclosure,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiFlag, FiPlus } from "react-icons/fi";
import FlaggingSetTable from "../components/FlaggingSetTable";
import FlaggingSetFormModal from "../components/FlaggingSetFormModal";
import {
  type FlaggingSetConfig,
  useFlaggingSets,
} from "../hooks/useFlaggingSets";

const MotionBox = motion(Box);

const FlaggingSetManagementPage: React.FC = () => {
  const { configs, loading, saving, createConfig, updateConfig } =
    useFlaggingSets();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [editingConfig, setEditingConfig] =
    useState<FlaggingSetConfig | null>(null);

  const modalTitle = useMemo(
    () => (editingConfig ? "Cập nhật cấu hình" : "Thêm cấu hình mới"),
    [editingConfig]
  );

  const handleCreateClick = () => {
    setEditingConfig(null);
    onModalOpen();
  };

  const handleEditClick = (config: FlaggingSetConfig) => {
    setEditingConfig(config);
    onModalOpen();
  };

  const handleSubmit = async (payload: {
    testName: string;
    lowThreshold?: number | null;
    highThreshold?: number | null;
    criticalThreshold?: number | null;
    version?: string;
  }) => {
    if (editingConfig) {
      await updateConfig(editingConfig.configId, payload);
    } else {
      await createConfig(payload);
    }
    onModalClose();
  };

  const accentBg = useColorModeValue("purple.500", "purple.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const subText = useColorModeValue("gray.600", "gray.300");

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Flex
              align="center"
              justify="space-between"
              flexWrap="wrap"
              gap={4}
              px={6}
              py={6}
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="xl"
              border="1px solid"
              borderColor={useColorModeValue("gray.100", "whiteAlpha.200")}
            >
              <Flex align="center" gap={4}>
                <Box
                  bg={accentBg}
                  color="white"
                  p={3}
                  borderRadius="xl"
                  boxShadow="md"
                >
                  <Icon as={FiFlag} boxSize={6} />
                </Box>
                <Box>
                  <Heading
                    size="lg"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    bgClip="text"
                  >
                    Quản lý Flagging Set
                  </Heading>
                  <Text color={subText} mt={1}>
                    Thiết lập ngưỡng xét nghiệm để hệ thống tự động đánh dấu kết
                    quả bất thường.
                  </Text>
                </Box>
              </Flex>

              <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
                <Badge
                  colorScheme="purple"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  alignSelf="center"
                >
                  {configs.length} cấu hình đang áp dụng
                </Badge>
                <Button
                  leftIcon={<FiPlus />}
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  color="white"
                  size="lg"
                  px={8}
                  _hover={{
                    bgGradient: "linear(to-r, purple.600, pink.600)",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  onClick={handleCreateClick}
                >
                  Thêm cấu hình
                </Button>
              </Stack>
            </Flex>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="xl"
            border="1px solid"
            borderColor={useColorModeValue("gray.100", "whiteAlpha.200")}
            px={{ base: 4, md: 6 }}
            py={6}
          >
            <Heading size="md" mb={4} color="gray.700">
              Danh sách cấu hình
            </Heading>
            <Text color={subText} mb={6}>
              Điều chỉnh giá trị giới hạn để phù hợp với quy trình xét nghiệm
              thực tế tại phòng lab của bạn.
            </Text>
            <FlaggingSetTable
              configs={configs}
              loading={loading}
              onEdit={handleEditClick}
            />
          </MotionBox>
        </Stack>
      </Container>

      <FlaggingSetFormModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={modalTitle}
        onSubmit={handleSubmit}
        isSubmitting={saving}
        defaultValues={editingConfig ?? undefined}
      />
    </Box>
  );
};

export default FlaggingSetManagementPage;


