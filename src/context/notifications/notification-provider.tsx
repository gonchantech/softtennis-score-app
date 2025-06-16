"use client";

import { useReducer } from "react";
import { NotificationItem } from "./types";
import { notificationReducer } from "./notification-reducer";
import { uid } from "@/utils/uid";
import { NotificationContext } from "./notification-context";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const showNotification = (notification: Omit<NotificationItem, "id">) => {
    const id = uid();
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { ...notification, id },
    });
  };

  const dismissNotification = (id: string) => {
    dispatch({
      type: "DISMISS_NOTIFICATION",
      payload: { id },
    });
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, dismissNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
