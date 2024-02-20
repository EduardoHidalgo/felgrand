"use client";
import { FC } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

import { AsyncState, Ban, FrameType, YugiohCard } from "@/types";
import { Datatable } from "../datatable";
import { Loader } from "../loader";
import { Tooltip } from "../tooltip";
import { rarityCodeToName } from "@/utils/rarityCodeToName";

export interface TcgCardProps {
  card: YugiohCard;
  rulings: { html: string | null; state: AsyncState };
  tips: { html: string | null; state: AsyncState };
}

export const TcgCard: FC<TcgCardProps> = ({ card, rulings, tips }) => {
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
      case Ban.Banned:
        return "(0) Banned";
      case Ban.Limited:
        return "(1) Limited";
      case Ban.SemiLimited:
        return "(2) Semi Limited";
      default:
        return "(3) Full available";
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-2 px-2">
      <img className="w-80" src={card.card_images[0].image_url} />
      <div className="flex w-full flex-col">
        <h2 className="mb-1 text-xl font-semibold">{card.name}</h2>
        <div className="flex flex-row justify-start gap-8">
          <span className="">{card.type}</span>
          <span className="">{card.race}</span>
          <div className="">{card.archetype}</div>
        </div>
        <div className="mb-1 flex flex-row justify-start gap-8">
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

      <div className="flex w-full flex-col">
        <Datatable
          showDisplay={!hasValidCardSets}
          display="This card hasn't been released yet."
        >
          <Datatable.Head>
            <Datatable.HeaderCell>set code</Datatable.HeaderCell>
            <Datatable.HeaderCell>set name</Datatable.HeaderCell>
            <Datatable.HeaderCell className="text-center">
              rarity
            </Datatable.HeaderCell>
          </Datatable.Head>
          <Datatable.Body>
            {(hasValidCardSets ? card.card_sets : [])?.map((set, index) => (
              <Datatable.Row index={index} key={index}>
                <Datatable.Data>
                  <p className="whitespace-nowrap">{set.set_code}</p>
                </Datatable.Data>
                <Datatable.Data>{set.set_name}</Datatable.Data>
                <Datatable.Data>
                  <Tooltip
                    container={{
                      className: "text-center whitespace-nowrap w-full",
                    }}
                    text={rarityCodeToName(set.set_rarity_code)}
                    tooltip={{
                      className: "right-12 top-0 bottom-0 whitespace-nowrap",
                    }}
                  >
                    {set.set_rarity_code}
                  </Tooltip>
                </Datatable.Data>
              </Datatable.Row>
            ))}
          </Datatable.Body>
        </Datatable>
      </div>

      <div className="whitespace-pre-line text-sm">{card.desc}</div>
      {card.banlist_info && (
        <div className="flex w-full flex-col">
          <Datatable>
            <Datatable.Head>
              <th>test</th>
            </Datatable.Head>
            <Datatable.Body>
              <Datatable.Row index={0}>
                <Datatable.Data>{"TCG"}</Datatable.Data>
                <Datatable.Data>
                  {banLabel(card.banlist_info.ban_tcg)}
                </Datatable.Data>
              </Datatable.Row>
              <Datatable.Row index={1}>
                <Datatable.Data>{"OCG"}</Datatable.Data>
                <Datatable.Data>
                  {banLabel(card.banlist_info.ban_ocg)}
                </Datatable.Data>
              </Datatable.Row>
            </Datatable.Body>
          </Datatable>
        </div>
      )}
      <div className="flex w-full flex-col justify-start gap-2">
        <h2 className="text-xl font-semibold">Tips</h2>
        {tips.html !== null && tips.state == AsyncState.Success && (
          <div
            className="inner-html"
            dangerouslySetInnerHTML={{ __html: JSON.parse(tips.html) }}
          />
        )}
        {tips.html === null && tips.state == AsyncState.Success && (
          <p>No tips available.</p>
        )}
        {tips.state == AsyncState.Loading && <Loader />}
        {tips.state == AsyncState.Error && (
          <p>Some error happened. Unable to load tips.</p>
        )}
      </div>
      <div className="flex w-full flex-col justify-start gap-2">
        <h2 className="text-xl font-semibold">Rulings</h2>
        {rulings.html !== null && rulings.state == AsyncState.Success && (
          <div
            className="inner-html"
            dangerouslySetInnerHTML={{ __html: JSON.parse(rulings.html) }}
          />
        )}
        {rulings.html === null && rulings.state == AsyncState.Success && (
          <p>No rulings available.</p>
        )}
        {rulings.state == AsyncState.Loading && <Loader />}
        {rulings.state == AsyncState.Error && (
          <p>Some error happened. Unable to load rulings.</p>
        )}
      </div>
    </div>
  );
};
