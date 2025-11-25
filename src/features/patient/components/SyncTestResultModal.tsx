import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useTestOrderResults } from "../hooks/useTestOrderResults";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testOrderId: string;
  onSuccess?: () => void | Promise<void>;
}

const SyncTestResultModal: React.FC<Props> = ({
  isOpen,
  onClose,
  testOrderId,
  onSuccess,
}) => {
  const { createTestOrderResult, loading } = useTestOrderResults();
  const [form, setForm] = useState({
    testName: "",
    value: "",
    referenceRange: "",
    interpretation: "",
    instrumentUsed: "",
    flag: "Normal",
  });

  const reset = () =>
    setForm({
      testName: "",
      value: "",
      referenceRange: "",
      interpretation: "",
      instrumentUsed: "",
      flag: "Normal",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.testName || !form.value) return;
    try {
      // use the hook's exported function signature (adjusted to accept patientId/testOrderId)
      await createTestOrderResult({ patientId: testOrderId, testOrderId });
      await onSuccess?.();
      reset();
      onClose();
    } catch {
      // toast handled
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đồng bộ kết quả xét nghiệm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Tên xét nghiệm</FormLabel>
              <Input
                name="testName"
                value={form.testName}
                onChange={handleChange}
                placeholder="VD: Hemoglobin"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Giá trị</FormLabel>
              <Input
                name="value"
                value={form.value}
                onChange={handleChange}
                placeholder="VD: 12.5"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Khoảng tham chiếu</FormLabel>
              <Input
                name="referenceRange"
                value={form.referenceRange}
                onChange={handleChange}
                placeholder="VD: 12 - 16"
              />
            </FormControl>
            <HStack spacing={4} w="full">
              <FormControl>
                <FormLabel>Interpretation</FormLabel>
                <Input
                  name="interpretation"
                  value={form.interpretation}
                  onChange={handleChange}
                  placeholder="Nhận xét"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Máy xét nghiệm</FormLabel>
                <Input
                  name="instrumentUsed"
                  value={form.instrumentUsed}
                  onChange={handleChange}
                  placeholder="Instrument"
                />
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Flag</FormLabel>
              <Select name="flag" value={form.flag} onChange={handleChange}>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Critical">Critical</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Hủy
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Đồng bộ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SyncTestResultModal;



