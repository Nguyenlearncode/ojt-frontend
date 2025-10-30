import React from "react";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Keyframes animations
const tail = keyframes`
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
`;

const shining = keyframes`
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
`;

const shooting = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
`;

interface ShootingStar {
  top: string;
  left: string;
  delay: number;
}

// Generate 20 shooting stars with random positions
const generateStars = (): ShootingStar[] => {
  const positions = [
    { top: "calc(50% - -79px)", left: "calc(50% - 16px)", delay: 5599 },
    { top: "calc(50% - -11px)", left: "calc(50% - 287px)", delay: 7809 },
    { top: "calc(50% - 31px)", left: "calc(50% - 199px)", delay: 9413 },
    { top: "calc(50% - -169px)", left: "calc(50% - 84px)", delay: 3970 },
    { top: "calc(50% - -90px)", left: "calc(50% - 90px)", delay: 4143 },
    { top: "calc(50% - 169px)", left: "calc(50% - 235px)", delay: 2068 },
    { top: "calc(50% - 72px)", left: "calc(50% - 41px)", delay: 7474 },
    { top: "calc(50% - 53px)", left: "calc(50% - 252px)", delay: 8807 },
    { top: "calc(50% - -48px)", left: "calc(50% - 17px)", delay: 8480 },
    { top: "calc(50% - 101px)", left: "calc(50% - 246px)", delay: 4838 },
    { top: "calc(50% - -16px)", left: "calc(50% - 275px)", delay: 8929 },
    { top: "calc(50% - 141px)", left: "calc(50% - 210px)", delay: 71 },
    { top: "calc(50% - 106px)", left: "calc(50% - 131px)", delay: 7396 },
    { top: "calc(50% - 191px)", left: "calc(50% - 262px)", delay: 3221 },
    { top: "calc(50% - -134px)", left: "calc(50% - 231px)", delay: 6541 },
    { top: "calc(50% - 139px)", left: "calc(50% - 284px)", delay: 3218 },
    { top: "calc(50% - -50px)", left: "calc(50% - 144px)", delay: 4243 },
    { top: "calc(50% - 23px)", left: "calc(50% - 163px)", delay: 8522 },
    { top: "calc(50% - 151px)", left: "calc(50% - 4px)", delay: 4238 },
    { top: "calc(50% - -125px)", left: "calc(50% - 161px)", delay: 8472 },
  ];

  return positions;
};

const ShootingStarsSidebar: React.FC = () => {
  const stars = generateStars();

  return (
    <>
      {/* Radial gradient background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)"
        zIndex={-2}
      />

      {/* Night container */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        transform="rotateZ(45deg)"
        overflow="hidden"
        zIndex={-1}
      >
        {/* Shooting stars */}
        {stars.map((star, index) => (
          <Box
            key={index}
            position="absolute"
            top={star.top}
            left={star.left}
            height="2px"
            background="linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0))"
            borderRadius="999px"
            filter="drop-shadow(0 0 6px #699bff)"
            sx={{
              // root-level animations
              animation: `${tail} 3000ms ease-in-out infinite, ${shooting} 3000ms ease-in-out infinite`,
              animationDelay: `${star.delay}ms`,
              // Before pseudo-element (star head 1)
              "&::before": {
                content: '""',
                position: "absolute",
                top: "calc(50% - 1px)",
                right: 0,
                height: "2px",
                background: "linear-gradient(-45deg, rgba(0, 0, 255, 0), #5f91ff, rgba(0, 0, 255, 0))",
                transform: "translateX(50%) rotateZ(45deg)",
                borderRadius: "100%",
                animation: `${shining} 3000ms ease-in-out infinite`,
                animationDelay: `${star.delay}ms`,
              },
              // After pseudo-element (star head 2)
              "&::after": {
                content: '""',
                position: "absolute",
                top: "calc(50% - 1px)",
                right: 0,
                height: "2px",
                background: "linear-gradient(-45deg, rgba(0, 0, 255, 0), #5f91ff, rgba(0, 0, 255, 0))",
                transform: "translateX(50%) rotateZ(-45deg)",
                borderRadius: "100%",
                animation: `${shining} 3000ms ease-in-out infinite`,
                animationDelay: `${star.delay}ms`,
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default ShootingStarsSidebar;

