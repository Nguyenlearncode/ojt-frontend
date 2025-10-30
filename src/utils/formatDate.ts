// src/utils/formatDate.ts
export const formatDate = (
  dateString?: string,
  format: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd" = "dd/MM/yyyy"
): string => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  switch (format) {
    case "MM/dd/yyyy":
      return `${month}/${day}/${year}`;
    case "yyyy-MM-dd":
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

// ✅ Format để truyền vào input type="date"
export const toInputDateFormat = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

// ✅ Dành riêng để gửi API (đảm bảo không kèm 'T' hoặc timezone)
export const normalizeDateForApi = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`; // ✅ chuẩn "yyyy-MM-dd"
};

// ✅ Dùng cho hiển thị ngày + giờ (log, report)
export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
