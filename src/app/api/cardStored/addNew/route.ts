import { NextRequest } from "next/server";
import { AddNewStoredCard, Importance, Priority } from "@/types";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const request = await req.text();
  const body = JSON.parse(request) as AddNewStoredCard;

  try {
    const card = await prisma.storedCard.create({
      data: {
        importance: Importance.NotDefined,
        priority: Priority.NotDefined,
        ...body,
      },
    });

    return Response.json(card, { status: 200 });
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
}
