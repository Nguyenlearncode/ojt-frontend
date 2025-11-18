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
  ButtonGroup,
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiPhone,
  FiActivity,
  FiCheckCircle,
  FiEdit,
  FiTrash2,
  FiRefreshCw,
  FiMoreVertical,
  FiUpload,
  FiPrinter,
  FiFlag,
  FiMessageSquare,
} from "react-icons/fi";
import {
  useTestOrders,
  type ViewPatientTestOrderDetailResult,
  type TestResultDetailDto,
  type TestOrderCommentDto,
} from "../hooks/useTestOrders";
import { formatDate } from "../../../utils/formatDate";
import CreateTestResultModal from "./CreateTestResultModal";
import SyncTestResultModal from "./SyncTestResultModal";
import UpdateTestOrderStatusModal from "./UpdateTestOrderStatusModal";
import ModifyTestOrderModal from "./ModifyTestOrderModal";
import CommentFormModal from "./CommentFormModal";
import { useTestOrderComments } from "../hooks/useTestOrderComments";

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
  const {
    getTestOrderDetail,
    reviewTestOrder,
    deleteTestOrder,
    applyFlagging,
    exportTestOrders,
    printTestOrder,
  } = useTestOrders();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ViewPatientTestOrderDetailResult | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isCreateResultOpen,
    onOpen: onCreateResultOpen,
    onClose: onCreateResultClose,
  } = useDisclosure();
  const {
    isOpen: isSyncResultOpen,
    onOpen: onSyncResultOpen,
    onClose: onSyncResultClose,
  } = useDisclosure();
  const {
    isOpen: isStatusModalOpen,
    onOpen: onStatusModalOpen,
    onClose: onStatusModalClose,
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
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const {
    addComment,
    updateComment,
    deleteComment: deleteCommentApi,
    loading: commentLoading,
  } = useTestOrderComments();
  const [editingComment, setEditingComment] = useState<TestOrderCommentDto | null>(
    null
  );
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const handleScroll = (e: React.UIEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen && testOrderId) {
      loadDetail();
    }
  }, [isOpen, testOrderId]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const data = await getTestOrderDetail(testOrderId);
      setDetail(data);
    } catch (err) {
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async () => {
    setIsReviewing(true);
    try {
      await reviewTestOrder(testOrderId);
      await loadDetail(); // Reload để cập nhật status
      onSuccess?.();
    } catch (err) {
      // Error đã được xử lý trong hook
    } finally {
      setIsReviewing(false);
    }
  };

  const handleDeleteClick = () => {
    onDeleteOpen();
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTestOrder(testOrderId);
      onDeleteClose();
      onSuccess?.();
      onClose();
    } catch (err) {
      // Error đã được xử lý trong hook
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateResultSuccess = async () => {
    await loadDetail(); // Reload để hiển thị kết quả mới
    await onSuccess?.();
  };

  const handleSyncResultSuccess = async () => {
    await loadDetail();
    await onSuccess?.();
  };

  const handleStatusUpdated = async () => {
    await loadDetail();
    await onSuccess?.();
  };

  const handleModifySuccess = async () => {
    await loadDetail();
    await onSuccess?.();
  };

  const handleAddComment = async (content: string) => {
    if (!detail?.testOrder) return;
    try {
      await addComment(detail.testOrder.testOrderId, content);
      await loadDetail();
    } catch {
      // toast handled
    }
  };

  const handleEditComment = async (content: string) => {
    if (!detail?.testOrder || !editingComment) return;
    try {
      await updateComment(detail.testOrder.testOrderId, editingComment.commentId, content);
      setEditingComment(null);
      await loadDetail();
    } catch {
      // handled
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!detail?.testOrder) return;
    try {
      await deleteCommentApi(detail.testOrder.testOrderId, commentId);
      await loadDetail();
    } catch {
      // handled
    }
  };

  const handleApplyFlags = async () => {
    if (!detail?.testOrder) return;
    try {
      await applyFlagging(detail.testOrder.testOrderId);
      await loadDetail();
    } catch {
      // toast handled
    }
  };

  const handleExportExcel = () => {
    exportTestOrders(detail?.testOrder?.patientId);
  };

  const handleDownloadPdf = () => {
    if (!detail?.testOrder) return;
    printTestOrder(detail.testOrder.testOrderId, detail.testOrder.patientName);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "hoàn thành":
        return "green";
      case "pending":
      case "đang chờ":
        return "yellow";
      case "reviewed":
      case "đã review":
        return "blue";
      case "cancelled":
      case "đã hủy":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "Hoàn thành";
      case "pending":
        return "Đang chờ";
      case "reviewed":
        return "Đã review";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getFlagColor = (flag?: string) => {
    if (!flag) return "gray";
    switch (flag.toUpperCase()) {
      case "H":
      case "HIGH":
        return "red";
      case "L":
      case "LOW":
        return "blue";
      case "CRITICAL":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
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
                  Chi tiết đơn xét nghiệm
                </Text>
                <Text fontSize="sm" color="whiteAlpha.900" fontWeight="normal">
                  Thông tin đơn xét nghiệm và kết quả
                </Text>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" size="lg" _hover={{ bg: "whiteAlpha.200" }} />
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
                {/* Thông tin đơn xét nghiệm */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
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
                      Thông tin đơn xét nghiệm
                    </Text>
                    <Badge
                      colorScheme={getStatusColor(detail.testOrder.status)}
                      px={3}
                      py={1}
                      borderRadius="full"
                      ml="auto"
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
                      <Text color="gray.800" fontFamily="mono" fontSize="sm">
                        {detail.testOrder.testOrderId}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Mã bệnh nhân
                      </Text>
                      <Text color="gray.800" fontFamily="mono" fontSize="sm">
                        {detail.testOrder.patientId}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Tên bệnh nhân
                      </Text>
                      <Text color="gray.800">{detail.testOrder.patientName}</Text>
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
                        Số điện thoại
                      </Text>
                      <Text color="gray.800">{detail.testOrder.phoneNumber}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        Ngày tạo
                      </Text>
                      <Text color="gray.800">
                        {formatDate(detail.testOrder.createdAt, "dd/MM/yyyy HH:mm")}
                      </Text>
                    </Box>
                    {detail.testOrder.reviewedBy && (
                      <>
                        <Box>
                          <Text fontWeight="600" color="gray.600" fontSize="sm">
                            Người review
                          </Text>
                          <Text color="gray.800">{detail.testOrder.reviewedBy}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="600" color="gray.600" fontSize="sm">
                            Ngày review
                          </Text>
                          <Text color="gray.800">
                            {detail.testOrder.reviewedAt
                              ? formatDate(detail.testOrder.reviewedAt, "dd/MM/yyyy HH:mm")
                              : "N/A"}
                          </Text>
                        </Box>
                      </>
                    )}
                  </SimpleGrid>
                </MotionBox>

                {/* Kết quả xét nghiệm */}
                {detail.testResults && detail.testResults.length > 0 && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    bg={bgColor}
                    p={6}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <HStack mb={4} spacing={3}>
                      <Box
                        p={2}
                        bgGradient="linear(to-r, green.400, teal.500)"
                        borderRadius="lg"
                      >
                        <Icon as={FiActivity} boxSize={5} color="white" />
                      </Box>
                      <Text fontSize="lg" fontWeight="bold" color="gray.800">
                        Kết quả xét nghiệm
                      </Text>
                    </HStack>
                    <Divider mb={4} />
                    <Box overflowX="auto">
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr bg="gray.100">
                            <Th>Tên xét nghiệm</Th>
                            <Th>Giá trị</Th>
                            <Th>Đơn vị</Th>
                            <Th>Khoảng tham chiếu</Th>
                            <Th>Flag</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {detail.testResults.map((result: TestResultDetailDto) => (
                            <Tr key={result.resultId}>
                              <Td fontWeight="medium">{result.testName}</Td>
                              <Td>
                                <Text fontWeight="bold">{result.value}</Text>
                              </Td>
                              <Td>{result.unit || "N/A"}</Td>
                              <Td>{result.referenceRange || "N/A"}</Td>
                              <Td>
                                {result.flag && (
                                  <Badge
                                    colorScheme={getFlagColor(result.flag)}
                                    px={2}
                                    py={1}
                                    borderRadius="full"
                                  >
                                    {result.flag}
                                  </Badge>
                                )}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </MotionBox>
                )}
                {(!detail.testResults || detail.testResults.length === 0) && (
                  <MotionBox
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    bg={bgColor}
                    p={6}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Text color="gray.500" fontStyle="italic">
                      Chưa có kết quả xét nghiệm.
                    </Text>
                  </MotionBox>
                )}

                {/* Comments */}
                {detail.comments && detail.comments.length > 0 && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    bg={bgColor}
                    p={6}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <HStack mb={4} spacing={3}>
                      <Icon as={FiFileText} boxSize={5} color="gray.600" />
                      <Text fontSize="lg" fontWeight="bold" color="gray.800">
                        Ghi chú
                      </Text>
                    </HStack>
                    <Divider mb={4} />
                    <VStack spacing={3} align="stretch">
                      {detail.comments.map((comment) => (
                        <Box
                          key={comment.commentId}
                          p={4}
                          bg="gray.50"
                          borderRadius="md"
                          borderLeft="4px"
                          borderColor="purple.400"
                        >
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            {(comment.createdBy || comment.userName || "Unknown").toString()} -{" "}
                            {formatDate(comment.createdAt, "dd/MM/yyyy HH:mm")}
                          </Text>
                          <Text color="gray.800">{comment.content}</Text>
                          <HStack justify="flex-end" spacing={2} mt={2}>
                            <Button
                              size="xs"
                              variant="ghost"
                              leftIcon={<FiEdit />}
                              onClick={() => {
                                setEditingComment(comment);
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
                              onClick={() => handleDeleteComment(comment.commentId)}
                            >
                              Xóa
                            </Button>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </MotionBox>
                )}
                {(!detail.comments || detail.comments.length === 0) && (
                  <Box
                    bg={bgColor}
                    p={6}
                    borderRadius="lg"
                    border="1px dashed"
                    borderColor="gray.200"
                    textAlign="center"
                  >
                    <Text color="gray.500">Chưa có bình luận nào.</Text>
                  </Box>
                )}
              </VStack>
            ) : (
              <Box p={8} textAlign="center">
                <Text color="gray.500">Không thể tải thông tin chi tiết</Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter
            bg="gray.50"
            borderTop="1px"
            borderColor={borderColor}
            flexShrink={0}
          >
            <HStack spacing={3} flexWrap="wrap">
              {detail?.testOrder &&
                detail.testOrder.status?.toLowerCase() !== "completed" && (
                  <Button
                    leftIcon={<FiActivity />}
                    colorScheme="green"
                    onClick={onCreateResultOpen}
                  >
                    Nhập kết quả
                  </Button>
                )}
              <Button
                leftIcon={<FiRefreshCw />}
                variant="outline"
                colorScheme="teal"
                onClick={onSyncResultOpen}
              >
                Đồng bộ kết quả
              </Button>
              {detail?.testOrder &&
                detail.testOrder.status?.toLowerCase() === "completed" &&
                !detail.testOrder.reviewedBy && (
                  <Button
                    leftIcon={<FiCheckCircle />}
                    colorScheme="blue"
                    onClick={handleReview}
                    isLoading={isReviewing}
                    loadingText="Đang review..."
                  >
                    Review
                  </Button>
                )}
              <Button variant="outline" colorScheme="gray" onClick={onClose}>
                Đóng
              </Button>
              {detail?.testOrder && (
                <Button
                  leftIcon={<FiTrash2 />}
                  colorScheme="red"
                  variant="outline"
                  onClick={handleDeleteClick}
                  isDisabled={isDeleting}
                >
                  Xóa
                </Button>
              )}
              {detail?.testOrder && (
                <>
                  <Button
                    leftIcon={<FiUpload />}
                    colorScheme="green"
                    variant="outline"
                    onClick={handleExportExcel}
                  >
                    Xuất Excel
                  </Button>
                  <Button
                    leftIcon={<FiPrinter />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={handleDownloadPdf}
                  >
                    In PDF
                  </Button>
                </>
              )}
              <Button
                leftIcon={<FiMessageSquare />}
                variant="outline"
                onClick={onCommentModalOpen}
              >
                Thêm bình luận
              </Button>
              <ButtonGroup size="sm" variant="outline">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    aria-label="Thao tác khác"
                  />
                  <MenuList>
                    <MenuItem
                      icon={<FiEdit />}
                      onClick={onModifyModalOpen}
                      isDisabled={!detail?.testOrder}
                    >
                      Chỉnh sửa đơn
                    </MenuItem>
                    <MenuItem
                      icon={<FiRefreshCw />}
                      onClick={onStatusModalOpen}
                      isDisabled={!detail?.testOrder}
                    >
                      Cập nhật trạng thái
                    </MenuItem>
                    <MenuItem
                      icon={<FiFlag />}
                      onClick={handleApplyFlags}
                      isDisabled={!detail?.testResults?.length}
                    >
                      Áp dụng flag
                    </MenuItem>
                  </MenuList>
                </Menu>
              </ButtonGroup>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* AlertDialog xác nhận xóa */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xác nhận xóa đơn xét nghiệm
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc chắn muốn xóa đơn xét nghiệm này? Hành động này không thể hoàn tác.
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
                loadingText="Đang xóa..."
              >
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Modal nhập kết quả xét nghiệm */}
      {detail?.testOrder && (
        <CreateTestResultModal
          isOpen={isCreateResultOpen}
          onClose={onCreateResultClose}
          testOrderId={testOrderId}
          patientId={detail.testOrder.patientId}
          onSuccess={handleCreateResultSuccess}
        />
      )}
      {detail?.testOrder && (
        <SyncTestResultModal
          isOpen={isSyncResultOpen}
          onClose={onSyncResultClose}
          testOrderId={testOrderId}
          onSuccess={handleSyncResultSuccess}
        />
      )}
      {detail?.testOrder && (
        <UpdateTestOrderStatusModal
          isOpen={isStatusModalOpen}
          onClose={onStatusModalClose}
          testOrderId={testOrderId}
          currentStatus={detail.testOrder.status}
          onSuccess={handleStatusUpdated}
        />
      )}
      <ModifyTestOrderModal
        isOpen={isModifyModalOpen}
        onClose={onModifyModalClose}
        testOrder={detail?.testOrder ?? null}
        onSuccess={handleModifySuccess}
      />
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

