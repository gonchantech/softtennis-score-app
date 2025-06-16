import React from "react";
import styles from "./container.module.css";

type ContainerVariant = "center" | "start" | "end";
type ContainerHeight = "full" | "auto" | "half";

interface ContainerProps {
  children: React.ReactNode;
  variant?: ContainerVariant;
  height?: ContainerHeight;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = "center",
  height = "auto",
  className,
}) => {
  const containerClasses = [
    styles.container,
    styles[variant],
    styles[`height-${height}`],
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={containerClasses}>{children}</div>;
};
