// src/utils/genderUtils.ts
export function formatGender(gender?: string | null): string {
  if (!gender) return "N/A";
  const normalized = gender.trim().toLowerCase();

  switch (normalized) {
    case "male":
      return "Nam";
    case "female":
      return "Nữ";
    default:
      return gender; // nếu có giá trị khác (VD: "Other"), vẫn hiển thị nguyên văn
  }
}
