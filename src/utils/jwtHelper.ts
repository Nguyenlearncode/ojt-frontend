import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
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
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserInfo = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  return decodeToken(token);
};