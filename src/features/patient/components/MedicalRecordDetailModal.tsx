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
  Divider,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Icon,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiFileText,
  FiActivity,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import {
  usePatientMedicalRecords,
  type ViewMedicalRecordDetailResponse,
} from "../hooks/usePatientMedicalRecords";
import { useTestOrders } from "../hooks/useTestOrders";
import { formatDate } from "../../../utils/formatDate";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  onTestOrderCreated?: () => void | Promise<void>;
  onViewTestOrder?: (testOrderId: string) => void;
  refreshKey?: number;
}

const MotionBox = motion(Box);

const MedicalRecordDetailModal: React.FC<Props> = ({
  isOpen,
  onClose,
  patientId,
  onTestOrderCreated,
  onViewTestOrder,
  refreshKey = 0,
}) => {
  const { getRecordDetail } = usePatientMedicalRecords();
  const { createTestOrderForPatient } = useTestOrders();
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [detail, setDetail] = useState<ViewMedicalRecordDetailResponse | null>(null);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    if (isOpen && patientId) {
      loadDetail();
    }
  }, [isOpen, patientId, refreshKey]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const data = await getRecordDetail(patientId);
      setDetail(data);
    } catch (err) {
      // Error đã được xử lý trong hook
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestOrder = async () => {
    setIsCreating(true);
    try {
      await createTestOrderForPatient(patientId);
      await loadDetail(); // Reload để hiển thị đơn mới
      await onTestOrderCreated?.();
    } catch (err) {
      // Error đã được xử lý trong hook
    } finally {
      setIsCreating(false);
    }
  };

  const handleViewTestOrder = (testOrderId: string) => {
    onViewTestOrder?.(testOrderId);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "hoàn thành":
        return "green";
      case "pending":
      case "đang chờ":
        return "yellow";
      case "cancelled":
      case "đã hủy":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" boxShadow="2xl" maxH="90vh" overflow="hidden">
        <ModalHeader
          bgGradient="linear(to-r, blue.400, cyan.500)"
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
              <Icon as={FiFileText} boxSize={6} />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="xl" fontWeight="bold" color="white">
                Chi tiết hồ sơ bệnh nhân
              </Text>
              <Text fontSize="sm" color="whiteAlpha.900" fontWeight="normal">
                Thông tin bệnh nhân và lịch sử xét nghiệm
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" size="lg" _hover={{ bg: "whiteAlpha.200" }} />
        <ModalBody p={8} bg="gray.50">
          {loading ? (
            <VStack spacing={4} py={8}>
              <Spinner size="xl" color="blue.500" />
              <Text>Đang tải thông tin...</Text>
            </VStack>
          ) : detail ? (
            <VStack spacing={6} align="stretch">
              {/* Thông tin bệnh nhân */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                bg={bgColor}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <HStack mb={4} spacing={3}>
                  <Box
                    p={2}
                    bgGradient="linear(to-r, blue.400, cyan.500)"
                    borderRadius="lg"
                  >
                    <Icon as={FiUser} boxSize={5} color="white" />
                  </Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    Thông tin bệnh nhân
                  </Text>
                </HStack>
                <Divider mb={4} />
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontWeight="600" color="gray.600">
                      Họ và tên:
                    </Text>
                    <Text color="gray.800">{detail.patientName}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="600" color="gray.600">
                      Ngày sinh:
                    </Text>
                    <Text color="gray.800">
                      {formatDate(detail.dateOfBirth, "dd/MM/yyyy")}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="600" color="gray.600">
                      Số điện thoại:
                    </Text>
                    <Text color="gray.800">{detail.phoneNumber}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="600" color="gray.600">
                      Mã bệnh nhân:
                    </Text>
                    <Text color="gray.800" fontFamily="mono" fontSize="sm">
                      {detail.patientId}
                    </Text>
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Lịch sử xét nghiệm */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                bg={bgColor}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <HStack mb={4} spacing={3}>
                  <Box
                    p={2}
                    bgGradient="linear(to-r, purple.400, pink.500)"
                    borderRadius="lg"
                  >
                    <Icon as={FiActivity} boxSize={5} color="white" />
                  </Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    Lịch sử xét nghiệm
                  </Text>
                </HStack>
                <Divider mb={4} />
                {detail.testOrders && detail.testOrders.length > 0 ? (
                  <Box overflowX="auto">
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr bg="gray.100">
                          <Th>Mã đơn xét nghiệm</Th>
                          <Th>Ngày đặt</Th>
                          <Th>Trạng thái</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {detail.testOrders.map((order) => (
                          <Tr
                            key={order.testOrderId}
                            _hover={{ bg: "gray.50", cursor: "pointer" }}
                            onClick={() => handleViewTestOrder(order.testOrderId)}
                          >
                            <Td>
                              <HStack spacing={2}>
                                <Icon as={FiEye} color="blue.500" />
                                <Text fontFamily="mono" fontSize="xs">
                                  {order.testOrderId.substring(0, 8)}...
                                </Text>
                              </HStack>
                            </Td>
                            <Td>
                              {formatDate(order.orderDate, "dd/MM/yyyy HH:mm")}
                            </Td>
                            <Td>
                              <Badge
                                colorScheme={getStatusColor(order.status)}
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                {order.status}
                              </Badge>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                ) : (
                  <Box
                    p={8}
                    textAlign="center"
                    bg="gray.50"
                    borderRadius="md"
                    border="2px dashed"
                    borderColor="gray.300"
                  >
                    <Icon as={FiCalendar} boxSize={8} color="gray.400" mb={2} />
                    <Text color="gray.500">Chưa có đơn xét nghiệm nào</Text>
                  </Box>
                )}
              </MotionBox>
            </VStack>
          ) : (
            <Box p={8} textAlign="center">
              <Text color="gray.500">Không thể tải thông tin chi tiết</Text>
            </Box>
          )}
        </ModalBody>
        <ModalFooter bg="gray.50" borderTop="1px" borderColor={borderColor}>
          <HStack spacing={4} justify="space-between" w="full">
            <Button
              leftIcon={<FiPlus />}
              colorScheme="purple"
              onClick={handleCreateTestOrder}
              isLoading={isCreating}
              loadingText="Đang tạo..."
            >
              Tạo đơn xét nghiệm
            </Button>
            <Button variant="outline" colorScheme="gray" onClick={onClose}>
              Đóng
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MedicalRecordDetailModal;

