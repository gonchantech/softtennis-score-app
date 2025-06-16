import { NotificationItem } from "./notification";

export type NotificationAction =
  | {
      type: "SHOW_NOTIFICATION";
      payload: NotificationItem;
    }
  | {
      type: "DISMISS_NOTIFICATION";
      payload: { id: string };
    };
