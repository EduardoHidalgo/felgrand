import { FC } from "react";

import { Race } from "@/types";

export interface StoreColumnRaceProps {
  race: keyof typeof Race;
}

export const StoreColumnRace: FC<StoreColumnRaceProps> = ({ race }) => {
  return (
    <div className="flex w-full flex-row justify-center text-center">
      {race}
    </div>
  );
};
