import { NextRequest } from "next/server";
import { UpdateStoredCard } from "@/types";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  const request = await req.text();
  const body = JSON.parse(request) as UpdateStoredCard;

  try {
    const result = await prisma.storedCard.update({
      data: {
        archetype: body.archetype,
        importance: body.importance,
        priority: body.priority,
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
