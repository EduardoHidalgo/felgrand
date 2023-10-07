"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import { useBuilder } from "./useBuilder";
import { BuilderRender } from "./render";
import { NotificationProvider, NotificationsContext } from "@/components/toast";
import { useContext } from "react";

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

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      {...builder.dragHandlers}
    >
      <BuilderRender {...builder} />
    </DndContext>
  );
};
