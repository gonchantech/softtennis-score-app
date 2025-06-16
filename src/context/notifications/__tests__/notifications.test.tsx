import { renderHook, act } from "@testing-library/react";
import { NotificationType } from "../types";
import { useNotification } from "../use-notification";
import { NotificationProvider } from "../notification-provider";
import { ReactNode } from "react";

const testNotification = {
  message: "Test notification",
  title: "Test notification",
  type: "info" as NotificationType,
};

describe("useNotifications", () => {
  it("should show and dismiss notifications", async () => {
    const hook = renderHook(() => useNotification(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      ),
    });

    expect(hook.result.current.notifications.length).toBe(0);

    act(() => {
      hook.result.current.showNotification(testNotification);
    });

    expect(hook.result.current.notifications).toContainEqual(
      expect.objectContaining(testNotification)
    );

    const notificationId = hook.result.current.notifications[0].id;

    act(() => {
      hook.result.current.dismissNotification(notificationId);
    });

    expect(hook.result.current.notifications.length).toBe(0);
  });
});
