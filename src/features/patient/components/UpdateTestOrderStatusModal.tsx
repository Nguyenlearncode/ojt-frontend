import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useTestOrders } from "../hooks/useTestOrders";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testOrderId: string;
  currentStatus: string;
  onSuccess?: () => void | Promise<void>;
}

const STATUS_OPTIONS = ["Pending", "Completed", "Reviewed", "Cancelled"];

const UpdateTestOrderStatusModal: React.FC<Props> = ({
  isOpen,
  onClose,
  testOrderId,
  currentStatus,
  onSuccess,
}) => {
  const { updateTestOrderStatus } = useTestOrders();
  const [status, setStatus] = useState(currentStatus);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateTestOrderStatus(testOrderId, status);
      await onSuccess?.();
      onClose();
    } catch {
      // toast handled
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cập nhật trạng thái đơn</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup value={status} onChange={setStatus}>
            <Stack direction="column" spacing={3}>
              {STATUS_OPTIONS.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={submitting}
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTestOrderStatusModal;



