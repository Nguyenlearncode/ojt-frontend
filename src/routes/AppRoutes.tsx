// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPageChakra from "../features/auth/pages/LoginPageChakra";
import ForgotPasswordPageChakra from "../features/auth/pages/ForgotPasswordPageChakra";
import ResetPasswordPageChakra from "../features/auth/pages/ResetPasswordPageChakra";
import DashboardChakra from "../features/dashboard/pages/DashboardChakra";
import UpdateUserProfileChakra from "../features/user/pages/UpdateUserProfileChakra";
import CreateUserChakra from "../features/user/pages/CreateUserChakra";
import UserManagementPageChakra from "../features/user/pages/UserManagementPageChakra";
import RoleManagementPageChakra from "../features/role/pages/RoleManagementPageChakra";
import CreateRolePageChakra from "../features/role/pages/CreateRolePageChakra";
import UpdateRolePageChakra from "../features/role/pages/UpdateRolePageChakra";
import ProfilePageChakra from "../features/user/pages/ProfilePageChakra";

import PrivateRoute from "./PrivateRoute";
import DashboardLayoutChakra from "../layouts/DashboardLayoutChakra";

import PatientMedicalRecordPageChakra from "../features/patient/pages/PatientMedicalRecordPageChakra";
import FlaggingSetManagementPage from "../features/flagging/pages/FlaggingSetManagementPage";
import TestOrdersPage from "../features/patient/pages/TestOrdersPage";
import HomePage from "../pages/HomePage";

import ChakraLayout from "../layouts/ChakraLayout";
import { CBC, SinhHoa, TimMach } from "../pages/Services/ServiceDetail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      
      {/* ⭐ HomePage – KHÔNG dùng Chakra */}
      <Route path="/" element={<HomePage />} />
      <Route path="/service/cbc" element={<CBC />} />
      <Route path="/service/sinh-hoa" element={<SinhHoa />} />
      <Route path="/service/tim-mach" element={<TimMach />} />

      {/* ⭐ Login + Auth pages – DÙNG Chakra nên bọc */}
      <Route
        path="/login"
        element={
          <ChakraLayout>
            <LoginPageChakra />
          </ChakraLayout>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <ChakraLayout>
            <ForgotPasswordPageChakra />
          </ChakraLayout>
        }
      />

      <Route
        path="/reset-password"
        element={
          <ChakraLayout>
            <ResetPasswordPageChakra />
          </ChakraLayout>
        }
      />

      {/* ⭐ Protected routes – tất cả đều dùng Chakra */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <DashboardChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      {/* Các route còn lại giữ nguyên nhưng thêm ChakraLayout */}
      <Route
        path="/UserManagement"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <UserManagementPageChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/UpdateUserProfile/:id"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <UpdateUserProfileChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/CreateUser"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <CreateUserChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/RoleManagement"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <RoleManagementPageChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/CreateRole"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <CreateRolePageChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/UpdateRole/:roleCode"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <UpdateRolePageChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/Profile"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <ProfilePageChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/PatientMedicalRecords"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <PatientMedicalRecordPageChakra />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/FlaggingSets"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <FlaggingSetManagementPage />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/TestOrders"
        element={
          <PrivateRoute>
            <ChakraLayout>
              <DashboardLayoutChakra>
                <TestOrdersPage />
              </DashboardLayoutChakra>
            </ChakraLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
