import React, { useState } from "react";
import {
  Box,
  Heading,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  usePatientMedicalRecords,
  type CreateMedicalRecordRequest,
} from "../hooks/usePatientMedicalRecords";
import PatientMedicalRecordForm from "../components/PatientMedicalRecordForm";
import PatientMedicalRecordTable from "../components/PatientMedicalRecordTable";

const PatientMedicalRecordPageChakra: React.FC = () => {
  const { records, loading, createRecord } = usePatientMedicalRecords();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Form state mặc định
  const [form, setForm] = useState<CreateMedicalRecordRequest>({
    patient: {
      fullName: "",
      dateOfBirth: "",
      gender: "male",
      phoneNumber: "",
      userId: "user-123",
      address: "",
      email: "",
      identifyNumber: "",
    },
    doctorId: "doctor-001",
    createdBy: "admin",
    clinicalNotes: "",
    diagnosis: "",
  });

  // 🧠 Hàm xử lý khi tạo hồ sơ thành công
  const handleCreateRecord = async () => {
    await createRecord(form);
    onClose(); // Đóng popup sau khi tạo xong
    // Reset form
    setForm({
      patient: {
        fullName: "",
        dateOfBirth: "",
        gender: "male",
        phoneNumber: "",
        userId: "user-123",
        address: "",
        email: "",
        identifyNumber: "",
      },
      doctorId: "doctor-001",
      createdBy: "admin",
      clinicalNotes: "",
      diagnosis: "",
    });
  };

  return (
    <Box p={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">🩺 Quản lý hồ sơ bệnh nhân</Heading>

        {/* ✅ Nút mở popup tạo hồ sơ */}
        <Button colorScheme="blue" onClick={onOpen}>
          + Tạo hồ sơ mới
        </Button>
      </Box>

      <Divider mb={6} />

      {/* ✅ Bảng hiển thị hồ sơ */}
      <PatientMedicalRecordTable records={records} loading={loading} />

      {/* ✅ Popup tạo hồ sơ bệnh nhân */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tạo hồ sơ bệnh nhân mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <PatientMedicalRecordForm
              form={form}
              setForm={setForm}
              onSubmit={handleCreateRecord}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PatientMedicalRecordPageChakra;
