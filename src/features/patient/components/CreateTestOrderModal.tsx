import React, { useState } from "react";
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
  Input,
  FormErrorMessage,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCreditCard,
  FiFileText,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useTestOrders } from "../hooks/useTestOrders";
import GenderSelect from "../../../components/common/GenderSelect";
import { convertToMMDDYYYY } from "../../../utils/formatDate";
import { getUserInfo } from "../../../utils/jwtHelper";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface CreateTestOrderForm {
  patient: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    identifyNumber?: string;
    lastTestDate?: string;
  };
}

const MotionBox = motion(Box);

const CreateTestOrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { createTestOrder, loading } = useTestOrders();
  const [form, setForm] = useState<CreateTestOrderForm>({
    patient: {
      fullName: "",
      dateOfBirth: "",
      gender: "male",
      phoneNumber: "",
      email: "",
      address: "",
      identifyNumber: "",
      lastTestDate: "",
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
    if (!validate()) {
      return;
    }

    try {
      const user = getUserInfo();
      const dateOfBirth = convertToMMDDYYYY(form.patient.dateOfBirth);
      
      const patientData: any = {
        fullName: form.patient.fullName,
        dateOfBirth: dateOfBirth,
        gender: form.patient.gender.toLowerCase(),
        phoneNumber: form.patient.phoneNumber,
      };

      // Optional fields
      if (form.patient.email?.trim()) {
        patientData.email = form.patient.email.trim();
      }
      if (form.patient.address?.trim()) {
        patientData.address = form.patient.address.trim();
      }
      if (form.patient.identifyNumber?.trim()) {
        patientData.identifyNumber = form.patient.identifyNumber.trim();
      }
      if (form.patient.lastTestDate?.trim()) {
        patientData.lastTestDate = convertToMMDDYYYY(form.patient.lastTestDate);
      }

      await createTestOrder({
        patient: patientData,
        createdBy: user?.sub || "",
      });

      // Reset form
      setForm({
        patient: {
          fullName: "",
          dateOfBirth: "",
          gender: "male",
          phoneNumber: "",
          email: "",
          address: "",
          identifyNumber: "",
          lastTestDate: "",
        },
      });
      setErrors({});
      onSuccess?.();
      onClose();
    } catch (err) {
      // Error đã được xử lý trong hook
    }
  };

  const handleClose = () => {
    setForm({
      patient: {
        fullName: "",
        dateOfBirth: "",
        gender: "male",
        phoneNumber: "",
        email: "",
        address: "",
        identifyNumber: "",
        lastTestDate: "",
      },
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" boxShadow="2xl" maxH="90vh" overflow="hidden">
        <ModalHeader
          bgGradient="linear(to-r, purple.400, pink.500)"
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
                Tạo đơn xét nghiệm cho bệnh nhân mới
              </Text>
              <Text fontSize="sm" color="whiteAlpha.900" fontWeight="normal">
                Điền thông tin bệnh nhân và tạo đơn xét nghiệm
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" size="lg" _hover={{ bg: "whiteAlpha.200" }} />
        <ModalBody p={8} bg="gray.50" overflowY="auto">
          <VStack spacing={6} align="stretch">
            {/* Thông tin bệnh nhân */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <HStack mb={4} spacing={3}>
                <Box
                  p={2}
                  bgGradient="linear(to-r, purple.400, pink.500)"
                  borderRadius="lg"
                >
                  <Icon as={FiUser} boxSize={5} color="white" />
                </Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Thông tin bệnh nhân
                </Text>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {/* Họ và tên */}
                <FormControl isRequired isInvalid={!!errors.fullName}>
                  <FormLabel>Họ và tên</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiUser} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Nhập họ và tên"
                      value={form.patient.fullName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, fullName: e.target.value },
                        })
                      }
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                </FormControl>

                {/* Ngày sinh */}
                <FormControl isRequired isInvalid={!!errors.dateOfBirth}>
                  <FormLabel>Ngày sinh</FormLabel>
                  <InputGroup>
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
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                </FormControl>

                {/* Giới tính */}
                <FormControl>
                  <FormLabel>Giới tính</FormLabel>
                  <GenderSelect
                    value={form.patient.gender}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        patient: { ...form.patient, gender: value },
                      })
                    }
                  />
                </FormControl>

                {/* Số điện thoại */}
                <FormControl isRequired isInvalid={!!errors.phoneNumber}>
                  <FormLabel>Số điện thoại</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiPhone} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Nhập số điện thoại"
                      value={form.patient.phoneNumber}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, phoneNumber: e.target.value },
                        })
                      }
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>

                {/* Email */}
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMail} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="Nhập email (tùy chọn)"
                      value={form.patient.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, email: e.target.value },
                        })
                      }
                    />
                  </InputGroup>
                </FormControl>

                {/* Địa chỉ */}
                <FormControl>
                  <FormLabel>Địa chỉ</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMapPin} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Nhập địa chỉ (tùy chọn)"
                      value={form.patient.address}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, address: e.target.value },
                        })
                      }
                    />
                  </InputGroup>
                </FormControl>

                {/* Số CMND/CCCD */}
                <FormControl>
                  <FormLabel>Số CMND/CCCD</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiCreditCard} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Nhập số CMND/CCCD (tùy chọn)"
                      value={form.patient.identifyNumber}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, identifyNumber: e.target.value },
                        })
                      }
                    />
                  </InputGroup>
                </FormControl>

                {/* Ngày test gần nhất */}
                <FormControl>
                  <FormLabel>Ngày test gần nhất</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiCalendar} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="date"
                      placeholder="Ngày test gần nhất (tùy chọn)"
                      value={form.patient.lastTestDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, lastTestDate: e.target.value },
                        })
                      }
                    />
                  </InputGroup>
                </FormControl>
              </SimpleGrid>
            </MotionBox>
          </VStack>
        </ModalBody>
        <ModalFooter bg="gray.50" px={8} py={6}>
          <HStack spacing={3}>
            <Button
              leftIcon={<FiX />}
              variant="outline"
              onClick={handleClose}
              isDisabled={loading}
            >
              Hủy
            </Button>
            <Button
              leftIcon={<FiSave />}
              colorScheme="purple"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Đang tạo..."
            >
              Tạo đơn xét nghiệm
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTestOrderModal;


