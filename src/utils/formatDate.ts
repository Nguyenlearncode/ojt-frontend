// src/utils/formatDate.ts
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Format chuẩn "DD/MM/YYYY"
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Format để truyền vào input type="date" (YYYY-MM-DD)
export const toInputDateFormat = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

// Format hiển thị ngày + giờ (dùng cho log, report)
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
