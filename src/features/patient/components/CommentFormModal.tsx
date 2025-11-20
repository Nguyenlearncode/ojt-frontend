import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Button,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: string;
  title: string;
  onSubmit: (content: string) => void | Promise<void>;
  isSubmitting?: boolean;
}

const CommentFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialValue = "",
  title,
  onSubmit,
  isSubmitting,
}) => {
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    if (isOpen) {
      setContent(initialValue);
    }
  }, [initialValue, isOpen]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await onSubmit(content.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập nội dung bình luận..."
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Hủy
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentFormModal;



