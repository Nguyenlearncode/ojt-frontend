import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  VStack,
  HStack,
  Text,
  Flex,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiPlus, FiFileText, FiUsers, FiActivity, FiSearch } from "react-icons/fi";
import {
  usePatientMedicalRecords,
  type CreateMedicalRecordRequest,
} from "../hooks/usePatientMedicalRecords";
import PatientMedicalRecordForm from "../components/PatientMedicalRecordForm";
import PatientMedicalRecordTable from "../components/PatientMedicalRecordTable";
import UpdateMedicalRecordModal from "../components/UpdateMedicalRecordModal";
import MedicalRecordDetailModal from "../components/MedicalRecordDetailModal";
import TestOrderDetailModal from "../components/TestOrderDetailModal";
import { getUserInfo } from "../../../utils/jwtHelper";

const MotionBox = motion(Box);

const PatientMedicalRecordPageChakra: React.FC = () => {
  const { records, loading, createRecord, deleteRecord, fetchRecords } =
    usePatientMedicalRecords();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isTestOrderDetailOpen,
    onOpen: onTestOrderDetailOpen,
    onClose: onTestOrderDetailClose,
  } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [selectedTestOrderId, setSelectedTestOrderId] = useState<string>("");
  const [detailRefreshKey, setDetailRefreshKey] = useState(0);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const user = useMemo(() => getUserInfo(), []);
  const pageBg = useColorModeValue("transparent", "transparent");
  const cardBg = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(26, 32, 44, 0.9)");
  const blurBorder = useColorModeValue("rgba(226, 232, 240, 0.7)", "rgba(45, 55, 72, 0.7)");
  const [searchTerm, setSearchTerm] = useState("");

  // Form state mặc định
  const [form, setForm] = useState<CreateMedicalRecordRequest>({
    patient: {
      fullName: "",
      dateOfBirth: "",
      gender: "Male",
      phoneNumber: "",
      userId: user?.sub || "",
      address: "",
      email: "",
      identifyNumber: "",
    },
    doctorId: user?.sub || "",
    createdBy: user?.sub || "",
    clinicalNotes: "",
    diagnosis: "",
  });

  // 🧠 Hàm xử lý khi tạo hồ sơ thành công
  const handleCreateRecord = async () => {
    setIsSubmitting(true);
    try {
      await createRecord(form);
      // Reset form sau khi tạo thành công
      setForm({
        patient: {
          fullName: "",
          dateOfBirth: "",
          gender: "Male",
          phoneNumber: "",
          userId: user?.sub || "",
          address: "",
          email: "",
          identifyNumber: "",
        },
        doctorId: user?.sub || "",
        createdBy: user?.sub || "",
        clinicalNotes: "",
        diagnosis: "",
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Handlers cho View Detail
  const handleViewDetail = (patientId: string) => {
    setSelectedPatientId(patientId);
    onDetailOpen();
  };

  // Handlers cho TestOrder
  const handleViewTestOrder = (testOrderId: string) => {
    setSelectedTestOrderId(testOrderId);
    onTestOrderDetailOpen();
  };

  const handleTestOrderSuccess = async () => {
    await fetchRecords();
    setDetailRefreshKey((prev) => prev + 1);
  };

  // Handlers cho Update
  const handleUpdate = (patientId: string) => {
    setSelectedPatientId(patientId);
    onUpdateOpen();
  };

  const handleUpdateSuccess = () => {
    fetchRecords();
  };

  // Handlers cho Delete
  const handleDeleteClick = (patientId: string) => {
    setSelectedPatientId(patientId);
    onDeleteOpen();
  };

  const handleConfirmDelete = async () => {
    if (!selectedPatientId) {
      onDeleteClose();
      return;
    }
    try {
      await deleteRecord(selectedPatientId);
      onDeleteClose();
      setSelectedPatientId("");
    } catch (err) {
      // Error đã được xử lý trong hook
    }
  };

  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) return records;
    const lower = searchTerm.trim().toLowerCase();
    return records.filter(
      (record) =>
        record.fullName?.toLowerCase().includes(lower) ||
        record.patientId?.toLowerCase().includes(lower) ||
        record.phoneNumber?.toLowerCase().includes(lower)
    );
  }, [records, searchTerm]);

  const totalRecords = records.length;
  const testedRecords = records.filter((r) => r.lastTestDate).length;
  const noTestRecords = Math.max(totalRecords - testedRecords, 0);

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
            borderColor={blurBorder}
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
                    Quản lý hồ sơ bệnh nhân
                  </Heading>
                    <Text color="gray.600">
                      Theo dõi thông tin bệnh nhân, lịch sử xét nghiệm và hồ sơ y tế
                  </Text>
                </Box>
              </HStack>
            </VStack>
              <MotionBox whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button leftIcon={<FiPlus />} variant="gradient" size="lg" onClick={onOpen}>
                Tạo hồ sơ mới
              </Button>
            </MotionBox>
          </Flex>
            <Divider my={6} borderColor="gray.200" />
            <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
              <Stat
                p={4}
                borderRadius="xl"
                bg="linear-gradient(135deg, rgba(129, 230, 217, 0.4), rgba(79, 209, 197, 0.2))"
              >
                <StatLabel color="gray.600">Tổng hồ sơ</StatLabel>
                <StatNumber fontSize="2xl">{totalRecords}</StatNumber>
                <StatHelpText color="gray.600">Đang quản lý</StatHelpText>
              </Stat>
              <Stat
                p={4}
                borderRadius="xl"
                bg="linear-gradient(135deg, rgba(129, 178, 255, 0.4), rgba(79, 120, 255, 0.2))"
              >
                <StatLabel color="gray.600">Đã có xét nghiệm</StatLabel>
                <StatNumber fontSize="2xl">{testedRecords}</StatNumber>
                <StatHelpText color="gray.600">Có kết quả gần nhất</StatHelpText>
              </Stat>
              <Stat
                p={4}
                borderRadius="xl"
                bg="linear-gradient(135deg, rgba(254, 178, 217, 0.4), rgba(255, 121, 198, 0.2))"
              >
                <StatLabel color="gray.600">Chưa xét nghiệm</StatLabel>
                <StatNumber fontSize="2xl">{noTestRecords}</StatNumber>
                <StatHelpText color="gray.600">Cần lên lịch</StatHelpText>
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
            <HStack
              spacing={2}
              px={4}
              py={2}
              borderRadius="full"
              bg="whiteAlpha.700"
              boxShadow="md"
            >
              <Icon as={FiUsers} color="purple.500" />
              <Text fontWeight="semibold">{filteredRecords.length} hồ sơ phù hợp</Text>
            </HStack>
            <HStack
              spacing={2}
              px={4}
              py={2}
              borderRadius="full"
              bg="whiteAlpha.700"
              boxShadow="md"
            >
              <Icon as={FiActivity} color="green.500" />
              <Text fontWeight="semibold">{testedRecords} đơn đã xét nghiệm</Text>
            </HStack>
          </HStack>
        </Flex>

        {/* ✅ Bảng hiển thị hồ sơ */}
        <PatientMedicalRecordTable
          records={filteredRecords}
          loading={loading}
          onViewDetail={handleViewDetail}
          onUpdate={handleUpdate}
          onDelete={handleDeleteClick}
        />

        {/* ✅ Modal tạo hồ sơ bệnh nhân */}
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          size="4xl"
          isCentered
          closeOnOverlayClick={!isSubmitting}
          scrollBehavior="inside"
        >
          <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <ModalContent
            borderRadius="2xl"
            boxShadow="2xl"
            maxH="90vh"
            overflow="hidden"
          >
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
                  <FiFileText size={24} />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Heading size="lg" color="white">
                    Tạo hồ sơ bệnh nhân mới
                  </Heading>
                  <Text fontSize="sm" color="whiteAlpha.900" fontWeight="normal">
                    Điền thông tin bệnh nhân và chẩn đoán
                  </Text>
                </VStack>
              </HStack>
            </ModalHeader>
            <ModalCloseButton
              color="white"
              size="lg"
              _hover={{ bg: "whiteAlpha.200" }}
              isDisabled={isSubmitting}
            />
            <ModalBody p={8} bg="gray.50">
              <PatientMedicalRecordForm
                form={form}
                setForm={setForm}
                onSubmit={handleCreateRecord}
                onClose={handleClose}
                isLoading={isSubmitting}
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* ✅ Modal xem chi tiết */}
        <MedicalRecordDetailModal
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          patientId={selectedPatientId}
          onTestOrderCreated={handleTestOrderSuccess}
          onViewTestOrder={handleViewTestOrder}
          refreshKey={detailRefreshKey}
        />

        {/* ✅ Modal cập nhật */}
        <UpdateMedicalRecordModal
          isOpen={isUpdateOpen}
          onClose={onUpdateClose}
          patientId={selectedPatientId}
          onSuccess={handleUpdateSuccess}
        />

        {/* ✅ Modal xem chi tiết đơn xét nghiệm */}
        <TestOrderDetailModal
          isOpen={isTestOrderDetailOpen}
          onClose={onTestOrderDetailClose}
          testOrderId={selectedTestOrderId}
          onSuccess={handleTestOrderSuccess}
        />

        {/* ✅ AlertDialog xác nhận xóa */}
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Xác nhận xóa hồ sơ
              </AlertDialogHeader>
              <AlertDialogBody>
                Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân này? Hành động này không thể hoàn tác.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Hủy
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleConfirmDelete}
                  ml={3}
                  isDisabled={!selectedPatientId}
                >
                  Xóa
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </Box>
  );
};

export default PatientMedicalRecordPageChakra;
