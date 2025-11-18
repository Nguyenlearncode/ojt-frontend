import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiActivity, FiSave, FiX } from "react-icons/fi";
import { useTestOrderResults } from "../hooks/useTestOrderResults";
import { flaggingSetApi } from "../api/flaggingSetApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testOrderId: string;
  patientId: string;
  onSuccess?: () => void;
}

interface FlaggingSetConfig {
  configId: number;
  testName: string;
  lowValue?: number;
  highValue?: number;
  criticalLow?: number;
  criticalHigh?: number;
}

const MotionBox = motion(Box);

const CreateTestResultModal: React.FC<Props> = ({
  isOpen,
  onClose,
  testOrderId,
  patientId,
  onSuccess,
}) => {
  const { createTestResult, loading } = useTestOrderResults();
  const [flaggingSets, setFlaggingSets] = useState<FlaggingSetConfig[]>([]);
  const [loadingFlaggingSets, setLoadingFlaggingSets] = useState(false);
  const [selectedFlaggingSetId, setSelectedFlaggingSetId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadFlaggingSets();
    }
  }, [isOpen]);

  const loadFlaggingSets = async () => {
    setLoadingFlaggingSets(true);
    try {
      const res = await flaggingSetApi.getAllFlaggingConfigs();
      const data = res?.data || res;
      setFlaggingSets(Array.isArray(data) ? data : []);
    } catch (err) {
      setFlaggingSets([]);
    } finally {
      setLoadingFlaggingSets(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedFlaggingSetId === null) {
      return;
    }

    try {
      await createTestResult({
        flaggingSetId: selectedFlaggingSetId,
        patientId,
        testOrderId,
      });
      onSuccess?.();
      onClose();
      // Reset form
      setSelectedFlaggingSetId(null);
    } catch (err) {
      // Error đã được xử lý trong hook
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" boxShadow="2xl">
        <ModalHeader
          bgGradient="linear(to-r, green.400, teal.500)"
          color="white"
          py={6}
          px={8}
        >
          <HStack spacing={3}>
            <Box
              bg="whiteAlpha.200"
              p={2}
              borderRadius="lg"
              backdropFilter="blur(10px)"
            >
              <Icon as={FiActivity} boxSize={6} />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="xl" fontWeight="bold" color="white">
                Nhập kết quả xét nghiệm
              </Text>
              <Text fontSize="sm" color="whiteAlpha.900" fontWeight="normal">
                Chọn cấu hình flagging set để tạo kết quả
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" size="lg" _hover={{ bg: "whiteAlpha.200" }} />
        <ModalBody p={8} bg="gray.50">
          {loadingFlaggingSets ? (
            <VStack spacing={4} py={8}>
              <Spinner size="xl" color="green.500" />
              <Text>Đang tải danh sách cấu hình...</Text>
            </VStack>
          ) : (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <VStack spacing={6} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontWeight="600" color="gray.700">
                    Chọn cấu hình Flagging Set
                  </FormLabel>
                  <Select
                    placeholder="Chọn cấu hình flagging set"
                    value={selectedFlaggingSetId ?? ""}
                    onChange={(e) =>
                      setSelectedFlaggingSetId(
                        e.target.value ? parseInt(e.target.value, 10) : null
                      )
                    }
                    size="lg"
                    bg="white"
                    focusBorderColor="green.400"
                  >
                    {flaggingSets.map((config) => (
                      <option key={config.configId} value={config.configId}>
                        {config.testName} (ID: {config.configId})
                      </option>
                    ))}
                  </Select>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Flagging set sẽ được sử dụng để đánh dấu các giá trị bất thường trong kết
                    quả xét nghiệm
                  </Text>
                </FormControl>

                {flaggingSets.length === 0 && !loadingFlaggingSets && (
                  <Box
                    p={4}
                    bg="yellow.50"
                    borderRadius="md"
                    border="1px"
                    borderColor="yellow.200"
                  >
                    <Text color="yellow.800" fontSize="sm">
                      Chưa có cấu hình flagging set nào. Vui lòng tạo cấu hình trước.
                    </Text>
                  </Box>
                )}
              </VStack>
            </MotionBox>
          )}
        </ModalBody>
        <ModalFooter bg="gray.50" borderTop="1px" borderColor="gray.200">
          <HStack spacing={4}>
            <Button
              leftIcon={<FiX />}
              variant="outline"
              colorScheme="gray"
              size="lg"
              onClick={onClose}
              isDisabled={loading || loadingFlaggingSets}
            >
              Hủy
            </Button>
            <Button
              leftIcon={<FiSave />}
              bgGradient="linear(to-r, green.400, teal.500)"
              color="white"
              size="lg"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Đang tạo..."
              isDisabled={!selectedFlaggingSetId || loadingFlaggingSets}
              _hover={{
                bgGradient: "linear(to-r, green.500, teal.600)",
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.2s"
            >
              Tạo kết quả
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTestResultModal;

