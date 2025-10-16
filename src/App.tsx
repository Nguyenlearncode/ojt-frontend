import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
