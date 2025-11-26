import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Icon,
  FormErrorMessage,
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
  FiSave,
  FiX,
} from "react-icons/fi";
import GenderSelect from "../../../components/common/GenderSelect";
import type { CreateMedicalRecordRequest } from "../hooks/usePatientMedicalRecords";

interface Props {
  form: CreateMedicalRecordRequest;
  setForm: React.Dispatch<React.SetStateAction<CreateMedicalRecordRequest>>;
  onSubmit: () => void;
  onClose?: () => void;
  isLoading?: boolean;
}

const MotionBox = motion(Box);

const PatientMedicalRecordForm: React.FC<Props> = ({
  form,
  setForm,
  onSubmit,
  onClose,
  isLoading = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // FullName: Required, MaxLength 200 (match BE)
    if (!form.patient.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (form.patient.fullName.length > 200) {
      newErrors.fullName = "Full name must not exceed 200 characters.";
    }

    // DateOfBirth: Required, Format MM/dd/yyyy (match BE)
    if (!form.patient.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }

    // PhoneNumber: Required, Regex ^\+?[0-9]{9,15}$ (match BE)
    if (!form.patient.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?[0-9]{9,15}$/.test(form.patient.phoneNumber.trim())) {
      newErrors.phoneNumber = "Invalid phone number format. Must be 9-15 digits.";
    }

    // Email: Required + Valid email format (FE requirement)
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

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (validate()) {
      onSubmit();
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

  return (
    <Box bg={bgColor}>
      <VStack spacing={6} align="stretch">
        {/* Thông tin bệnh nhân */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HStack mb={6} spacing={3}>
            <Box
              p={2}
              bgGradient="linear(to-r, blue.400, cyan.500)"
              borderRadius="lg"
              boxShadow="md"
            >
              <Icon as={FiUser} boxSize={5} color="white" />
            </Box>
            <Heading size="lg" color="gray.800">
              Thông tin bệnh nhân
            </Heading>
          </HStack>

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
                  onBlur={() => handleBlur("fullName")}
                  placeholder="Nhập họ và tên đầy đủ"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
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
                  onBlur={() => handleBlur("dateOfBirth")}
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
                />
              </InputGroup>
              {errors.dateOfBirth && (
                <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
              )}
            </FormControl>

            {/* Giới tính */}
            <FormControl isRequired isInvalid={!!errors.gender}>
              <GenderSelect
                value={form.patient.gender}
                onChange={(val) =>
                  setForm({ ...form, patient: { ...form.patient, gender: val } })
                }
              />
              {errors.gender && (
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              )}
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
                  onBlur={() => handleBlur("phoneNumber")}
                  placeholder="Nhập số điện thoại"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
                />
              </InputGroup>
              {errors.phoneNumber && (
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              )}
            </FormControl>

            {/* Email */}
            <FormControl isRequired isInvalid={!!errors.email}>
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
                  onBlur={() => handleBlur("email")}
                  placeholder="Nhập địa chỉ email"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
                />
              </InputGroup>
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>

            {/* Địa chỉ */}
            <FormControl isRequired isInvalid={!!errors.address}>
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
                  onBlur={() => handleBlur("address")}
                  placeholder="Nhập địa chỉ"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
                />
              </InputGroup>
              {errors.address && (
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              )}
            </FormControl>

            {/* Số CCCD/CMND */}
            <FormControl isRequired isInvalid={!!errors.identifyNumber}>
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
                  onBlur={() => handleBlur("identifyNumber")}
                  placeholder="Nhập số CCCD/CMND (12 số)"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
                  maxLength={12}
                />
              </InputGroup>
              {errors.identifyNumber && (
                <FormErrorMessage>{errors.identifyNumber}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
        </MotionBox>

        {/* Note: Thông tin y tế (Chẩn đoán và Ghi chú lâm sàng) đã bị tạm thời ẩn 
            vì backend API /api/medicalrecord/create không hỗ trợ các trường này.
            Các trường ClinicalNotes và Diagnosis đã bị comment out trong entity PatientMedicalRecord.
        */}

        {/* Nút hành động */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          pt={4}
          borderTop="1px"
          borderColor={borderColor}
        >
          <HStack spacing={4} justify="flex-end">
            {onClose && (
              <Button
                leftIcon={<FiX />}
                variant="outline"
                colorScheme="gray"
                size="lg"
                onClick={onClose}
                isDisabled={isLoading}
              >
                Hủy
              </Button>
            )}
            <Button
              leftIcon={<FiSave />}
              bgGradient="linear(to-r, blue.400, cyan.500)"
              color="white"
              size="lg"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Đang tạo..."
              _hover={{
                bgGradient: "linear(to-r, blue.500, cyan.600)",
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.2s"
            >
              Tạo hồ sơ
            </Button>
          </HStack>
        </MotionBox>
      </VStack>
    </Box>
  );
};

export default PatientMedicalRecordForm;
