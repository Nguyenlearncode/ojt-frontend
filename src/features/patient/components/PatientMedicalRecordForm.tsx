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

    // Note: diagnosis và clinicalNotes không được backend hỗ trợ trong API create
    // Các trường này đã bị comment out trong entity PatientMedicalRecord

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (validate()) {
      onSubmit();
    }
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
                  placeholder="Nhập địa chỉ email (tùy chọn)"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
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
                  placeholder="Nhập địa chỉ (tùy chọn)"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
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
                  placeholder="Nhập số CCCD/CMND (tùy chọn)"
                  focusBorderColor="blue.400"
                  bg="gray.50"
                  _hover={{ bg: "white" }}
                />
              </InputGroup>
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
