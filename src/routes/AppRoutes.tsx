// src/routes/AppRoutes.tsx 
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/Dashboard";
import UpdateUserProfile from "../features/user/pages/UpdateUserProfile";
import CreateUser from "../features/user/pages/CreateUser";
import UserManagementPage from "../features/user/pages/UserManagementPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
          path="/UserManagement"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <UserManagementPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
  path="/UpdateUserProfile/:id"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <UpdateUserProfile />
      </DashboardLayout>
    </PrivateRoute>
  }
/>


        <Route
          path="/CreateUser"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CreateUser />
              </DashboardLayout>
            </PrivateRoute>
          }
        /> 

      {/* Redirect others */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
