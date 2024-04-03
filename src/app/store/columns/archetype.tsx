import { FC } from "react";

export interface StoreColumnArchetypeProps {
  archetype: string | null;
}

export const StoreColumnArchetype: FC<StoreColumnArchetypeProps> = ({
  archetype,
}) => {
  return (
    <div className="flex w-full flex-row justify-center">
      {archetype ? archetype : ""}
    </div>
  );
};
