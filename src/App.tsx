// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
