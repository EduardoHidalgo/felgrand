import { NextRequest } from "next/server";
import { UpdateRowStoredCardItem } from "@/types";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  const request = await req.text();
  const body = JSON.parse(request) as UpdateRowStoredCardItem;

  try {
    const result = await prisma.storedCardItem.update({
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
        id: body.id,
      },
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log({ error });
    return Response.json(null, { status: 400 });
  }
}
