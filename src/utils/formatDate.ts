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

// ✅ Convert date từ yyyy-MM-dd (input type="date") sang MM/DD/YYYY (backend yêu cầu)
export const convertToMMDDYYYY = (dateString?: string): string => {
  if (!dateString) return "";
  
  // Nếu đã là format MM/DD/YYYY hoặc dd/MM/yyyy thì giữ nguyên
  if (dateString.includes("/")) {
    // Kiểm tra xem có phải MM/DD/YYYY không
    const parts = dateString.split("/");
    if (parts.length === 3) {
      // Nếu phần đầu <= 12 thì có thể là MM/DD/YYYY
      if (parseInt(parts[0]) <= 12) {
        return dateString; // Đã đúng format
      }
      // Nếu không, convert từ dd/MM/yyyy sang MM/DD/YYYY
      return `${parts[1]}/${parts[0]}/${parts[2]}`;
    }
  }
  
  // Nếu là yyyy-MM-dd (từ input type="date")
  if (dateString.includes("-")) {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  }
  
  // Fallback: parse như Date object
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
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
