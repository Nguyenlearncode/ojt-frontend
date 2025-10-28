import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import theme from "./theme/chakraTheme";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
