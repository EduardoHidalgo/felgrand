import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

import { StoredCardCombined } from "@/types";

export async function PUT(req: NextRequest) {
  const request = await req.text();
  const body = JSON.parse(request) as StoredCardCombined;

  try {
    await prisma.storedCard.update({
      data: {
        archetype: body.archetype,
        banType: body.banType,
        importance: body.importance,
        priority: body.priority,
      },
      where: {
        id: body.storedCardId,
      },
    });

    await prisma.storedCardItem.update({
      data: {
        boughtValue: body.boughtValue,
        condition: body.condition,
        count: body.count,
        language: body.language,
        status: body.status,
        storageGroup: body.storageGroup,
        value: body.value,
        wantedCount: body.wantedCount,
      },
      where: {
        id: body.storedCardItemId,
      },
    });

    return Response.json(body, { status: 200 });
  } catch (error) {
    console.log({ error });
    return Response.json(null, { status: 400 });
  }
}
