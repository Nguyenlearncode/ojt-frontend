import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Icon,
  FormErrorMessage,
  HStack,
  useColorModeValue,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCreditCard,
  FiSave,
  FiX,
} from "react-icons/fi";
import GenderSelect from "../../../components/common/GenderSelect";
import {
  usePatientMedicalRecords,
  type UpdateMedicalRecordRequest,
  type ViewMedicalRecordDetailResponse,
} from "../hooks/usePatientMedicalRecords";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  onSuccess?: () => void;
}

const MotionBox = motion(VStack);

const UpdateMedicalRecordModal: React.FC<Props> = ({
  isOpen,
  onClose,
  patientId,
  onSuccess,
}) => {
  const { updateRecord, getRecordDetail } = usePatientMedicalRecords();
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const bgColor = useColorModeValue("white", "gray.800");

  const [form, setForm] = useState<UpdateMedicalRecordRequest>({
    patient: {
      fullName: "",
      dateOfBirth: "",
      gender: "Male",
      phoneNumber: "",
      userId: "",
      address: "",
      email: "",
      identifyNumber: "",
      lastTestDate: "",
    },
    updatedBy: "",
  });

  // Load patient data khi mở modal
  useEffect(() => {
    if (isOpen && patientId) {
      loadPatientDetail();
    }
  }, [isOpen, patientId]);

  const loadPatientDetail = async () => {
    setLoadingDetail(true);
    try {
      const detail: ViewMedicalRecordDetailResponse = await getRecordDetail(patientId);
      
      // Convert date từ backend format sang input format (yyyy-MM-dd)
      const convertDateForInput = (dateStr: string): string => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      setForm({
        patient: {
          fullName: detail.patientName || "",
          dateOfBirth: convertDateForInput(detail.dateOfBirth),
          gender: "Male", // Default, sẽ cần lấy từ API nếu có
          phoneNumber: detail.phoneNumber || "",
          userId: detail.patientId,
          address: detail.address || "",
          email: detail.email || "",
          identifyNumber: detail.identifyNumber || "",
          lastTestDate: convertDateForInput(detail.lastTestDate || ""),
        },
        updatedBy: "",
      });
    } finally {
      setLoadingDetail(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.patient.fullName.trim()) {
      newErrors.fullName = "Họ và tên là bắt buộc";
    }

    if (!form.patient.dateOfBirth) {
      newErrors.dateOfBirth = "Ngày sinh là bắt buộc";
    }

    if (!form.patient.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9]{10,11}$/.test(form.patient.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await updateRecord(patientId, form);
      onSuccess?.();
      onClose();
    } catch (err) {
      // Error đã được xử lý trong hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" boxShadow="2xl" maxH="90vh" overflow="hidden">
        <ModalHeader
          bgGradient="linear(to-r, orange.400, red.500)"
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
              <Icon as={FiUser} boxSize={6} />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="xl" fontWeight="bold" color="white">
                Cập nhật hồ sơ bệnh nhân
              </Text>
              <Text fontSize="sm" color="whiteAlpha.900" fontWeight="normal">
                Chỉnh sửa thông tin bệnh nhân
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" size="lg" _hover={{ bg: "whiteAlpha.200" }} />
        <ModalBody p={8} bg={bgColor}>
          {loadingDetail ? (
            <VStack spacing={4} py={8}>
              <Spinner size="xl" color="blue.500" />
              <Text>Đang tải thông tin bệnh nhân...</Text>
            </VStack>
          ) : (
            <MotionBox spacing={6} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                {/* Họ và tên */}
                <FormControl isRequired isInvalid={!!errors.fullName}>
                  <FormLabel fontWeight="600" color="gray.700">
                    Họ và tên
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiUser} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      value={form.patient.fullName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, fullName: e.target.value },
                        })
                      }
                      placeholder="Nhập họ và tên đầy đủ"
                      focusBorderColor="orange.400"
                      bg="white"
                    />
                  </InputGroup>
                  {errors.fullName && (
                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Ngày sinh */}
                <FormControl isRequired isInvalid={!!errors.dateOfBirth}>
                  <FormLabel fontWeight="600" color="gray.700">
                    Ngày sinh
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiCalendar} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="date"
                      value={form.patient.dateOfBirth}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, dateOfBirth: e.target.value },
                        })
                      }
                      focusBorderColor="orange.400"
                      bg="white"
                    />
                  </InputGroup>
                  {errors.dateOfBirth && (
                    <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Giới tính */}
                <FormControl isRequired>
                  
                  <GenderSelect
                    value={form.patient.gender}
                    onChange={(val) =>
                      setForm({ ...form, patient: { ...form.patient, gender: val } })
                    }
                  />
                </FormControl>

                {/* Số điện thoại */}
                <FormControl isRequired isInvalid={!!errors.phoneNumber}>
                  <FormLabel fontWeight="600" color="gray.700">
                    Số điện thoại
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiPhone} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      value={form.patient.phoneNumber}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, phoneNumber: e.target.value },
                        })
                      }
                      placeholder="Nhập số điện thoại"
                      focusBorderColor="orange.400"
                      bg="white"
                    />
                  </InputGroup>
                  {errors.phoneNumber && (
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Email */}
                <FormControl>
                  <FormLabel fontWeight="600" color="gray.700">
                    Email
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMail} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      value={form.patient.email || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, email: e.target.value },
                        })
                      }
                      placeholder="Nhập địa chỉ email"
                      focusBorderColor="orange.400"
                      bg="white"
                    />
                  </InputGroup>
                </FormControl>

                {/* Địa chỉ */}
                <FormControl>
                  <FormLabel fontWeight="600" color="gray.700">
                    Địa chỉ
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMapPin} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      value={form.patient.address || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, address: e.target.value },
                        })
                      }
                      placeholder="Nhập địa chỉ"
                      focusBorderColor="orange.400"
                      bg="white"
                    />
                  </InputGroup>
                </FormControl>

                {/* Số CCCD/CMND */}
                <FormControl>
                  <FormLabel fontWeight="600" color="gray.700">
                    Số CCCD/CMND
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiCreditCard} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      value={form.patient.identifyNumber || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, identifyNumber: e.target.value },
                        })
                      }
                      placeholder="Nhập số CCCD/CMND"
                      focusBorderColor="orange.400"
                      bg="white"
                    />
                  </InputGroup>
                </FormControl>

                {/* Ngày test gần nhất */}
                <FormControl>
                  <FormLabel fontWeight="600" color="gray.700">
                    Ngày test gần nhất
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiCalendar} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="date"
                      value={form.patient.lastTestDate || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, lastTestDate: e.target.value },
                        })
                      }
                      placeholder="Ngày xét nghiệm gần nhất"
                      focusBorderColor="orange.400"
                      bg="white"
                    />
                  </InputGroup>
                </FormControl>
              </SimpleGrid>
            </MotionBox>
          )}
        </ModalBody>
        <ModalFooter bg={bgColor} borderTop="1px" borderColor="gray.200">
          <HStack spacing={4}>
            <Button
              leftIcon={<FiX />}
              variant="outline"
              colorScheme="gray"
              size="lg"
              onClick={onClose}
              isDisabled={loading || loadingDetail}
            >
              Hủy
            </Button>
            <Button
              leftIcon={<FiSave />}
              bgGradient="linear(to-r, orange.400, red.500)"
              color="white"
              size="lg"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Đang cập nhật..."
              isDisabled={loadingDetail}
              _hover={{
                bgGradient: "linear(to-r, orange.500, red.600)",
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.2s"
            >
              Cập nhật
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMedicalRecordModal;

