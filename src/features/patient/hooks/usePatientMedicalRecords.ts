import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { patientApi } from "../api/patientApi";
import { getUserInfo } from "../../../utils/jwtHelper";
import { convertToMMDDYYYY } from "../../../utils/formatDate";

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

// 🧠 Interface cho dữ liệu từ API getAllMedicalRecords (ListPatientDto)
export interface ListPatientDto {
  patientId: string;
  fullName: string;
  dateOfBirth: string;
  lastTestDate?: string | null;
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
  const [records, setRecords] = useState<ListPatientDto[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await patientApi.getAllMedicalRecords();
      // ApiResponse { statusCode, message, data, responsedAt }
      // API trả về List<ListPatientDto?> với cấu trúc: { patientId, fullName, dateOfBirth, lastTestDate }
      console.log("📥 API Response:", res);
      console.log("📦 Records data:", res?.data);
      const recordsData = (res?.data ?? []).filter((item): item is ListPatientDto => item !== null);
      console.log("📋 Processed records:", recordsData);
      setRecords(recordsData);
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
      const user = getUserInfo();
      
      // Convert gender to lowercase (backend yêu cầu 'male' hoặc 'female')
      const genderLower = form.patient.gender?.toLowerCase() || "male";
      const normalizedGender = genderLower === "male" || genderLower === "female" 
        ? genderLower 
        : "male";
      
      // Convert dateOfBirth to MM/DD/YYYY format (backend yêu cầu)
      const dateOfBirth = convertToMMDDYYYY(form.patient.dateOfBirth);
      
      // Tạo patient object, chỉ include các field có giá trị
      const patientData: any = {
        fullName: form.patient.fullName,
        dateOfBirth: dateOfBirth,
        gender: normalizedGender,
        phoneNumber: form.patient.phoneNumber,
      };
      
      // Chỉ thêm optional fields nếu có giá trị
      if (form.patient.userId || user?.sub) {
        patientData.userId = form.patient.userId || user?.sub;
      }
      if (form.patient.email && form.patient.email.trim() !== "") {
        patientData.email = form.patient.email;
      }
      if (form.patient.address && form.patient.address.trim() !== "") {
        patientData.address = form.patient.address;
      }
      if (form.patient.identifyNumber && form.patient.identifyNumber.trim() !== "") {
        patientData.identifyNumber = form.patient.identifyNumber;
      }
      // LastTestDate - không gửi nếu không có giá trị (backend đã xóa validator)
      
      const ensured = {
        patient: patientData,
        createdBy: form.createdBy || user?.sub || "",
        // Note: diagnosis và clinicalNotes không được backend hỗ trợ
        // Các trường này đã bị comment out trong entity PatientMedicalRecord
      };

      await patientApi.createMedicalRecord(ensured);
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
