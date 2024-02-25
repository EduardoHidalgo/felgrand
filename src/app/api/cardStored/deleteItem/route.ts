import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id == null)
    throw new Error("Id was null, unable to delete cardStoredItem.");

  try {
    await prisma.storedCardItem.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.log({ error });
    return Response.json(null, { status: 400 });
  }
}
