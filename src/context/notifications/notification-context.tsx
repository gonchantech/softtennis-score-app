import { createContext } from "react";
import { NotificationItem } from "./types";

export const NotificationContext = createContext<{
  notifications: NotificationItem[];
  showNotification: (notification: Omit<NotificationItem, "id">) => void;
  dismissNotification: (id: string) => void;
}>({
  notifications: [],
  showNotification: () => {},
  dismissNotification: () => {},
});
