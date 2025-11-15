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
  Text,
} from "@chakra-ui/react";
import { formatDate } from "../../../utils/formatDate";
import type { ListPatientDto } from "../hooks/usePatientMedicalRecords";

interface Props {
  records: ListPatientDto[];
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
              <Th>Mã bệnh nhân</Th>
              <Th>Họ và tên</Th>
              <Th>Ngày sinh</Th>
              <Th>Ngày test gần nhất</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map((r, index) => {
              // Safe date formatting
              let formattedDateOfBirth = "N/A";
              let formattedLastTestDate = "N/A";
              
              try {
                if (r.dateOfBirth) {
                  const date = new Date(r.dateOfBirth);
                  if (!isNaN(date.getTime())) {
                    formattedDateOfBirth = formatDate(r.dateOfBirth, "dd/MM/yyyy");
                  }
                }
              } catch (e) {
                console.error("DateOfBirth parsing error:", e, r.dateOfBirth);
              }

              try {
                if (r.lastTestDate) {
                  const date = new Date(r.lastTestDate);
                  if (!isNaN(date.getTime())) {
                    formattedLastTestDate = formatDate(r.lastTestDate, "dd/MM/yyyy");
                  }
                } else {
                  formattedLastTestDate = "Chưa có";
                }
              } catch (e) {
                console.error("LastTestDate parsing error:", e, r.lastTestDate);
              }

              return (
                <Tr key={r.patientId || `patient-${index}`}>
                  <Td>
                    <Text fontSize="sm" fontWeight="medium">
                      {r.patientId || "N/A"}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" fontWeight="medium">
                      {r.fullName || "N/A"}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {formattedDateOfBirth}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {formattedLastTestDate}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default PatientMedicalRecordTable;
