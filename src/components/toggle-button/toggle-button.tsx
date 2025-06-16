import React from "react";
import styles from "./toggle-button.module.css";

interface ToggleButtonProps {
  value: boolean;
  onChange: (value: boolean) => void;
  trueLabel: string;
  falseLabel: string;
  trueVariant?: "primary" | "success" | "danger";
  falseVariant?: "primary" | "success" | "danger";
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  onChange,
  trueLabel,
  falseLabel,
  trueVariant = "primary",
  falseVariant = "primary",
}) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`${styles.button} ${
          value ? styles[trueVariant] : styles.inactive
        }`}
      >
        {trueLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`${styles.button} ${
          !value ? styles[falseVariant] : styles.inactive
        }`}
      >
        {falseLabel}
      </button>
    </div>
  );
};
