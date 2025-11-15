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
      console.warn('Invalid token: token is not a string');
      return null;
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid token format: JWT should have 3 parts');
      return null;
    }
    
    return jwtDecode<JwtPayload>(token);
  } catch (error: any) {
    console.error("Decode token failed:", error);
    // Clear invalid token
    if (error?.message?.includes('Base-64') || error?.message?.includes('Invalid token')) {
      console.warn('Invalid token detected, clearing from localStorage');
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
    console.error('Error getting current user ID:', error);
    return null;
  }
};
