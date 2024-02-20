import prisma from "@/lib/prisma";
import { GetStoredCardInventory } from "@/types";

export async function GET() {
  try {
    const result = await prisma.storedCard.findMany({
      select: { name: true },
    });

    const response: GetStoredCardInventory = {
      inventory: result.map((item) => {
        return {
          name: item.name,
        };
      }),
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
}
