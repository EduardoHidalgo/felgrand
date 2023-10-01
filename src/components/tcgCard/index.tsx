"use client";
import { FC } from "react";

import { CardPrice, FrameType, YugiohCard } from "@/types";
import { Datatable } from "../datatable";

export interface TcgCardProps {
  card: YugiohCard;
}

export const TcgCard: FC<TcgCardProps> = ({ card }) => {
  const USD_TO_MXN = 17.51;
  const setHeaders = ["Set Code", "Set Name", "Price", "Rarity"];
  const priceHeaders = ["Market", "Price (MXN)"];

  const isMonster = (frameType: FrameType) => {
    return ![FrameType.Skill, FrameType.Spell, FrameType.Trap].includes(
      frameType
    );
  };

  const isLink = (frameType: FrameType) => {
    return frameType == FrameType.Link;
  };

  const convertPrices = (cardPrice: CardPrice) => {
    let prices: Array<{ market: string; price: string }> = [];

    const {
      amazon_price,
      cardmarket_price,
      coolstuffinc_price,
      ebay_price,
      tcgplayer_price,
    } = cardPrice;

    prices.push({ market: "Card Market", price: usdToMxn(cardmarket_price) });
    prices.push({ market: "TCG Player", price: usdToMxn(tcgplayer_price) });
    prices.push({ market: "Ebay", price: usdToMxn(ebay_price) });
    prices.push({ market: "Amazon", price: usdToMxn(amazon_price) });
    prices.push({
      market: "Cool Stuff Inc",
      price: usdToMxn(coolstuffinc_price),
    });

    return prices;
  };

  const usdToMxn = (price: string) => {
    return (Number(price) * USD_TO_MXN).toFixed(2);
  };

  return (
    <div className="flex flex-col w-full gap-2 items-center">
      <h2>{card.name}</h2>
      <h2>{card.id}</h2>
      <img className="w-48" src={card.card_images[0].image_url} />
      <div className="w-full grid grid-cols-2">
        <span className="col-span-1">{card.type}</span>
        <span className="col-span-1">{card.race}</span>
      </div>
      <div className="w-full">{card.archetype}</div>
      {isMonster(card.frameType) &&
        (isLink(card.frameType) ? (
          <div className="w-full grid grid-cols-3">
            <span className="col-span-1">{card.attribute}</span>
            <span className="col-span-1">{card.atk}</span>
            <span className="col-span-1">{card.linkval}</span>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 grid-rows-2">
            <span className="col-span-1">{card.attribute}</span>
            <span className="col-span-1">{card.level}</span>
            <span className="col-span-1">{card.atk}</span>
            <span className="col-span-1">{card.def}</span>
          </div>
        ))}
      <div className="text-sm whitespace-pre-line">{card.desc}</div>

      {card.banlist_info && (
        <div className="flex flex-col w-full">
          <Datatable>
            <Datatable.Head headers={["Game Type", "Ban Condition"]} />
            <Datatable.Body>
              <Datatable.Row index={0}>
                <Datatable.Data>{"TCG"}</Datatable.Data>
                <Datatable.Data>
                  {card.banlist_info.ban_tcg
                    ? card.banlist_info.ban_tcg
                    : "None"}
                </Datatable.Data>
              </Datatable.Row>
              <Datatable.Row index={1}>
                <Datatable.Data>{"OCG"}</Datatable.Data>
                <Datatable.Data>
                  {card.banlist_info.ban_ocg
                    ? card.banlist_info.ban_ocg
                    : "None"}
                </Datatable.Data>
              </Datatable.Row>
              <Datatable.Row index={2}>
                <Datatable.Data>{"GOAT"}</Datatable.Data>
                <Datatable.Data>
                  {card.banlist_info.ban_goat
                    ? card.banlist_info.ban_goat
                    : "None"}
                </Datatable.Data>
              </Datatable.Row>
            </Datatable.Body>
          </Datatable>
        </div>
      )}
      {card.card_sets && (
        <div className="flex flex-col w-full">
          <Datatable>
            <Datatable.Head headers={setHeaders} />
            <Datatable.Body>
              {card.card_sets?.map((set, index) => (
                <Datatable.Row index={index}>
                  <Datatable.Data>{set.set_code}</Datatable.Data>
                  <Datatable.Data>{set.set_name}</Datatable.Data>
                  <Datatable.Data>{`$${usdToMxn(
                    set.set_price
                  )} MXN`}</Datatable.Data>
                  <Datatable.Data>{set.set_rarity_code}</Datatable.Data>
                </Datatable.Row>
              ))}
            </Datatable.Body>
          </Datatable>
        </div>
      )}
      <div className="flex flex-col w-full">
        <Datatable>
          <Datatable.Head headers={priceHeaders} />
          <Datatable.Body>
            {convertPrices(card.card_prices[0]).map((market, index) => (
              <Datatable.Row index={index}>
                <Datatable.Data>{market.market}</Datatable.Data>
                <Datatable.Data>{`$${market.price} MXN`}</Datatable.Data>
              </Datatable.Row>
            ))}
          </Datatable.Body>
        </Datatable>
      </div>
    </div>
  );
};
