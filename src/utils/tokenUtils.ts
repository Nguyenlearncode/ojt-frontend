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
    // Validate token format
    if (!token || typeof token !== 'string') {
      return null;
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    return jwtDecode<JwtPayload>(token);
  } catch (error: any) {
    // Clear invalid token
    if (error?.message?.includes('Base-64') || error?.message?.includes('Invalid token')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return null;
  }
};

export const getCurrentUserId = (): string | null => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token || token.trim() === '') return null;
    
    const decoded = decodeToken(token);
    return decoded?.sub ?? null;
  } catch (error) {
    return null;
  }
};
