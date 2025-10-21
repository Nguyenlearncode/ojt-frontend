// src/utils/formatGender.ts

// Chuyển giá trị DB (Male/Female/Other) → text hiển thị
export const formatGender = (gender?: string): string => {
  switch (gender?.toLowerCase()) {
    case "male":
      return "Nam";
    case "female":
      return "Nữ";
    case "other":
      return "Khác";
    default:
      return "Không xác định";
  }
};

// Chuyển ngược lại khi submit form (text → DB format)
export const parseGender = (genderLabel: string): string => {
  switch (genderLabel.toLowerCase()) {
    case "nam":
      return "Male";
    case "nữ":
      return "Female";
    case "khác":
      return "Other";
    default:
      return "";
  }
};
