"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import { useBuilder } from "./useBuilder";
import { BuilderRender } from "./render";

export default function ListBuilderPage() {
  const builder = useBuilder();

  return (
    <main className="flex flex-row min-h-full">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToParentElement]}
        {...builder.dragHandlers}
      >
        <BuilderRender {...builder} />
      </DndContext>
    </main>
  );
}
