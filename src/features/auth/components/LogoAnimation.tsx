import React from "react";
import Lottie from "lottie-react";
import logoAnimationData from "../../../assets/logo_Login.json";
import { Box } from "@chakra-ui/react";

const LogoAnimation: React.FC = () => {
  return (
    <Box width="100px" height="100px">
      <Lottie
        animationData={logoAnimationData}
        loop={true}
        autoplay={true}
        style={{
          width: "100%",
          height: "100%",
        }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid meet",
        }}
      />
    </Box>
  );
};

export default LogoAnimation;
