// src/utils/formatDate.ts
export const formatDate = (
  dateString?: string,
  format: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd" | "dd/MM/yyyy HH:mm" = "dd/MM/yyyy"
): string => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  switch (format) {
    case "MM/dd/yyyy":
      return `${month}/${day}/${year}`;

    case "yyyy-MM-dd":
      return `${year}-${month}-${day}`;

    /* ⭐ THÊM CASE MỚI Ở ĐÚNG VỊ TRÍ — GIỮ NGUYÊN CODE CŨ ⭐ */
    case "dd/MM/yyyy HH:mm":
      return `${day}/${month}/${year} ${hour}:${minute}`;

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
  return `${y}-${m}-${d}`;
};

// ✅ Convert yyyy-MM-dd → MM/DD/YYYY
export const convertToMMDDYYYY = (dateString?: string): string => {
  if (!dateString) return "";

  if (dateString.includes("/")) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      if (parseInt(parts[0]) <= 12) return dateString;
      return `${parts[1]}/${parts[0]}/${parts[2]}`;
    }
  }

  if (dateString.includes("-")) {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const y = date.getFullYear();

  return `${m}/${d}/${y}`;
};

// ✅ Dùng cho hiển thị ngày + giờ
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
