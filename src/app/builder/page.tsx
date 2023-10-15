"use client";
import { useContext } from "react";

import { NotificationProvider, NotificationsContext } from "@/components/toast";
import { BuilderRender } from "./render";
import { useBuilder } from "./useBuilder";

export default function ListBuilderPage() {
  return (
    <main className="flex flex-row min-h-full">
      <NotificationProvider>
        <ListBuilderContainer />
      </NotificationProvider>
    </main>
  );
}

const ListBuilderContainer = () => {
  const { createNotification } = useContext(NotificationsContext);
  const builder = useBuilder({ createNotification });

  return <BuilderRender {...builder} />;
};
