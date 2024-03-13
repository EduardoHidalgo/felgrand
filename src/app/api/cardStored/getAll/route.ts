import prisma from "@/lib/prisma";
import {
  StoredCardCombined,
  StoreStatus,
  CardLanguage,
  Ban,
  CardType,
  Race,
  SetRarityCode,
  CTPrice,
} from "@/types";

export async function GET() {
  try {
    const result = await prisma.storedCard.findMany({
      include: {
        items: {
          include: {
            ctPrices: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const list: Array<StoredCardCombined> = [];
    for (let c = 0; c < result.length; c++) {
      const card = result[c];
      const {
        archetype,
        banType,
        cardType,
        importance,
        items,
        name,
        priority,
        race,
      } = card;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const {
          boughtValue,
          condition,
          count,
          id,
          language,
          rarityCode,
          setCode,
          setName,
          status,
          storageGroup,
          storedCardId,
          value,
          wantedCount,
          ctPrices,
        } = item;

        const prices: Omit<CTPrice, "storedCardItemId"> | null =
          ctPrices !== null
            ? {
                betterPrice: ctPrices.betterPrice
                  ? ctPrices.betterPrice.toNumber()
                  : null,
                marketPrice: ctPrices.marketPrice
                  ? ctPrices.marketPrice.toNumber()
                  : null,
                minPrice: ctPrices.minPrice
                  ? ctPrices.minPrice.toNumber()
                  : null,
              }
            : null;

        list.push({
          archetype,
          banType: banType as keyof typeof Ban,
          boughtValue: boughtValue.toNumber(),
          cardType: cardType as CardType,
          condition,
          count,
          importance,
          language: language as CardLanguage,
          name,
          prices,
          priority,
          race: race as keyof typeof Race,
          rarityCode: rarityCode as SetRarityCode,
          setCode: setCode ? setCode : "",
          setName: setName ? setName : "",
          status: status as StoreStatus,
          storageGroup: storageGroup ? storageGroup : "",
          storedCardId,
          storedCardItemId: id,
          value: value.toNumber(),
          wantedCount,
        });
      }
    }

    return Response.json(list, {
      status: 200,
    });
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
}
