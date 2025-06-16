"use client";

import React from "react";
import { Button } from "@/components/button";
import styles from "./confirm-modal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: "single" | "double";
  confirmText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  type = "double",
  confirmText = "はい",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.message}>{message}</div>
        <div className={styles.buttonGroup}>
          <Button onClick={onConfirm} variant="solid" color="primary" fullWidth>
            {confirmText}
          </Button>
          {type === "double" && onCancel && (
            <Button onClick={onCancel} variant="solid" color="gray" fullWidth>
              いいえ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
