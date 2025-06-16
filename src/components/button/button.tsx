import React from "react";
import styles from "./button.module.css";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "primary" | "secondary" | "danger" | "gray";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  size = "md",
  color = "primary",
  isLoading,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const sizeClass = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  }[size];

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[color],
    sizeClass,
    fullWidth ? styles.fullWidth : "",
    disabled || isLoading ? styles.disabled : "",
    isLoading ? styles.loading : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};
