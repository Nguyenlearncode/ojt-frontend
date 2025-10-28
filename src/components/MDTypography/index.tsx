/**
 * MDTypography Component - Simplified TypeScript Version
 * Enhanced Typography component with Material Dashboard styling
 */

import { forwardRef, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import type { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface MDTypographyProps extends Omit<TypographyProps, 'color'> {
  color?: "inherit" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark" | "text" | "white";
  fontWeight?: "light" | "regular" | "medium" | "bold";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  verticalAlign?: "unset" | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom";
  textGradient?: boolean;
  opacity?: number;
  children: ReactNode;
}

const StyledTypography = styled(Typography)<{ ownerState: MDTypographyProps }>(
  ({ theme, ownerState }) => {
    const { color, textTransform, verticalAlign, fontWeight, opacity, textGradient } = ownerState;

    // Font weights
    const fontWeights: Record<string, number> = {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    };

    // Colors mapping
    const colors: Record<string, string> = {
      inherit: "inherit",
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      info: theme.palette.info.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      error: theme.palette.error.main,
      light: "#f0f2f5",
      dark: "#344767",
      text: theme.palette.text.primary,
      white: "#ffffff",
    };

    const gradientColors: Record<string, string> = {
      primary: "linear-gradient(195deg, #EC407A, #D81B60)",
      secondary: "linear-gradient(195deg, #747b8a, #495361)",
      info: "linear-gradient(195deg, #49a3f1, #1A73E8)",
      success: "linear-gradient(195deg, #66BB6A, #43A047)",
      warning: "linear-gradient(195deg, #FFA726, #FB8C00)",
      error: "linear-gradient(195deg, #EF5350, #E53935)",
      dark: "linear-gradient(195deg, #42424a, #191919)",
    };

    let colorValue = color ? colors[color] || color : colors.dark;
    
    if (textGradient && color && gradientColors[color]) {
      return {
        backgroundImage: gradientColors[color],
        display: "inline-block",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        position: "relative",
        textTransform,
        verticalAlign,
        fontWeight: fontWeight ? fontWeights[fontWeight] : "inherit",
        opacity,
      };
    }

    return {
      color: colorValue,
      textTransform,
      verticalAlign,
      fontWeight: fontWeight ? fontWeights[fontWeight] : "inherit",
      opacity,
    };
  }
);

const MDTypography = forwardRef<HTMLSpanElement, MDTypographyProps>(
  (
    {
      color = "dark",
      fontWeight,
      textTransform = "none",
      verticalAlign = "unset",
      textGradient = false,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledTypography
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          children,
        }}
      >
        {children}
      </StyledTypography>
    );
  }
);

MDTypography.displayName = "MDTypography";

export default MDTypography;

