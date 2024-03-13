import { NextRequest } from "next/server";
import { NewStoredCardItemBody, SetRarityCode } from "@/types";
import prisma from "@/lib/prisma";
import { rarityCodeToName } from "@/utils/rarityCodeToName";

export async function POST(req: NextRequest) {
  const request = await req.text();
  const body = JSON.parse(request) as NewStoredCardItemBody;

  try {
    const result = await prisma.storedCardItem.create({
      data: body,
    });

    const storedCard = await prisma.storedCard.findFirst({
      where: {
        items: {
          some: {
            id: result.id,
          },
        },
      },
    });

    if (storedCard) {
      const priceFound = await prisma.cTPrices.findFirst({
        where: {
          cardName: storedCard.name,
          setName: result.setName ? result.setName : undefined,
          rarity: result.rarityCode
            ? rarityCodeToName(result.rarityCode as SetRarityCode)
            : undefined,
        },
      });

      if (priceFound && priceFound.storedCardItemId == null) {
        await prisma.cTPrices.update({
          data: {
            storedCardItemId: result.id,
          },
          where: {
            id: priceFound.id,
          },
        });
      }
    }

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log({ error });
    return Response.json(null, { status: 400 });
  }
}
