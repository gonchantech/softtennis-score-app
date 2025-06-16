export type NotificationType = "info" | "warning" | "success" | "error";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
};
