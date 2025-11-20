import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import type { FlaggingSetConfig } from "../hooks/useFlaggingSets";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (payload: {
    testName: string;
    lowThreshold?: number | null;
    highThreshold?: number | null;
    criticalThreshold?: number | null;
    version?: string;
  }) => Promise<void> | void;
  isSubmitting?: boolean;
  defaultValues?: FlaggingSetConfig | null;
}

const FlaggingSetFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  isSubmitting,
  defaultValues,
}) => {
  const [form, setForm] = useState({
    testName: "",
    lowThreshold: "",
    highThreshold: "",
    criticalThreshold: "",
    version: "1.0",
  });

  useEffect(() => {
    if (defaultValues && isOpen) {
      setForm({
        testName: defaultValues.testName ?? "",
        lowThreshold:
          defaultValues.lowThreshold !== undefined &&
          defaultValues.lowThreshold !== null
            ? String(defaultValues.lowThreshold)
            : "",
        highThreshold:
          defaultValues.highThreshold !== undefined &&
          defaultValues.highThreshold !== null
            ? String(defaultValues.highThreshold)
            : "",
        criticalThreshold:
          defaultValues.criticalThreshold !== undefined &&
          defaultValues.criticalThreshold !== null
            ? String(defaultValues.criticalThreshold)
            : "",
        version: defaultValues.version ?? "1.0",
      });
    } else if (!defaultValues && isOpen) {
      setForm({
        testName: "",
        lowThreshold: "",
        highThreshold: "",
        criticalThreshold: "",
        version: "1.0",
      });
    }
  }, [defaultValues, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const parseNumber = (value: string) =>
    value.trim() === "" ? undefined : Number(value);

  const handleSubmit = async () => {
    if (!form.testName.trim()) return;
    await onSubmit({
      testName: form.testName.trim(),
      lowThreshold: parseNumber(form.lowThreshold),
      highThreshold: parseNumber(form.highThreshold),
      criticalThreshold: parseNumber(form.criticalThreshold),
      version: form.version?.trim() || undefined,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="2xl" boxShadow="2xl">
        <ModalHeader
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          borderTopRadius="2xl"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired gridColumn={{ base: "1 / -1", md: "span 2" }}>
              <FormLabel>Tên xét nghiệm</FormLabel>
              <Input
                name="testName"
                value={form.testName}
                onChange={handleChange}
                placeholder="Ví dụ: Hemoglobin"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ngưỡng thấp</FormLabel>
              <Input
                type="number"
                name="lowThreshold"
                value={form.lowThreshold}
                onChange={handleChange}
                placeholder="Ví dụ: 11.5"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ngưỡng cao</FormLabel>
              <Input
                type="number"
                name="highThreshold"
                value={form.highThreshold}
                onChange={handleChange}
                placeholder="Ví dụ: 15"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ngưỡng cảnh báo</FormLabel>
              <Input
                type="number"
                name="criticalThreshold"
                value={form.criticalThreshold}
                onChange={handleChange}
                placeholder="Ví dụ: 8"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Version</FormLabel>
              <Input
                name="version"
                value={form.version}
                onChange={handleChange}
                placeholder="1.0"
              />
            </FormControl>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={onClose}>
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

export default FlaggingSetFormModal;


