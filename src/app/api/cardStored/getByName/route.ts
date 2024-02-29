import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

import { StoredCardItem, StoredCardItemData } from "@/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cardName = searchParams.get("card_name");

  try {
    if (cardName == null)
      throw new Error(
        "card_name parameter was null, unable to request cardStored/getByName",
      );

    const card = await prisma.storedCard.findFirst({
      where: {
        name: cardName,
      },
      include: {
        items: true,
      },
    });

    if (card == null)
      return Response.json(null, {
        status: 200,
      });

    const avgValue = card.items.reduce(
      (sum, { value, count }) => (sum += count * value.toNumber()),
      0,
    );
    const countSum = card.items.reduce((sum, { count }) => (sum += count), 0);
    const wantedCountSum = card.items.reduce(
      (sum, { wantedCount }) => (sum += wantedCount),
      0,
    );

    const items: Array<StoredCardItemData> = card.items.map((item) => {
      return {
        ...item,
        boughtValue: item.boughtValue.toNumber(),
        value: item.value.toNumber(),
      } as StoredCardItemData;
    });

    const response = {
      ...card,
      avgValue,
      countSum,
      items,
      wantedCountSum,
    } as StoredCardItem;

    return Response.json(response as StoredCardItem, {
      status: 200,
    });
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
}
