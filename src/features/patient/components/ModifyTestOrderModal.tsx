import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useTestOrders } from "../hooks/useTestOrders";
import type { TestOrderDetailDto } from "../hooks/useTestOrders";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testOrder?: TestOrderDetailDto | null;
  onSuccess?: () => void | Promise<void>;
}

const ModifyTestOrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  testOrder,
  onSuccess,
}) => {
  const { modifyTestOrder } = useTestOrders();
  const [form, setForm] = useState({
    patientName: "",
    dateOfBirth: "",
    age: 0,
    gender: "male",
    address: "",
    phoneNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (testOrder) {
      setForm({
        patientName: testOrder.patientName,
        dateOfBirth: testOrder.dateOfBirth
          ? testOrder.dateOfBirth.substring(0, 10)
          : "",
        age: testOrder.age,
        gender: testOrder.gender?.toLowerCase() ?? "male",
        address: testOrder.address ?? "",
        phoneNumber: testOrder.phoneNumber ?? "",
      });
    }
  }, [testOrder]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "age"
          ? Number(value) || 0
          : name === "gender"
          ? value.toLowerCase()
          : value,
    }));
  };

  const handleSubmit = async () => {
    if (!testOrder) return;
    setSubmitting(true);
    try {
      await modifyTestOrder(testOrder.testOrderId, {
        patientName: form.patientName,
        dateOfBirth: form.dateOfBirth,
        age: form.age,
        gender: form.gender,
        address: form.address,
        phoneNumber: form.phoneNumber,
      });
      await onSuccess?.();
      onClose();
    } catch {
      // handled
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chỉnh sửa thông tin đơn</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Họ tên bệnh nhân</FormLabel>
              <Input
                name="patientName"
                value={form.patientName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Ngày sinh</FormLabel>
              <Input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tuổi</FormLabel>
              <Input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Giới tính</FormLabel>
              <Select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Địa chỉ</FormLabel>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Số điện thoại</FormLabel>
              <Input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </FormControl>
          </SimpleGrid>
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

export default ModifyTestOrderModal;


