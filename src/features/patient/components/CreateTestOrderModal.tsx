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

    // FullName: Required
    if (!form.patient.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (form.patient.fullName.length > 200) {
      newErrors.fullName = "Full name must not exceed 200 characters.";
    }

    // DateOfBirth: Required
    if (!form.patient.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }

    // Gender: Required
    if (!form.patient.gender) {
      newErrors.gender = "Gender is required.";
    }

    // PhoneNumber: Required, Regex
    if (!form.patient.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?[0-9]{9,15}$/.test(form.patient.phoneNumber.trim())) {
      newErrors.phoneNumber = "Invalid phone number format. Must be 9-15 digits.";
    }

    // Email: Required + Valid format (FE requirement)
    if (!form.patient.email || !form.patient.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.patient.email)) {
        newErrors.email = "Invalid email format.";
      } else if (form.patient.email.length > 200) {
        newErrors.email = "Email must not exceed 200 characters.";
      }
    }

    // Address: Required (FE requirement)
    if (!form.patient.address || !form.patient.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (form.patient.address.length > 300) {
      newErrors.address = "Address must not exceed 300 characters.";
    }

    // IdentifyNumber: Required + Must be 12 digits (FE requirement)
    if (!form.patient.identifyNumber || !form.patient.identifyNumber.trim()) {
      newErrors.identifyNumber = "CCCD/CMND is required.";
    } else if (!/^[0-9]{12}$/.test(form.patient.identifyNumber.trim())) {
      newErrors.identifyNumber = "CCCD/CMND must be exactly 12 digits.";
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
        // Required fields (FE validation)
        email: form.patient.email?.trim() || "",
        address: form.patient.address?.trim() || "",
        identifyNumber: form.patient.identifyNumber?.trim() || "",
      };

      // Optional field: lastTestDate
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

  const handleBlur = (field: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "fullName":
        if (!form.patient.fullName.trim()) {
          newErrors.fullName = "Full name is required.";
        } else if (form.patient.fullName.length > 200) {
          newErrors.fullName = "Full name must not exceed 200 characters.";
        } else {
          delete newErrors.fullName;
        }
        break;

      case "dateOfBirth":
        if (!form.patient.dateOfBirth) {
          newErrors.dateOfBirth = "Date of birth is required.";
        } else {
          delete newErrors.dateOfBirth;
        }
        break;

      case "phoneNumber":
        if (!form.patient.phoneNumber.trim()) {
          newErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\+?[0-9]{9,15}$/.test(form.patient.phoneNumber.trim())) {
          newErrors.phoneNumber = "Invalid phone number format. Must be 9-15 digits.";
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      case "email":
        if (!form.patient.email || !form.patient.email.trim()) {
          newErrors.email = "Email is required.";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(form.patient.email)) {
            newErrors.email = "Invalid email format.";
          } else if (form.patient.email.length > 200) {
            newErrors.email = "Email must not exceed 200 characters.";
          } else {
            delete newErrors.email;
          }
        }
        break;

      case "address":
        if (!form.patient.address || !form.patient.address.trim()) {
          newErrors.address = "Address is required.";
        } else if (form.patient.address.length > 300) {
          newErrors.address = "Address must not exceed 300 characters.";
        } else {
          delete newErrors.address;
        }
        break;

      case "identifyNumber":
        if (!form.patient.identifyNumber || !form.patient.identifyNumber.trim()) {
          newErrors.identifyNumber = "CCCD/CMND is required.";
        } else if (!/^[0-9]{12}$/.test(form.patient.identifyNumber.trim())) {
          newErrors.identifyNumber = "CCCD/CMND must be exactly 12 digits.";
        } else {
          delete newErrors.identifyNumber;
        }
        break;
    }

    setErrors(newErrors);
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
                      onBlur={() => handleBlur("fullName")}
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
                      onBlur={() => handleBlur("dateOfBirth")}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                </FormControl>

                {/* Giới tính */}
                <FormControl isRequired isInvalid={!!errors.gender}>
              
                  <GenderSelect
                    value={form.patient.gender}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        patient: { ...form.patient, gender: value },
                      })
                    }
                  />
                  <FormErrorMessage>{errors.gender}</FormErrorMessage>
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
                      onBlur={() => handleBlur("phoneNumber")}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>

                {/* Email */}
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMail} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="Nhập email"
                      value={form.patient.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, email: e.target.value },
                        })
                      }
                      onBlur={() => handleBlur("email")}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                {/* Địa chỉ */}
                <FormControl isRequired isInvalid={!!errors.address}>
                  <FormLabel>Địa chỉ</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiMapPin} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Nhập địa chỉ"
                      value={form.patient.address}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, address: e.target.value },
                        })
                      }
                      onBlur={() => handleBlur("address")}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>

                {/* Số CMND/CCCD */}
                <FormControl isRequired isInvalid={!!errors.identifyNumber}>
                  <FormLabel>Số CMND/CCCD</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiCreditCard} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Nhập số CMND/CCCD (12 số)"
                      value={form.patient.identifyNumber}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient: { ...form.patient, identifyNumber: e.target.value },
                        })
                      }
                      onBlur={() => handleBlur("identifyNumber")}
                      maxLength={12}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.identifyNumber}</FormErrorMessage>
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


