import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { patientApi } from "../api/patientApi";

// 🧠 Định nghĩa kiểu dữ liệu Patient
interface Patient {
  fullName: string;
  dateOfBirth: string;
  identifyNumber?: string;
  address?: string;
  email?: string;
  gender: string;
  phoneNumber: string;
  userId: string;
  lastTestDate?: string;
}

// 🧠 Đây chính là interface bạn hỏi: CreateMedicalRecordRequest
export interface CreateMedicalRecordRequest {
  patient: Patient;
  doctorId: string;
  createdBy: string;
  clinicalNotes?: string;
  diagnosis?: string;
}

// 🧠 Interface cho dữ liệu MedicalRecord (khi load từ API)
export interface MedicalRecord {
  recordId: string;
  patientId: string;
  clinicalNotes: string;
  diagnosis: string;
  doctorId: string;
  createdBy: string;
  createdAt: string;
  patient?: Patient;
}

// 🧠 Custom hook chứa toàn bộ logic gọi API
export const usePatientMedicalRecords = () => {
  const toast = useToast();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await patientApi.getAllMedicalRecords();
      setRecords(res.data);
    } catch (err: any) {
      toast({
        title: "Lỗi tải dữ liệu",
        description: err.response?.data?.message || "Không thể tải danh sách hồ sơ.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (form: CreateMedicalRecordRequest) => {
    try {
      await patientApi.createMedicalRecord(form);
      toast({
        title: "Thành công",
        description: "Tạo hồ sơ bệnh nhân thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchRecords();
    } catch (err: any) {
      toast({
        title: "Tạo thất bại",
        description: err.response?.data?.message || "Không thể tạo hồ sơ.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    loading,
    fetchRecords,
    createRecord,
  };
};
