import React from "react";
import styles from "./stack.module.css";

type StackDirection = "horizontal" | "vertical";
type StackGap = "sm" | "md" | "lg";

interface StackProps {
  children: React.ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  className?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = "horizontal",
  gap = "md",
  className,
}) => {
  const stackClasses = [
    styles.stack,
    styles[direction],
    styles[`gap-${gap}`],
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={stackClasses}>{children}</div>;
};
