import { NextRequest } from "next/server";
import { AddStoredCardBody } from "@/types";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const request = await req.text();
  const body = JSON.parse(request) as AddStoredCardBody;

  try {
    const card = await prisma.storedCard.create({
      data: body,
    });

    return Response.json(card, { status: 200 });
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
}
