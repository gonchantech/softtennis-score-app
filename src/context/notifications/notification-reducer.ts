import { NotificationItem, NotificationAction } from "./types";

export const notificationReducer = (
  state: NotificationItem[],
  action: NotificationAction
) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return [...state, action.payload];
    case "DISMISS_NOTIFICATION":
      return state.filter(
        (notification) => notification.id !== action.payload.id
      );
    default:
      return state;
  }
};
