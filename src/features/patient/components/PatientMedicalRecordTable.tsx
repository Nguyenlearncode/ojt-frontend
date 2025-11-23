import React from "react";
import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  HStack,
  Tooltip,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { formatDate } from "../../../utils/formatDate";
import type { ListPatientDto } from "../hooks/usePatientMedicalRecords";

interface Props {
  records: ListPatientDto[];
  loading: boolean;
  onViewDetail?: (patientId: string) => void;
  onUpdate?: (patientId: string) => void;
  onDelete?: (patientId: string) => void;
}

const PatientMedicalRecordTable: React.FC<Props> = ({
  records,
  loading,
  onViewDetail,
  onUpdate,
  onDelete,
}) => {
  const shellBg = useColorModeValue("rgba(255,255,255,0.95)", "rgba(26,32,44,0.92)");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const headerBg = useColorModeValue("linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)", "gray.700");
  const headerText = useColorModeValue("gray.700", "whiteAlpha.900");
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.200");

  const renderSkeleton = () => (
    <VStack spacing={4} px={{ base: 5, md: 8 }} py={6}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} height="48px" borderRadius="xl" />
      ))}
    </VStack>
  );

  const renderTableBody = () => (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead>
            <Tr>
            <Th>Mã bệnh nhân</Th>
            <Th>Họ và tên</Th>
            <Th>Ngày sinh</Th>
            <Th>Ngày xét nghiệm gần nhất</Th>
            <Th textAlign="center">Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
          {records.map((r, index) => {
            let formattedDateOfBirth = "N/A";
            let formattedLastTestDate = "Chưa có";

            if (r.dateOfBirth) {
              const date = new Date(r.dateOfBirth);
              if (!isNaN(date.getTime())) {
                formattedDateOfBirth = formatDate(r.dateOfBirth, "dd/MM/yyyy");
              }
            }

            if (r.lastTestDate) {
              const date = new Date(r.lastTestDate);
              if (!isNaN(date.getTime())) {
                formattedLastTestDate = formatDate(r.lastTestDate, "dd/MM/yyyy");
              }
            }

            return (
              <Tr key={r.patientId || `patient-${index}`} _hover={{ bg: hoverBg }}>
                <Td>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="xs" color="gray.500">
                      {r.patientId || "Không có ID"}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontWeight="semibold">{r.fullName || "N/A"}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {r.phoneNumber || "Chưa có số điện thoại"}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <Text fontSize="sm">{formattedDateOfBirth}</Text>
                </Td>
                <Td>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontSize="sm">{formattedLastTestDate}</Text>
                    
                  </VStack>
                </Td>
                <Td>
                  <HStack spacing={2} justify="center">
                    {onViewDetail && (
                      <Tooltip label="Xem chi tiết" hasArrow>
                        <IconButton
                          icon={<FiEye />}
                          aria-label="Xem chi tiết"
                          colorScheme="blue"
                          size="sm"
                          variant="ghost"
                          onClick={() => onViewDetail(r.patientId)}
                        />
                      </Tooltip>
                    )}
                    {onUpdate && (
                      <Tooltip label="Cập nhật" hasArrow>
                        <IconButton
                          icon={<FiEdit />}
                          aria-label="Cập nhật"
                          colorScheme="orange"
                          size="sm"
                          variant="ghost"
                          onClick={() => onUpdate(r.patientId)}
                        />
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip label="Xóa" hasArrow>
                        <IconButton
                          icon={<FiTrash2 />}
                          aria-label="Xóa"
                          colorScheme="red"
                          size="sm"
                          variant="ghost"
                          onClick={() => onDelete(r.patientId)}
                        />
                      </Tooltip>
                    )}
                  </HStack>
                </Td>
              </Tr>
            );
          })}
          </Tbody>
        </Table>
    </TableContainer>
  );

  return (
    <Box
      bg={shellBg}
      borderRadius="2xl"
      boxShadow="xl"
      border="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(12px)"
      overflow="hidden"
    >
      <Box
        bg={headerBg}
        px={{ base: 5, md: 8 }}
        py={5}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={2}>
          <Heading size="md" color={headerText}>
            Danh sách hồ sơ bệnh nhân
          </Heading>
          <Badge colorScheme="purple" borderRadius="full" px={4} py={1}>
            {records.length} hồ sơ
          </Badge>
        </Flex>
      </Box>

      {loading ? (
        renderSkeleton()
      ) : records.length === 0 ? (
        <Box px={{ base: 5, md: 8 }} py={10} textAlign="center" color="gray.500">
          Chưa có hồ sơ nào.
        </Box>
      ) : (
        renderTableBody()
      )}
    </Box>
  );
};

export default PatientMedicalRecordTable;
