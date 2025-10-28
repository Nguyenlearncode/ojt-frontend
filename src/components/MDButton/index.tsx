/**
 * MDButton Component - Simplified TypeScript Version
 * Enhanced Button component with Material Dashboard styling
 */

import { forwardRef, ReactNode } from "react";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface MDButtonProps extends Omit<ButtonProps, 'color' | 'variant'> {
  color?: "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  variant?: "text" | "contained" | "outlined" | "gradient";
  size?: "small" | "medium" | "large";
  circular?: boolean;
  iconOnly?: boolean;
  children: ReactNode;
}

const StyledButton = styled(Button)<{ ownerState: MDButtonProps }>(({ theme, ownerState }) => {
  const { color, variant, size, circular, iconOnly } = ownerState;

  const colors: Record<string, any> = {
    white: { main: "#ffffff", focus: "#f0f0f0" },
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    info: theme.palette.info,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
    light: { main: "#f0f2f5", focus: "#e0e2e5" },
    dark: { main: "#344767", focus: "#2c3c58" },
  };

  const gradients: Record<string, string> = {
    primary: "linear-gradient(195deg, #EC407A, #D81B60)",
    secondary: "linear-gradient(195deg, #747b8a, #495361)",
    info: "linear-gradient(195deg, #49a3f1, #1A73E8)",
    success: "linear-gradient(195deg, #66BB6A, #43A047)",
    warning: "linear-gradient(195deg, #FFA726, #FB8C00)",
    error: "linear-gradient(195deg, #EF5350, #E53935)",
    dark: "linear-gradient(195deg, #42424a, #191919)",
  };

  const selectedColor = color ? colors[color] : colors.primary;

  // Size styles
  const sizes = {
    small: {
      padding: "0.5rem 1rem",
      fontSize: "0.75rem",
    },
    medium: {
      padding: "0.625rem 1.5rem",
      fontSize: "0.875rem",
    },
    large: {
      padding: "0.75rem 2rem",
      fontSize: "1rem",
    },
  };

  const buttonSize = size ? sizes[size] : sizes.medium;

  let styles: any = {
    ...buttonSize,
    borderRadius: circular ? "50%" : "0.5rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "none",
    transition: "all 0.15s ease-in-out",
    "&:hover": {
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-1px)",
    },
  };

  if (iconOnly) {
    styles = {
      ...styles,
      minWidth: circular ? "auto" : "2.5rem",
      width: circular ? "2.5rem" : "auto",
      height: circular ? "2.5rem" : "auto",
      padding: circular ? "0.5rem" : buttonSize.padding,
    };
  }

  if (variant === "gradient") {
    styles = {
      ...styles,
      background: color && gradients[color] ? gradients[color] : gradients.info,
      color: "#ffffff",
      border: "none",
      boxShadow: `0px 4px 12px ${color && selectedColor ? selectedColor.main : theme.palette.info.main}40`,
      "&:hover": {
        ...styles["&:hover"],
        background: color && gradients[color] ? gradients[color] : gradients.info,
        boxShadow: `0px 6px 16px ${color && selectedColor ? selectedColor.main : theme.palette.info.main}60`,
      },
    };
  } else if (variant === "contained") {
    styles = {
      ...styles,
      backgroundColor: selectedColor.main,
      color: color === "white" || color === "light" ? "#344767" : "#ffffff",
      "&:hover": {
        ...styles["&:hover"],
        backgroundColor: selectedColor.focus || selectedColor.dark,
      },
    };
  } else if (variant === "outlined") {
    styles = {
      ...styles,
      backgroundColor: "transparent",
      borderColor: selectedColor.main,
      color: selectedColor.main,
      "&:hover": {
        ...styles["&:hover"],
        backgroundColor: `${selectedColor.main}10`,
        borderColor: selectedColor.main,
      },
    };
  } else if (variant === "text") {
    styles = {
      ...styles,
      backgroundColor: "transparent",
      color: selectedColor.main,
      "&:hover": {
        ...styles["&:hover"],
        backgroundColor: `${selectedColor.main}10`,
      },
    };
  }

  return styles;
});

const MDButton = forwardRef<HTMLButtonElement, MDButtonProps>(
  ({ color = "primary", variant = "contained", size = "medium", circular = false, iconOnly = false, children, ...rest }, ref) => {
    return (
      <StyledButton
        {...rest}
        ref={ref}
        ownerState={{ color, variant, size, circular, iconOnly, children }}
      >
        {children}
      </StyledButton>
    );
  }
);

MDButton.displayName = "MDButton";

export default MDButton;

