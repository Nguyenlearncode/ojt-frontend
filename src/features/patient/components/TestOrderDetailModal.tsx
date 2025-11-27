//src/features/patient/components/TestOrderDetailModal.tsx

import React, { useState, useEffect } from "react";
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
  Divider,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Icon,
  Button,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUser,
  FiActivity,
  FiEdit,
  FiTrash2,
  FiRefreshCw,
  FiMoreVertical,
  FiUpload,
  FiPrinter,
  FiMessageSquare,
} from "react-icons/fi";
import {
  useTestOrders,
  type ViewPatientTestOrderDetailResult,
  type TestOrderCommentDto,
} from "../hooks/useTestOrders";
import { formatDate } from "../../../utils/formatDate";

import SyncTestResultModal from "./SyncTestResultModal";
import ModifyTestOrderModal from "./ModifyTestOrderModal";
import CommentFormModal from "./CommentFormModal";
import { useTestOrderComments } from "../hooks/useTestOrderComments";
import { useTestOrderResults } from "../hooks/useTestOrderResults";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  testOrderId: string;
  onSuccess?: () => void | Promise<void>;
}

const MotionBox = motion(Box);

const TestOrderDetailModal: React.FC<Props> = ({
  isOpen,
  onClose,
  testOrderId,
  onSuccess,
}) => {
  const { getTestOrderDetail, deleteTestOrder, exportTestOrders, printTestOrder, reviewTestOrder, sendEmailResult } =
    useTestOrders();

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] =
    useState<ViewPatientTestOrderDetailResult | null>(null);

  // ============================
  // DELETE
  // ============================
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isSyncResultOpen,
    onOpen: onSyncResultOpen,
    onClose: onSyncResultClose,
  } = useDisclosure();

  const {
    isOpen: isModifyModalOpen,
    onOpen: onModifyModalOpen,
    onClose: onModifyModalClose,
  } = useDisclosure();

  const {
    isOpen: isCommentModalOpen,
    onOpen: onCommentModalOpen,
    onClose: onCommentModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditCommentModalOpen,
    onOpen: onEditCommentModalOpen,
    onClose: onEditCommentModalClose,
  } = useDisclosure();

  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const bgColor = useColorModeValue("white", "gray.800");

  const {
    addComment,
    updateComment,
    deleteComment: deleteCommentApi,
    loading: commentLoading,
  } = useTestOrderComments();

  const { createTestOrderResult } = useTestOrderResults();

  const [editingComment, setEditingComment] =
    useState<TestOrderCommentDto | null>(null);

  const handleWheel = (e: React.WheelEvent) => e.stopPropagation();
  const handleScroll = (e: React.UIEvent) => e.stopPropagation();

  useEffect(() => {
    if (isOpen && testOrderId) loadDetail();
  }, [isOpen, testOrderId]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const data = await getTestOrderDetail(testOrderId);
      setDetail(data);
    } catch {
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => onDeleteOpen();

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTestOrder(testOrderId);
      onDeleteClose();
      onSuccess?.();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSyncResultSuccess = async () => {
    await loadDetail();
    await onSuccess?.();
  };

  const handleModifySuccess = async () => {
    await loadDetail();
    await onSuccess?.();
  };

  const handleAddComment = async (content: string) => {
    if (!detail?.testOrder) return;
    await addComment(detail.testOrder.testOrderId, content);
    await loadDetail();
  };

  const handleEditComment = async (content: string) => {
    if (!detail?.testOrder || !editingComment) return;
    await updateComment(
      detail.testOrder.testOrderId,
      editingComment.commentId,
      content
    );
    setEditingComment(null);
    await loadDetail();
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!detail?.testOrder) return;
    await deleteCommentApi(detail.testOrder.testOrderId, commentId);
    await loadDetail();
  };

  const handleExportExcel = () => exportTestOrders(detail?.testOrder?.patientId);

  const handleDownloadPdf = () => {
    if (!detail?.testOrder) return;
    printTestOrder(detail.testOrder.testOrderId, detail.testOrder.patientName);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "complete":
        return "green";
      case "pending":
        return "yellow";
      case "cancel":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case "complete":
        return "Hoàn thành";
      case "pending":
        return "Đang chờ";
      case "cancel":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getFlagColor = (flag?: string) => {
    if (!flag) return "gray";
    switch (flag.toUpperCase()) {
      case "HIGH":
      case "H":
        return "red";
      case "LOW":
      case "L":
        return "blue";
      case "CRITICAL":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      {/* MAIN MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        isCentered
        scrollBehavior="inside"
        blockScrollOnMount={false}
        trapFocus={false}
        portalProps={{ appendToParentPortal: false }}
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent
          borderRadius="2xl"
          boxShadow="2xl"
          maxH="90vh"
          display="flex"
          flexDirection="column"
        >
          <ModalHeader
            bgGradient="linear(to-r, purple.400, pink.500)"
            color="white"
            py={6}
            px={8}
          >
            <HStack spacing={3}>
              <Box bg="whiteAlpha.200" p={2} borderRadius="lg">
                <Icon as={FiFileText} boxSize={6} color="white" />
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="xl" fontWeight="bold" color="white">
                  Chi tiết đơn xét nghiệm
                </Text>
                <Text fontSize="sm" color="whiteAlpha.900">
                  Thông tin đơn xét nghiệm và kết quả
                </Text>
              </VStack>
            </HStack>
          </ModalHeader>

          <ModalCloseButton color="white" size="lg" />

          <ModalBody
            p={8}
            bg="gray.50"
            overflowY="auto"
            flex="1"
            onWheel={handleWheel}
            onScroll={handleScroll}
          >
            {loading ? (
              <VStack spacing={4} py={8}>
                <Spinner size="xl" color="purple.500" />
                <Text>Đang tải thông tin...</Text>
              </VStack>
            ) : detail?.testOrder ? (
              <VStack spacing={6} align="stretch">
                {/* Thông tin đơn */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  p={6}
                  bg={bgColor}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <HStack mb={4}>
                    <Box p={2} bg="purple.400" borderRadius="lg">
                      <Icon as={FiUser} color="white" />
                    </Box>
                    <Text fontSize="lg" fontWeight="bold">
                      Thông tin đơn xét nghiệm
                    </Text>
                    <Badge
                      ml="auto"
                      px={3}
                      py={1}
                      borderRadius="full"
                      colorScheme={getStatusColor(detail.testOrder.status)}
                    >
                      {getStatusLabel(detail.testOrder.status)}
                    </Badge>
                  </HStack>

                  <Divider mb={4} />

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Mã đơn xét nghiệm
                      </Text>
                      <Text fontFamily="mono" color="gray.800">
                        {detail.testOrder.testOrderId}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Mã bệnh nhân
                      </Text>
                      <Text fontFamily="mono" color="gray.800">
                        {detail.testOrder.patientId}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Tên bệnh nhân
                      </Text>
                      <Text color="gray.800">
                        {detail.testOrder.patientName}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Số điện thoại
                      </Text>
                      <Text color="gray.800">
                        {detail.testOrder.phoneNumber || "N/A"}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Ngày sinh
                      </Text>
                      <Text color="gray.800">
                        {formatDate(detail.testOrder.dateOfBirth, "dd/MM/yyyy")}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Tuổi
                      </Text>
                      <Text color="gray.800">{detail.testOrder.age} tuổi</Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Giới tính
                      </Text>
                      <Text color="gray.800">
                        {detail.testOrder.gender === "male" ? "Nam" : "Nữ"}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Người tạo
                      </Text>
                      <Text color="gray.800">
                        {detail.testOrder.createdBy || "N/A"}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Ngày tạo
                      </Text>
                      <Text color="gray.800">
                        {formatDate(detail.testOrder.createdAt, "dd/MM/yyyy HH:mm")}
                      </Text>
                    </Box>

                    {detail.testOrder.runBy && (
                      <Box>
                        <Text fontWeight="600" color="gray.600" fontSize="sm">
                          Người thực hiện
                        </Text>
                        <Text color="gray.800">
                          {detail.testOrder.runBy}
                        </Text>
                      </Box>
                    )}

                    {detail.testOrder.runOn && (
                      <Box>
                        <Text fontWeight="600" color="gray.600" fontSize="sm">
                          Ngày thực hiện
                        </Text>
                        <Text color="gray.800">
                          {formatDate(detail.testOrder.runOn, "dd/MM/yyyy HH:mm")}
                        </Text>
                      </Box>
                    )}

                    {detail.testOrder.reviewedBy && (
                      <Box>
                        <Text fontWeight="600" color="gray.600" fontSize="sm">
                          Người xác nhận
                        </Text>
                        <Text color="gray.800">
                          {detail.testOrder.reviewedBy}
                        </Text>
                      </Box>
                    )}

                    {detail.testOrder.reviewedAt && (
                      <Box>
                        <Text fontWeight="600" color="gray.600" fontSize="sm">
                          Ngày xác nhận
                        </Text>
                        <Text color="gray.800">
                          {formatDate(detail.testOrder.reviewedAt, "dd/MM/yyyy HH:mm")}
                        </Text>
                      </Box>
                    )}
                  </SimpleGrid>
                </MotionBox>

                {/* Kết quả */}
                {detail.testResults?.length ? (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    p={6}
                    bg={bgColor}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <HStack mb={4}>
                      <Box p={2} bg="green.400" borderRadius="lg">
                        <Icon as={FiActivity} color="white" />
                      </Box>
                      <Text fontSize="lg" fontWeight="bold">
                        Kết quả xét nghiệm
                      </Text>
                    </HStack>

                    <Divider mb={4} />

                    <Box overflowX="auto">
                      <Table size="sm">
                        <Thead bg="gray.100">
                          <Tr>
                            <Th>Tên xét nghiệm</Th>
                            <Th>Giá trị</Th>
                            <Th>Khoảng tham chiếu</Th>
                            <Th>Flag</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {detail.testResults.map((r) => (
                            <Tr key={r.resultId}>
                              <Td>{r.testName}</Td>
                              <Td fontWeight="bold">{r.value}</Td>
                              <Td>{r.referenceRange ?? "N/A"}</Td>
                              <Td>
                                <Badge px={2} colorScheme={getFlagColor(r.flag)}>
                                  {r.flag}
                                </Badge>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </MotionBox>
                ) : (
                  <MotionBox
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    p={6}
                    bg={bgColor}
                    borderRadius="lg"
                    textAlign="center"
                    boxShadow="md"
                  >
                    <Text color="gray.500" fontStyle="italic">
                      Chưa có kết quả xét nghiệm.
                    </Text>
                  </MotionBox>
                )}

                {/* Bình luận */}
                {detail.comments?.length ? (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    p={6}
                    bg={bgColor}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <HStack mb={4}>
                      <Icon as={FiFileText} boxSize={5} color="gray.600" />
                      <Text fontWeight="bold" fontSize="lg">
                        Ghi chú
                      </Text>
                    </HStack>

                    <Divider mb={4} />

                    <VStack spacing={3} align="stretch">
                      {detail.comments.map((c) => (
                        <Box
                          key={c.commentId}
                          p={4}
                          bg="gray.50"
                          borderLeft="4px solid #9f7aea"
                          borderRadius="md"
                        >
                          <Text fontSize="sm" color="gray.600">
                            {c.userName || "Unknown"} -{" "}
                            {formatDate(c.createdAt, "dd/MM/yyyy HH:mm")}
                          </Text>
                          <Text>{c.content}</Text>

                          <HStack justify="flex-end" mt={2}>
                            <Button
                              size="xs"
                              variant="ghost"
                              leftIcon={<FiEdit />}
                              onClick={() => {
                                setEditingComment(c);
                                onEditCommentModalOpen();
                              }}
                            >
                              Sửa
                            </Button>

                            <Button
                              size="xs"
                              variant="ghost"
                              colorScheme="red"
                              leftIcon={<FiTrash2 />}
                              onClick={() =>
                                handleDeleteComment(c.commentId)
                              }
                            >
                              Xóa
                            </Button>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </MotionBox>
                ) : (
                  <Box
                    p={6}
                    bg={bgColor}
                    borderRadius="lg"
                    border="1px dashed"
                    textAlign="center"
                  >
                    <Text color="gray.500">Chưa có bình luận nào.</Text>
                  </Box>
                )}
              </VStack>
            ) : (
              <Box textAlign="center" p={8}>
                <Text color="gray.500">Không thể tải thông tin chi tiết.</Text>
              </Box>
            )}
          </ModalBody>

          {/* FOOTER */}
          <ModalFooter bg="gray.50" borderTopWidth="1px">
            <HStack spacing={3} flexWrap="wrap">

              {/* Tiến hành xét nghiệm */}
              {detail?.testOrder &&
                detail.testOrder.status?.toLowerCase() === "pending" && (
                  <Button
                    leftIcon={<FiActivity />}
                    colorScheme="green"
                    onClick={async () => {
                      try {
                        const pid =
                          detail?.testOrder?.patientId ??
                          null;

                        if (!pid) {
                          toast({
                            title: "Không thể tạo kết quả",
                            description: "Không tìm thấy patientId từ backend.",
                            status: "error",
                          });
                          return;
                        }

                        await createTestOrderResult({
                          patientId: pid,
                          testOrderId,
                        });

                        await loadDetail();
                        onSuccess?.();
                      } catch { }
                    }}
                    isLoading={loading}
                    loadingText="Đang xử lý..."
                  >
                    Tiến hành xét nghiệm
                  </Button>

                )}

              {/* Hủy đơn */}
              {detail?.testOrder?.status?.toLowerCase() !== "complete" && (
                <Button
                  leftIcon={<FiTrash2 />}
                  colorScheme="red"
                  onClick={handleDeleteClick}
                >
                  Hủy đơn
                </Button>
              )}

              {/* REVIEW ĐƠN - Chỉ hiển thị khi status là Complete */}
              {detail?.testOrder?.status?.toLowerCase() === "complete" && (
                <Button
                  leftIcon={<FiActivity />}
                  colorScheme="purple"
                  variant="solid"
                  onClick={async () => {
                    try {
                      await reviewTestOrder(testOrderId);
                      await loadDetail();
                      onSuccess?.();
                    } catch { }
                  }}
                >
                  Xác nhận kết quả
                </Button>
              )}

              {/* Thêm bình luận */}
              <Button
                leftIcon={<FiMessageSquare />}
                variant="outline"
                onClick={onCommentModalOpen}
              >
                Thêm bình luận
              </Button>

              {/* Menu Thao tác khác */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical />}
                  variant="outline"
                  aria-label="Thao tác khác"
                />
                <MenuList>
                  <MenuItem icon={<FiEdit />} onClick={onModifyModalOpen}>
                    Chỉnh sửa đơn
                  </MenuItem>

                  <MenuItem icon={<FiRefreshCw />} onClick={onSyncResultOpen}>
                    Đồng bộ kết quả
                  </MenuItem>

                  <MenuItem icon={<FiUpload />} onClick={handleExportExcel}>
                    Xuất Excel
                  </MenuItem>

                  <MenuItem icon={<FiPrinter />} onClick={handleDownloadPdf}>
                    In PDF
                  </MenuItem>

                  <MenuItem
                    icon={<FiUpload />}
                    onClick={async () => {
                      try {
                        await sendEmailResult(testOrderId);
                      } catch { }
                    }}
                  >
                    Gửi kết quả
                  </MenuItem>

                </MenuList>
              </Menu>
            </HStack>
          </ModalFooter>

        </ModalContent>
      </Modal>

      {/* ALERT DELETE */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Xác nhận hủy đơn</AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc muốn hủy đơn xét nghiệm này?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={handleConfirmDelete}
                ml={3}
                isLoading={isDeleting}
              >
                Xác nhận
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>


      {/* SYNC RESULT */}
      {detail?.testOrder && (
        <SyncTestResultModal
          isOpen={isSyncResultOpen}
          onClose={onSyncResultClose}
          testOrderId={testOrderId}
          onSuccess={handleSyncResultSuccess}
        />
      )}

      {/* MODIFY */}
      <ModifyTestOrderModal
        isOpen={isModifyModalOpen}
        onClose={onModifyModalClose}
        testOrder={detail?.testOrder ?? null}
        onSuccess={handleModifySuccess}
      />

      {/* COMMENT */}
      <CommentFormModal
        isOpen={isCommentModalOpen}
        onClose={onCommentModalClose}
        title="Thêm bình luận"
        initialValue=""
        onSubmit={async (value) => {
          await handleAddComment(value);
          onCommentModalClose();
        }}
        isSubmitting={commentLoading}
      />

      {/* EDIT COMMENT */}
      <CommentFormModal
        isOpen={isEditCommentModalOpen}
        onClose={() => {
          setEditingComment(null);
          onEditCommentModalClose();
        }}
        title="Sửa bình luận"
        initialValue={editingComment?.content ?? ""}
        onSubmit={async (value) => {
          await handleEditComment(value);
          onEditCommentModalClose();
        }}
        isSubmitting={commentLoading}
      />
    </>
  );
};

export default TestOrderDetailModal;
