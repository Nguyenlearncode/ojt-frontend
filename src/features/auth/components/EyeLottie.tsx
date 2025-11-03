import React from "react";
import Lottie from "lottie-react";
import eyeAnimationData from "../../../assets/eye-animation.json";

const EyeLottie: React.FC = () => {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie
        animationData={eyeAnimationData}
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
    </div>
  );
};

export default EyeLottie;
