import prisma from "@/lib/prisma";
import { StoredCardData, StoredCardList, StoredCardItemData } from "@/types";

export async function GET() {
  try {
    const result = await prisma.storedCard.findMany({
      include: {
        items: true,
      },
    });

    const response: StoredCardList = result.map((card) => {
      const avgValue = card.items.reduce(
        (sum, { value }) => (sum += value.toNumber()),
        0,
      );
      const countSum = card.items.reduce((sum, { count }) => (sum += count), 0);
      const wantedCountSum = card.items.reduce(
        (sum, { wantedCount }) => (sum += wantedCount),
        0,
      );

      const items: Array<StoredCardItemData> = card.items.map((item) => {
        return {
          ...item,
          boughtValue: item.boughtValue.toNumber(),
          value: item.value.toNumber(),
        } as StoredCardItemData;
      });

      return {
        ...card,
        avgValue,
        countSum,
        items,
        wantedCountSum,
      } as StoredCardData & {
        items: Array<StoredCardItemData>;
      };
    });

    return Response.json(response, {
      status: 200,
    });
  } catch (error) {
    return Response.json(null, { status: 400 });
  }
}
