// src/utils/calcAge.ts
/**
 * 🧮 Tính tuổi từ ngày sinh, hỗ trợ nhiều định dạng:
 * - yyyy-MM-dd (ISO)
 * - dd/MM/yyyy (VN)
 * - MM/dd/yyyy (US)
 */
export const calcAge = (dob?: string): number => {
  if (!dob) return 0;

  let year = 0, month = 0, day = 0;

  // ✅ yyyy-MM-dd hoặc yyyy/MM/dd
  if (dob.includes("-")) {
    const [y, m, d] = dob.split("-").map(Number);
    year = y; month = m; day = d;
  }
  // ✅ dd/MM/yyyy hoặc MM/dd/yyyy
  else if (dob.includes("/")) {
    const parts = dob.split("/").map(Number);
    // Nếu phần đầu > 12 => chắc chắn là dd/MM/yyyy
    if (parts[0] > 12) {
      day = parts[0]; month = parts[1]; year = parts[2];
    } else {
      // Nếu phần đầu <= 12 => giả định là MM/dd/yyyy
      month = parts[0]; day = parts[1]; year = parts[2];
    }
  }

  if (!year || !month || !day) return 0;
  const birth = new Date(year, month - 1, day);
  if (isNaN(birth.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;

  return age > 0 ? age : 0;
};
