/**
 * MDBox Component - Simplified TypeScript Version
 * A flexible Box component with Material Dashboard styling
 */

import { forwardRef, ReactNode } from "react";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface MDBoxProps extends Omit<BoxProps, 'variant' | 'color'> {
  variant?: "contained" | "gradient";
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string | number;
  shadow?: string;
  children?: ReactNode;
  [key: string]: any;
}

const StyledBox = styled(Box)<{ ownerState: MDBoxProps }>(({ theme, ownerState }) => {
  const { variant, bgColor, color, opacity, borderRadius, shadow } = ownerState;

  let backgroundValue = bgColor || "transparent";
  let colorValue = color || "inherit";
  let borderRadiusValue = borderRadius || 0;
  let boxShadowValue = shadow || "none";

  // Handle predefined colors
  if (bgColor && theme.palette[bgColor as keyof typeof theme.palette]) {
    const paletteColor = theme.palette[bgColor as keyof typeof theme.palette];
    backgroundValue = typeof paletteColor === 'object' && 'main' in paletteColor ? paletteColor.main : bgColor;
  }

  if (color && theme.palette[color as keyof typeof theme.palette]) {
    const paletteColor = theme.palette[color as keyof typeof theme.palette];
    colorValue = typeof paletteColor === 'object' && 'main' in paletteColor ? paletteColor.main : color;
  }

  // Handle gradient variant
  if (variant === "gradient" && bgColor) {
    const gradientColors: Record<string, string[]> = {
      primary: ["#EC407A", "#D81B60"],
      secondary: ["#747b8a", "#495361"],
      info: ["#49a3f1", "#1A73E8"],
      success: ["#66BB6A", "#43A047"],
      warning: ["#FFA726", "#FB8C00"],
      error: ["#EF5350", "#E53935"],
      dark: ["#42424a", "#191919"],
    };

    if (gradientColors[bgColor]) {
      const [start, end] = gradientColors[bgColor];
      backgroundValue = `linear-gradient(195deg, ${start}, ${end})`;
    }
  }

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  };
});

const MDBox = forwardRef<HTMLDivElement, MDBoxProps>(
  ({ variant = "contained", bgColor, color, opacity = 1, borderRadius, shadow, children, ...rest }, ref) => {
    return (
      <StyledBox
        {...rest}
        ref={ref}
        ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow }}
      >
        {children}
      </StyledBox>
    );
  }
);

MDBox.displayName = "MDBox";

export default MDBox;

