import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;       // ✅ Đây là userId (GUID)
  email: string;
  FullName: string;
  RoleCode: string;
  exp: number;
  iss: string;
  aud: string;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Decode token failed:", error);
    return null;
  }
};

export const getCurrentUserId = (): string | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded?.sub ?? null;
};
