import React from "react";
import styles from "./Tag.module.css";

type TagSize = "sm" | "md" | "lg";
type TagColor = "primary" | "secondary" | "purple";

interface TagProps {
  children: React.ReactNode;
  size?: TagSize;
  color?: TagColor;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  size = "md",
  color = "primary",
  className,
}) => {
  const tagClasses = [styles.tag, styles[size], styles[color], className]
    .filter(Boolean)
    .join(" ");

  return <span className={tagClasses}>{children}</span>;
};
