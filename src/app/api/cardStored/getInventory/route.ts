import prisma from "@/lib/prisma";
import { GetStoredCardInventory } from "@/types";

export async function GET() {
  try {
    const result = await prisma.storedCard.findMany({
      select: { yugiohId: true },
    });

    const response: GetStoredCardInventory = {
      inventory: result.map((item) => {
        return {
          id: item.yugiohId,
        };
      }),
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
}
