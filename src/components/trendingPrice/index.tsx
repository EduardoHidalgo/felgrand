import { FC, ReactNode } from "react";
import {
  ArrowDownRightIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";

import { CTPrice, StoreStatus, TrendingPriceType } from "@/types";
import { Tooltip } from "../tooltip";

export interface TrendingPriceProps {
  children: ReactNode;
  price: number;
  prices: Omit<CTPrice, "storedCardItemId"> | null;
  status: StoreStatus;
}

export const TrendingPrice: FC<TrendingPriceProps> = ({
  children,
  price,
  prices,
  status,
}) => {
  const LOW_UP_TRENDING = 1.1;
  const MEDIUM_UP_TRENDING = 1.16;
  const HIGH_UP_TRENDING = 1.25;
  const LOW_DOWN_TRENDING = 0.9;
  const MEDIUM_DOWN_TRENDING = 0.84;
  const HIGH_DOWN_TRENDING = 0.75;

  const isTrendingUp = (): TrendingPriceType => {
    if (status !== StoreStatus.Stored || prices == null) return "invalid";

    if (price == 0) return "zero";

    if (prices.betterPrice != null && price <= prices.betterPrice)
      return "nearMintUp";

    if (
      prices.marketPrice != null &&
      price <= prices.marketPrice * HIGH_DOWN_TRENDING
    )
      return "highDown";

    if (
      prices.marketPrice != null &&
      price <= prices.marketPrice * MEDIUM_DOWN_TRENDING
    )
      return "mediumDown";

    if (
      prices.marketPrice != null &&
      price <= prices.marketPrice * LOW_DOWN_TRENDING
    )
      return "lowDown";

    if (
      prices.marketPrice != null &&
      price >= prices.marketPrice * HIGH_UP_TRENDING
    )
      return "highUp";

    if (
      prices.marketPrice != null &&
      price >= prices.marketPrice * MEDIUM_UP_TRENDING
    )
      return "mediumUp";

    if (
      prices.marketPrice != null &&
      price >= prices.marketPrice * LOW_UP_TRENDING
    )
      return "lowUp";

    return "none";
  };

  const trending = isTrendingUp();
  const showContent = prices && trending !== "invalid";

  return (
    <Tooltip
      tooltip={{
        className: "px-3 py-2",
      }}
      container={{
        className: "w-full flex justify-end",
      }}
      content={
        showContent && (
          <div className="flex flex-col gap-4 text-lg font-bold">
            <div className="flex flex-row gap-1">
              <p>Minimum Price:</p>
              {prices.minPrice ? (
                <p className="text-green-500">{prices.minPrice} $</p>
              ) : (
                <p className="text-red-500">unavailable</p>
              )}
            </div>
            <div className="flex flex-row gap-1">
              <p>Market Price:</p>
              {prices.marketPrice ? (
                <p className="text-green-500">{prices.marketPrice} $</p>
              ) : (
                <p className="text-red-500">unavailable</p>
              )}
            </div>
            <div className="flex flex-row gap-1">
              <p>Best Near Mint Price:</p>
              {prices.betterPrice ? (
                <p className="text-green-500">{prices.betterPrice} $</p>
              ) : (
                <p className="text-red-500">unavailable</p>
              )}
            </div>
          </div>
        )
      }
    >
      <div className="flex w-full flex-row-reverse justify-between gap-1">
        <div className="flex flex-row items-center px-1">{children}</div>
        {prices !== null && trending !== "invalid" && (
          <>
            {trending == "zero" && (
              <QuestionMarkCircleIcon className="h-5 w-5 text-red-600" />
            )}
            {trending == "highDown" && (
              <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
            )}
            {trending == "mediumDown" && (
              <ArrowDownRightIcon className="h-5 w-5 text-red-400" />
            )}
            {trending == "lowDown" && (
              <ArrowDownRightIcon className="h-5 w-5 text-red-200" />
            )}
            {trending == "highUp" && (
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
            )}
            {trending == "mediumUp" && (
              <ArrowUpRightIcon className="h-5 w-5 text-green-400" />
            )}
            {trending == "lowUp" && (
              <ArrowUpRightIcon className="h-5 w-5 text-green-200" />
            )}
            {trending == "nearMintUp" && (
              <ExclamationCircleIcon className="h-5 w-5 text-orange-400" />
            )}
            {trending == "none" && <CheckIcon className="h-5 w-5 text-white" />}
          </>
        )}
      </div>
    </Tooltip>
  );
};
