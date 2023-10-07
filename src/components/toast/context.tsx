import { createContext } from "react";
import { Notification } from "./types";

export interface NotificationContextArgs {
  createNotification: (options: Omit<Notification, "id">) => void;
}

export const NotificationsContext = createContext<NotificationContextArgs>({
  createNotification: () => undefined,
});
