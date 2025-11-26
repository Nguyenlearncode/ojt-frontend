import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Flex,
  useColorModeValue,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useDisclosure,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  TableContainer,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiFileText, FiPlus, FiSearch, FiActivity } from "react-icons/fi";
import { useTestOrders, type TestOrderListDto } from "../hooks/useTestOrders";
import TestOrderDetailModal from "../components/TestOrderDetailModal";
import CreateTestOrderModal from "../components/CreateTestOrderModal";
import { formatDateTime } from "../../../utils/formatDate";

const MotionBox = motion(Box);

const TestOrdersPage: React.FC = () => {
  const { getAllTestOrders, loading } = useTestOrders();
  const [testOrders, setTestOrders] = useState<TestOrderListDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const [selectedTestOrderId, setSelectedTestOrderId] = useState<string>("");
  const pageBg = useColorModeValue("transparent", "transparent");
  const cardBg = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(26, 32, 44, 0.92)");
  const tableHeaderBg = useColorModeValue("linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)", "gray.700");
  const tableHeaderText = useColorModeValue("gray.700", "whiteAlpha.900");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTestOrders();
  }, []);

  const loadTestOrders = async () => {
    setIsLoading(true);
    try {
      const result = await getAllTestOrders();
      const orders = result.items || [];
      setTestOrders(orders);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (testOrderId: string) => {
    setSelectedTestOrderId(testOrderId);
    onDetailOpen();
  };

  const handleDetailClose = () => {
    onDetailClose();
    setSelectedTestOrderId("");
    loadTestOrders(); // Refresh list after closing detail
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "complete":
      case "completed":
        return "green";
      case "pending":
        return "yellow";
      case "reviewed":
      case "review":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case "complete":
      case "completed":
        return "Hoàn thành";
      case "pending":
        return "Đang chờ";
      default:
        return status;
    }
  };

  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return testOrders;
    const lower = searchTerm.trim().toLowerCase();
    return testOrders.filter(
      (order) =>
        order.patientName?.toLowerCase().includes(lower) ||
        order.testOrderId?.toLowerCase().includes(lower) ||
        order.phoneNumber?.toLowerCase().includes(lower)
    );
  }, [testOrders, searchTerm]);

  const totalOrders = testOrders.length;
  const completedOrders = testOrders.filter((o) => {
    const status = o.status?.toLowerCase();
    return status === "complete" || status === "completed" || status === "hoàn thành";
  }).length;
  const pendingOrders = testOrders.filter((o) => {
    const status = o.status?.toLowerCase();
    return status === "pending" || status === "đang chờ";
  }).length;
  

  return (
    <Box minH="100vh" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }} bg={pageBg}>
      <Container maxW="container.xl">
        {/* Header */}
        <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} mb={8}>
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            px={{ base: 6, md: 10 }}
            py={{ base: 6, md: 8 }}
            border="1px solid"
            borderColor={borderColor}
          >
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} flexWrap="wrap" gap={6}>
              <VStack align="flex-start" spacing={3}>
                <HStack spacing={4}>
                  <Box bg="purple.500" p={4} borderRadius="xl" color="white" boxShadow="md">
                    <FiFileText size={28} />
                  </Box>
                  <Box>
                    <Heading
                      size="xl"
                      bgGradient="linear(to-r, purple.500, pink.400, orange.300)"
                      bgClip="text"
                      fontWeight="extrabold"
                    >
                      Danh sách đơn xét nghiệm
                    </Heading>
                    <Text color="gray.600">
                      Quản lý và theo dõi tất cả đơn xét nghiệm trong hệ thống
                    </Text>
                  </Box>
                </HStack>
              </VStack>
              <MotionBox whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button leftIcon={<FiPlus />} variant="gradient" size="lg" onClick={onCreateOpen}>
                  Tạo đơn mới
                </Button>
              </MotionBox>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4} mt={6}>
              <Stat
                p={4}
                borderRadius="xl"
                bg="linear-gradient(135deg, rgba(129, 230, 217, 0.35), rgba(79, 209, 197, 0.2))"
              >
                <StatLabel color="gray.600">Tổng đơn</StatLabel>
                <StatNumber>{totalOrders}</StatNumber>
                <StatHelpText color="gray.600">Đang quản lý</StatHelpText>
              </Stat>
              <Stat
                p={4}
                borderRadius="xl"
                bg="linear-gradient(135deg, rgba(129, 178, 255, 0.35), rgba(79, 120, 255, 0.2))"
              >
                <StatLabel color="gray.600">Hoàn thành</StatLabel>
                <StatNumber>{completedOrders}</StatNumber>
                <StatHelpText color="gray.600">Đã có kết quả</StatHelpText>
              </Stat>
              <Stat
                p={4}
                borderRadius="xl"
                bg="linear-gradient(135deg, rgba(254, 178, 217, 0.35), rgba(255, 121, 198, 0.2))"
              >
                <StatLabel color="gray.600">Chưa có kết quả</StatLabel>
                <StatNumber>{pendingOrders}</StatNumber>
                <StatHelpText color="gray.600">Chờ xử lý</StatHelpText>
              </Stat>
            </SimpleGrid>
          </Box>
        </MotionBox>

        <Flex
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          mb={5}
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <InputGroup maxW={{ base: "100%", md: "350px" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Tìm theo mã, tên hoặc số điện thoại"
              bg="white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="full"
            />
          </InputGroup>
          <HStack spacing={3}>
            <HStack spacing={2} px={4} py={2} borderRadius="full" bg="whiteAlpha.700" boxShadow="md">
              <Icon as={FiActivity} color="purple.500" />
              <Text fontWeight="semibold">{filteredOrders.length} đơn phù hợp</Text>
            </HStack>
          </HStack>
        </Flex>

        {/* Table */}
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="xl"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
            backdropFilter="blur(12px)"
          >
            <Box
              bg={tableHeaderBg}
              px={{ base: 5, md: 8 }}
              py={4}
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Heading size="md" color={tableHeaderText}>
                Danh sách đơn xét nghiệm
              </Heading>
            </Box>
            {isLoading || loading ? (
              <VStack spacing={4} py={10}>
                <Spinner size="xl" color="purple.500" />
                <Text>Đang tải danh sách đơn xét nghiệm...</Text>
              </VStack>
            ) : filteredOrders.length === 0 ? (
              <VStack spacing={4} py={10}>
                <Text fontSize="lg" color="gray.500">
                  Không tìm thấy đơn xét nghiệm phù hợp.
                </Text>
              </VStack>
            ) : (
              <TableContainer>
                <Table variant="simple" size="md">
                  <Thead>
                    <Tr>
                      <Th>Mã đơn</Th>
                      <Th>Bệnh nhân</Th>
                      <Th>Tuổi/Giới tính</Th>
                      <Th>Số điện thoại</Th>
                      <Th>Trạng thái</Th>
                      <Th>Ngày tạo</Th>
                      <Th>Người tạo</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredOrders.map((order) => (
                      <Tr 
                        key={order.testOrderId} 
                        _hover={{ bg: hoverBg, cursor: "pointer" }}
                        onClick={() => handleViewDetail(order.testOrderId)}
                        transition="all 0.2s"
                      >
                        <Td>
                          <VStack align="flex-start" spacing={0}>
                            <Text fontSize="xs" color="gray.500">
                              {order.testOrderId}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Text fontWeight="semibold">{order.patientName || "N/A"}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {order.age ?? "N/A"} tuổi • {order.gender === "male" ? "Nam" : "Nữ"}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{order.phoneNumber || "N/A"}</Text>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={getStatusColor(order.status)}
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {getStatusLabel(order.status)}
                          </Badge>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {order.createdAt ? formatDateTime(order.createdAt) : "N/A"}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{order.createdBy || "N/A"}</Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </MotionBox>

        {/* Modal chi tiết đơn xét nghiệm */}
        <TestOrderDetailModal
          isOpen={isDetailOpen}
          onClose={handleDetailClose}
          testOrderId={selectedTestOrderId}
          onSuccess={async () => {
            await loadTestOrders();
          }}
        />

        {/* Modal tạo đơn xét nghiệm cho bệnh nhân mới */}
        <CreateTestOrderModal
          isOpen={isCreateOpen}
          onClose={onCreateClose}
          onSuccess={async () => {
            await loadTestOrders();
          }}
        />
      </Container>
    </Box>
  );
};

export default TestOrdersPage;

