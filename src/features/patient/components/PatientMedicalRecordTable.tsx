import React from "react";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { formatGender } from "../../../utils/formatGender";
import type { MedicalRecord } from "../hooks/usePatientMedicalRecords";

interface Props {
  records: MedicalRecord[];
  loading: boolean;
}

const PatientMedicalRecordTable: React.FC<Props> = ({ records, loading }) => {
  if (loading) return <Spinner size="xl" />;

  return (
    <Box bg="white" boxShadow="sm" borderRadius="md" p={4}>
      <Heading size="md" mb={3}>
        Danh sách hồ sơ bệnh nhân
      </Heading>

      {records.length === 0 ? (
        <Box mt={4}>Chưa có hồ sơ nào.</Box>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead bg="gray.100">
            <Tr>
              <Th>Mã hồ sơ</Th>
              <Th>Bệnh nhân</Th>
              <Th>Giới tính</Th>
              <Th>Chẩn đoán</Th>
              <Th>Bác sĩ</Th>
              <Th>Ngày tạo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map((r) => (
              <Tr key={r.recordId}>
                <Td>{r.recordId}</Td>
                <Td>{r.patient?.fullName}</Td>
                <Td>{formatGender(r.patient?.gender)}</Td>
                <Td>{r.diagnosis}</Td>
                <Td>{r.doctorId}</Td>
                <Td>{new Date(r.createdAt).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default PatientMedicalRecordTable;
