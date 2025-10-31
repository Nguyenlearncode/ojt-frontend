// src/routes/AppRoutes.tsx 
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPageChakra from "../features/auth/pages/LoginPageChakra";
import DashboardChakra from "../features/dashboard/pages/DashboardChakra";
import UpdateUserProfileChakra from "../features/user/pages/UpdateUserProfileChakra";
import CreateUserChakra from "../features/user/pages/CreateUserChakra";
import UserManagementPageChakra from "../features/user/pages/UserManagementPageChakra";
import PrivateRoute from "./PrivateRoute";
import DashboardLayoutChakra from "../layouts/DashboardLayoutChakra";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginPageChakra />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayoutChakra>
              <DashboardChakra />
            </DashboardLayoutChakra>
          </PrivateRoute>
        }
      />

      <Route
          path="/UserManagement"
          element={
            <PrivateRoute>
              <DashboardLayoutChakra>
                <UserManagementPageChakra />
              </DashboardLayoutChakra>
            </PrivateRoute>
          }
        />

        <Route
  path="/UpdateUserProfile/:id"
  element={
    <PrivateRoute>
      <DashboardLayoutChakra>
        <UpdateUserProfileChakra />
      </DashboardLayoutChakra>
    </PrivateRoute>
  }
/>


        <Route
          path="/CreateUser"
          element={
            <PrivateRoute>
              <DashboardLayoutChakra>
                <CreateUserChakra />
              </DashboardLayoutChakra>
            </PrivateRoute>
          }
        /> 

      {/* Redirect others */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
