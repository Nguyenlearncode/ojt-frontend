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
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    return null;
  }
};

export const getUserInfo = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  return decodeToken(token);
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