import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  HStack,
  IconButton,
  Text,
  Tooltip,
  Badge,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import type { FlaggingSetConfig } from "../hooks/useFlaggingSets";

interface Props {
  configs: FlaggingSetConfig[];
  loading: boolean;
  onEdit: (config: FlaggingSetConfig) => void;
}

const formatNumber = (value?: number | null) =>
  value === undefined || value === null ? "—" : Number(value).toString();

const formatDateTime = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("vi-VN", { hour12: false });
};

const FlaggingSetTable: React.FC<Props> = ({
  configs,
  loading,
  onEdit,
}) => {
  const headerBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const hoverBg = useColorModeValue("purple.50", "whiteAlpha.100");

  if (loading) {
    return (
      <Box textAlign="center" py={16}>
        <Spinner size="xl" color="purple.500" />
      </Box>
    );
  }

  if (!configs.length) {
    return (
      <Box
        py={16}
        textAlign="center"
        border="1px dashed"
        borderColor="gray.200"
        borderRadius="lg"
        bg="white"
      >
        <Text color="gray.500">Chưa có cấu hình flagging nào.</Text>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead bg={headerBg}>
          <Tr>
            <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
              Mã
            </Th>
            <Th textTransform="uppercase" fontSize="xs" letterSpacing="wide">
              Tên xét nghiệm
            </Th>
            <Th isNumeric textTransform="uppercase" fontSize="xs">
              Ngưỡng thấp
            </Th>
            <Th isNumeric textTransform="uppercase" fontSize="xs">
              Ngưỡng cao
            </Th>
            <Th isNumeric textTransform="uppercase" fontSize="xs">
              Cảnh báo
            </Th>
            <Th textTransform="uppercase" fontSize="xs">
              Version
            </Th>
            <Th textTransform="uppercase" fontSize="xs">
              Ngày cập nhật
            </Th>
            <Th textAlign="center" textTransform="uppercase" fontSize="xs">
              Thao tác
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...configs]
            .sort((a, b) => (a.configId || 0) - (b.configId || 0))
            .map((config) => (
              <Tr
                key={config.configId}
                _hover={{ bg: hoverBg, transition: "background 0.2s" }}
              >
                <Td>
                  <Badge colorScheme="purple" variant="subtle">
                    {config.configId}
                  </Badge>
                </Td>
                <Td fontWeight="semibold">{config.testName}</Td>
                <Td isNumeric fontWeight="medium">
                  {formatNumber(config.lowThreshold)}
                </Td>
                <Td isNumeric fontWeight="medium">
                  {formatNumber(config.highThreshold)}
                </Td>
                <Td isNumeric fontWeight="medium">
                  {formatNumber(config.criticalThreshold)}
                </Td>
                <Td>{config.version || "1.0"}</Td>
                <Td>{formatDateTime(config.updatedAt)}</Td>
                <Td>
                  <HStack justify="center">
                    <Tooltip label="Chỉnh sửa" hasArrow>
                      <IconButton
                        aria-label="Chỉnh sửa"
                        icon={<FiEdit />}
                        size="sm"
                        variant="ghost"
                        colorScheme="purple"
                        onClick={() => onEdit(config)}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
        </Tbody>

      </Table>
    </TableContainer>
  );
};

export default FlaggingSetTable;


