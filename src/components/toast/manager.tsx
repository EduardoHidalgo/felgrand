"use client";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createPortal } from "react-dom";

import { Toast } from "./toast";
import { Notification } from "./types";
import { NotificationsContext } from ".";

export interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  useEffect(() => setMounted(true), []);

  const createNotification = (notification: Omit<Notification, "id">) => {
    const newNotification: Notification = { ...notification, id: uuidv4() };

    setNotifications((current) => [...current, newNotification]);
  };

  const destroy = (id: string) => {
    setNotifications((current) => [...current.filter((n) => n.id !== id)]);
  };

  const contextValue = useMemo(() => ({ createNotification }), []);

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex flex-col-reverse gap-2 px-4 py-6"
          >
            {notifications.map((notification) => (
              <Toast
                destroy={destroy}
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>,
          document.body
        )}
    </NotificationsContext.Provider>
  );
};
