"use client";
import { FC, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";

import { AsyncState, Ban, FrameType, YugiohCard } from "@/types";
import { CardTypeText } from "../cardTypeText";
import { Datatable } from "../datatable";
import { Loader } from "../loader";
import { Tooltip } from "../tooltip";
import { rarityCodeToName } from "@/utils/rarityCodeToName";
import classNames from "classnames";

export interface TcgCardProps {
  card: YugiohCard;
  /*  rulings: { html: string | null; state: AsyncState };
  tips: { html: string | null; state: AsyncState }; */
}

export const TcgCard: FC<TcgCardProps> = ({ card /* rulings, tips */ }) => {
  /*   const isNotProd = process.env.NODE_ENV !== "production"; */
  const [imageIndex, setImageIndex] = useState<number>(0);

  const hasValidCardSets =
    card.card_sets !== undefined && card.card_sets.length > 0;

  const isMonster = (frameType: FrameType) => {
    return ![FrameType.Skill, FrameType.Spell, FrameType.Trap].includes(
      frameType,
    );
  };

  const isLink = (frameType: FrameType) => {
    return frameType == FrameType.Link;
  };

  const banLabel = (ban: Ban | undefined) => {
    switch (ban) {
      case Ban.Forbidden:
        return "(0) Forbidden";
      case Ban.Limited:
        return "(1) Limited";
      case Ban.SemiLimited:
        return "(2) Semi Limited";
      default:
        return "(3) Full available";
    }
  };

  const image = card.card_images[imageIndex];
  const imagesLength = card.card_images.length;
  const onClickLeftImage = () =>
    setImageIndex(imageIndex != 0 ? imageIndex - 1 : imageIndex);
  const onClickRightImage = () =>
    setImageIndex(imageIndex != imagesLength - 1 ? imageIndex + 1 : imageIndex);
  const onClickDotImage = (index: number) => setImageIndex(index);

  return (
    <div className="flex w-full flex-col items-center gap-2 px-2">
      <div className="relative w-full max-w-80">
        {imageIndex != 0 && (
          <div
            className="absolute inset-y-0 -left-6 z-10 m-auto h-8 w-8 cursor-pointer rounded-full bg-white transition-colors hover:bg-gray-200 md:-left-10"
            onClick={onClickLeftImage}
          >
            <ChevronLeftIcon className="text-black" />
          </div>
        )}
        {imageIndex != imagesLength - 1 && (
          <div
            className="absolute inset-y-0 -right-6 z-10 m-auto h-8 w-8 cursor-pointer rounded-full bg-white transition-colors hover:bg-gray-200 md:-right-10"
            onClick={onClickRightImage}
          >
            <ChevronRightIcon className="text-black" />
          </div>
        )}
        <img
          className="w-full"
          src={image && image.image_url && image.image_url}
        />
        {imagesLength > 1 && (
          <div className="flex flex-row justify-center gap-3 pt-2">
            {new Array(imagesLength).fill("").map((_, index) => (
              <div
                key={`dot-${index}`}
                className={classNames(
                  "h-3 w-3 cursor-pointer rounded-full bg-white transition-colors",
                  index == imageIndex && "bg-yellow-400",
                )}
                onClick={() => onClickDotImage(index)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col">
        <h2 className="mb-1 break-words text-lg font-semibold md:text-xl">
          {card.name}
        </h2>
        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:justify-start sm:gap-8">
          <span className="">{card.type}</span>
          <span className="">{card.race}</span>
          <div className="">{card.archetype}</div>
        </div>
        <div className="mb-1 flex flex-col gap-2 text-sm sm:flex-row sm:justify-start sm:gap-8">
          {isMonster(card.frameType) &&
            (isLink(card.frameType) ? (
              <>
                <span className="">{card.attribute}</span>
                <span className="">ATK: {card.atk}</span>
                <span className="">Link-{card.linkval}</span>
              </>
            ) : (
              <>
                <span className="flex flex-row items-center gap-1">
                  <p className="font-bold">{card.level}</p>
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                </span>
                <span className="">{card.attribute}</span>
                <span className="">ATK: {card.atk}</span>
                <span className="">DEF: {card.def}</span>
              </>
            ))}
        </div>
      </div>
      <div className="whitespace-pre-line text-lg">{card.desc}</div>
      <div className="flex w-full flex-col">
        <Datatable
          showDisplay={!hasValidCardSets}
          display="This card hasn't been released yet."
        >
          <Datatable.Head>
            <Datatable.HeaderCell className="text-xs">
              set code
            </Datatable.HeaderCell>
            <Datatable.HeaderCell className="hidden text-xs sm:table-cell">
              set name
            </Datatable.HeaderCell>
            <Datatable.HeaderCell className="text-center text-xs">
              rarity
            </Datatable.HeaderCell>
          </Datatable.Head>
          <Datatable.Body>
            {(hasValidCardSets ? card.card_sets : [])?.map((set, index) => (
              <Datatable.Row index={index} key={index}>
                <Datatable.Data>
                  <div className="flex flex-col">
                    <p className="whitespace-nowrap text-xs font-medium">
                      {set.set_code}
                    </p>
                    {/* Mostrar set name en móviles debajo del código */}
                    <p className="text-xs text-gray-500 sm:hidden">
                      {set.set_name}
                    </p>
                  </div>
                </Datatable.Data>
                <Datatable.Data className="hidden text-xs sm:table-cell">
                  {set.set_name}
                </Datatable.Data>
                <Datatable.Data>
                  <Tooltip
                    container={{
                      className: "text-center whitespace-nowrap w-full",
                    }}
                    content={rarityCodeToName(set.set_rarity_code)}
                    tooltip={{
                      className: "right-12 top-0 bottom-0 whitespace-nowrap",
                    }}
                  >
                    <span className="text-xs">{set.set_rarity_code}</span>
                  </Tooltip>
                </Datatable.Data>
              </Datatable.Row>
            ))}
          </Datatable.Body>
        </Datatable>
      </div>
      {card.banlist_info && (
        <div className="flex w-full flex-col">
          <Datatable>
            <Datatable.Head>
              <Datatable.HeaderCell className="text-xs">
                Format
              </Datatable.HeaderCell>
              <Datatable.HeaderCell className="text-xs">
                Ban Condition
              </Datatable.HeaderCell>
            </Datatable.Head>
            <Datatable.Body>
              <Datatable.Row index={0}>
                <Datatable.Data className="text-xs">{"TCG"}</Datatable.Data>
                <Datatable.Data className="text-xs">
                  {banLabel(card.banlist_info.ban_tcg)}
                </Datatable.Data>
              </Datatable.Row>
              <Datatable.Row index={1}>
                <Datatable.Data className="text-xs">{"OCG"}</Datatable.Data>
                <Datatable.Data className="text-xs">
                  {banLabel(card.banlist_info.ban_ocg)}
                </Datatable.Data>
              </Datatable.Row>
            </Datatable.Body>
          </Datatable>
        </div>
      )}
    </div>
  );
};
