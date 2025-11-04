import React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react";
import GenderSelect from "../../../components/common/GenderSelect";
import type { CreateMedicalRecordRequest } from "../hooks/usePatientMedicalRecords";

interface Props {
  form: CreateMedicalRecordRequest;
  setForm: React.Dispatch<React.SetStateAction<CreateMedicalRecordRequest>>;
  onSubmit: () => void;
}

const PatientMedicalRecordForm: React.FC<Props> = ({ form, setForm, onSubmit }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} mb={8} bg="white" boxShadow="md">
      <Heading size="md" mb={4}>
        Tạo hồ sơ bệnh nhân mới
      </Heading>

      <VStack spacing={3} align="stretch">
        <FormControl>
          <FormLabel>Họ và tên</FormLabel>
          <Input
            value={form.patient.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                patient: { ...form.patient, fullName: e.target.value },
              })
            }
            placeholder="Nhập họ và tên"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Ngày sinh</FormLabel>
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
        </FormControl>

        {/* ✅ Giới tính dùng GenderSelect */}
        <GenderSelect
          value={form.patient.gender}
          onChange={(val) =>
            setForm({ ...form, patient: { ...form.patient, gender: val } })
          }
        />

        <FormControl>
          <FormLabel>Số điện thoại</FormLabel>
          <Input
            value={form.patient.phoneNumber}
            onChange={(e) =>
              setForm({
                ...form,
                patient: { ...form.patient, phoneNumber: e.target.value },
              })
            }
            placeholder="Nhập số điện thoại"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Chẩn đoán</FormLabel>
          <Input
            value={form.diagnosis}
            onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
            placeholder="Nhập chẩn đoán"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Ghi chú lâm sàng</FormLabel>
          <Textarea
            value={form.clinicalNotes}
            onChange={(e) => setForm({ ...form, clinicalNotes: e.target.value })}
            placeholder="Nhập ghi chú"
          />
        </FormControl>

        <Button colorScheme="blue" onClick={onSubmit}>
          Tạo hồ sơ
        </Button>
      </VStack>
    </Box>
  );
};

export default PatientMedicalRecordForm;
