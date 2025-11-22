import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/chakraTheme";

export default function ChakraLayout({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
