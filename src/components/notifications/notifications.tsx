"use client";

import React from "react";
import styles from "./notifications.module.css";
import { useNotification } from "@/context/notifications";
import { Button } from "@/components/button";
import { NotificationType } from "@/context/notifications/types/notification";

interface NotificationToastProps {
  id: string;
  type: NotificationType;
  message: string;
  onDismiss: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  type,
  message,
  onDismiss,
}) => {
  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return styles.success;
      case "error":
        return styles.error;
      case "warning":
        return styles.warning;
      case "info":
      default:
        return styles.info;
    }
  };

  return (
    <div
      className={`${styles.notification} ${getTypeStyles(type)}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>
      <Button
        variant="solid"
        size="sm"
        color="gray"
        onClick={() => onDismiss(id)}
        aria-label="確認"
      >
        ×
      </Button>
    </div>
  );
};

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};
