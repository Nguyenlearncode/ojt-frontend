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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiPlus, FiFileText } from "react-icons/fi";
import {
  usePatientMedicalRecords,
  type CreateMedicalRecordRequest,
} from "../hooks/usePatientMedicalRecords";
import PatientMedicalRecordForm from "../components/PatientMedicalRecordForm";
import PatientMedicalRecordTable from "../components/PatientMedicalRecordTable";
import { getUserInfo } from "../../../utils/jwtHelper";

const MotionBox = motion(Box);

const PatientMedicalRecordPageChakra: React.FC = () => {
  const { records, loading, createRecord } = usePatientMedicalRecords();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useMemo(() => getUserInfo(), []);

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

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          mb={8}
        >
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <VStack align="flex-start" spacing={1}>
              <HStack spacing={3}>
                <Box
                  bg="whiteAlpha.300"
                  p={3}
                  borderRadius="lg"
                  color="white"
                  backdropFilter="blur(10px)"
                >
                  <FiFileText size={28} />
                </Box>
                <Box>
                  <Heading
                    size="xl"
                    bgGradient="linear(to-r, pink.300, white, blue.300)"
                    bgClip="text"
                    fontWeight="extrabold"
                  >
                    Quản lý hồ sơ bệnh nhân
                  </Heading>
                  <Text
                    bgGradient="linear(to-r, whiteAlpha.900, pink.200)"
                    bgClip="text"
                    fontSize="md"
                    textShadow="0px 1px 2px rgba(0,0,0,0.2)"
                  >
                    Tạo và quản lý hồ sơ bệnh án của bệnh nhân
                  </Text>
                </Box>
              </HStack>
            </VStack>
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                leftIcon={<FiPlus />}
                variant="gradient"
                size="lg"
                onClick={onOpen}
              >
                Tạo hồ sơ mới
              </Button>
            </MotionBox>
          </Flex>
        </MotionBox>

        {/* ✅ Bảng hiển thị hồ sơ */}
        <PatientMedicalRecordTable records={records} loading={loading} />

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
      </Container>
    </Box>
  );
};

export default PatientMedicalRecordPageChakra;
