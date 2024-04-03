import { FC } from "react";

import { Ban } from "@/types";

export interface StoreColumnBanTypeProps {
  banType: keyof typeof Ban;
}

export const StoreColumnBanType: FC<StoreColumnBanTypeProps> = ({
  banType,
}) => {
  return banType;
};
