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
  phoneNumber?: string | null;
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

// 🧠 Interface cho Update Medical Record Request
export interface UpdateMedicalRecordRequest {
  patient: Patient;
  updatedBy: string;
}

// 🧠 Interface cho View Medical Record Detail Response
export interface ViewMedicalRecordDetailResponse {
  patientId: string;
  patientName: string;
  dateOfBirth: string;
  phoneNumber: string;
  testOrders: TestOrderResponse[];
}

export interface TestOrderResponse {
  testOrderId: string;
  orderDate: string;
  status: string;
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
      // axiosClient interceptor đã return response.data, nên res đã là data rồi
      // Backend trả về ApiResponse<List<ListPatientDto?>>, nên res có cấu trúc:
      // { statusCode, message, data: [...records...], responsedAt }
      // Nếu res là array (đã unwrap), return luôn
      if (Array.isArray(res)) {
        const recordsData = res.filter((item): item is ListPatientDto => item !== null);
        setRecords(recordsData);
        return;
      }
      // Nếu res có cấu trúc ApiResponse, lấy data
      if (res?.data && Array.isArray(res.data)) {
        const recordsData = res.data.filter((item): item is ListPatientDto => item !== null);
        setRecords(recordsData);
        return;
      }
      // Nếu không có data, set empty array
      setRecords([]);
    } catch (err: any) {
      // Error từ backend: err.response.data đã được unwrap bởi interceptor
      // Nếu error response có cấu trúc ApiResponse, message nằm trong err.response.data.message
      // Nếu error response đã được unwrap, message có thể nằm trong err.response.data hoặc err.message
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.Message 
        || err.message 
        || "Không thể tải danh sách hồ sơ.";
      
      toast({
        title: "Lỗi tải dữ liệu",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setRecords([]); // Set empty array khi có lỗi
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

    const updateRecord = async (patientId: string, form: UpdateMedicalRecordRequest) => {
    try {
      const user = getUserInfo();
      
      // Convert gender to lowercase (backend yêu cầu 'male' hoặc 'female')
      const genderLower = form.patient.gender?.toLowerCase() || "male";
      const normalizedGender = genderLower === "male" || genderLower === "female" 
        ? genderLower 
        : "male";
      
      // Convert dateOfBirth to MM/DD/YYYY format (backend yêu cầu)
      const dateOfBirth = convertToMMDDYYYY(form.patient.dateOfBirth);
      
      // Convert lastTestDate to MM/DD/YYYY format nếu có
      const lastTestDate = form.patient.lastTestDate 
        ? convertToMMDDYYYY(form.patient.lastTestDate) 
        : undefined;
      
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
      if (lastTestDate && lastTestDate.trim() !== "") {
        patientData.lastTestDate = lastTestDate;
      }
      
      const updateData = {
        patient: patientData,
        updatedBy: form.updatedBy || user?.sub || "",
      };

      await patientApi.updateMedicalRecord(patientId, updateData);
      toast({
        title: "Thành công",
        description: "Cập nhật hồ sơ bệnh nhân thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchRecords();
    } catch (err: any) {
      toast({
        title: "Cập nhật thất bại",
        description: err.response?.data?.message || "Không thể cập nhật hồ sơ.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const deleteRecord = async (patientId: string) => {
    try {
      const user = getUserInfo();
      const deletedBy = user?.sub || "";
      
      if (!deletedBy) {
        toast({
          title: "Lỗi",
          description: "Không thể xác định người dùng.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      await patientApi.deleteMedicalRecord(patientId, deletedBy);
      toast({
        title: "Thành công",
        description: "Xóa hồ sơ bệnh nhân thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchRecords();
    } catch (err: any) {
      toast({
        title: "Xóa thất bại",
        description: err.response?.data?.message || "Không thể xóa hồ sơ.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err;
    }
  };

  const getRecordDetail = async (patientId: string): Promise<ViewMedicalRecordDetailResponse> => {
    try {
      const res = await patientApi.getMedicalRecordDetail(patientId);
      
      // Handle response structure (ApiResponse or direct data)
      // Backend returns ApiResponse<ViewMedicalRecordDetailResponse>
      // axiosClient interceptor may unwrap response.data
      if (res?.data?.data) {
        // ApiResponse wrapper: { statusCode, message, data: ViewMedicalRecordDetailResponse, ... }
        return res.data.data;
      }
      if (res?.data) {
        // Already unwrapped or direct data
        return res.data;
      }
      // Fallback: if res is already the data (unwrapped by interceptor)
      return res as unknown as ViewMedicalRecordDetailResponse;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.Message 
        || err.message 
        || "Không thể tải chi tiết hồ sơ.";
      
      toast({
        title: "Lỗi tải dữ liệu",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw err;
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
    updateRecord,
    deleteRecord,
    getRecordDetail,
  };
};
