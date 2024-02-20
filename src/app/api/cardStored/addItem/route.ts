import { NextRequest } from "next/server";
import { NewStoredCardItemBody } from "@/types";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const request = await req.text();
  const body = JSON.parse(request) as NewStoredCardItemBody;

  try {
    const result = await prisma.storedCardItem.create({
      data: body,
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log({ error });
    return Response.json(null, { status: 400 });
  }
}
