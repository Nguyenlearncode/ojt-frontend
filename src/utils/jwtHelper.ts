import { jwtDecode } from 'jwt-decode';

export interface PrivilegeInfo {
  privilegeId: number;
  privilegeName: string;
  description: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  FullName: string;
  RoleCode: string;
  Privilege?: string[] | string; // Can be array of strings OR JSON string
  exp: number;
  iss: string;
  aud: string;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    // Validate token format (JWT có 3 parts separated by dots)
    if (!token || typeof token !== 'string') {
      console.warn('Invalid token: token is not a string');
      return null;
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid token format: JWT should have 3 parts');
      return null;
    }
    
    // Try to decode
    return jwtDecode<JwtPayload>(token);
  } catch (error: any) {
    console.error('Error decoding token:', error);
    // Nếu token không hợp lệ, clear nó khỏi localStorage
    if (error?.message?.includes('Base-64') || error?.message?.includes('Invalid token')) {
      console.warn('Invalid token detected, clearing from localStorage');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return null;
  }
};

export const getUserInfo = () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    
    // Validate token trước khi decode
    if (token.trim() === '') {
      console.warn('Empty token found');
      localStorage.removeItem('accessToken');
      return null;
    }
    
    return decodeToken(token);
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

export const getUserPrivileges = (): PrivilegeInfo[] => {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.Privilege) return [];
  
  try {
    // If Privilege is already an array of strings
    if (Array.isArray(userInfo.Privilege)) {
      return userInfo.Privilege.map((name, index) => ({
        privilegeId: index + 1,
        privilegeName: name,
        description: name
      }));
    }
    
    // If Privilege is a JSON string, parse it
    if (typeof userInfo.Privilege === 'string') {
      const privileges = JSON.parse(userInfo.Privilege);
      if (Array.isArray(privileges)) {
        // If parsed result is array of strings
        if (typeof privileges[0] === 'string') {
          return privileges.map((name, index) => ({
            privilegeId: index + 1,
            privilegeName: name,
            description: name
          }));
        }
        // If parsed result is array of objects
        return privileges;
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error parsing privileges:', error);
    return [];
  }
};