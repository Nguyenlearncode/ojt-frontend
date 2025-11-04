// Chuyển giá trị DB (male/female/other) → text hiển thị
export const formatGender = (gender?: string): string => {
  switch (gender?.toLowerCase()) {
    case "male":
      return "Nam";
    case "female":
      return "Nữ";
    default:
      return "Không xác định";
  }
};

// Chuyển ngược lại khi submit form (text → DB format)
export const parseGender = (genderLabel: string): string => {
  switch (genderLabel.toLowerCase()) {
    case "nam":
      return "male";
    case "nữ":
      return "female";
    default:
      return "other";
  }
};
