import { NextRequest } from "next/server";
import { CardTraderScrapper } from "./CardTraderScrapper";

//https://localhost:3002/api/prices/card-trader?set_name=Duel%20Power&rarity=Ultra%20Rare&card_name=Blue-Eyes%20Chaos%20MAX%20Dragon
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cardName = searchParams.get("card_name");
  const rarity = searchParams.get("rarity");
  const setCode = searchParams.get("set_code");
  const setName = searchParams.get("set_name");
  const storedCardItemId = searchParams.get("stored_card_item_id");

  console.log("url:", request.nextUrl.toString());
  console.log("params:", {
    cardName,
    rarity,
    setCode,
    setName,
    storedCardItemId,
  });

  try {
    if (
      cardName == "" ||
      cardName == null ||
      rarity == "" ||
      rarity == null ||
      setName == "" ||
      setName == null ||
      setCode == "" ||
      setCode == null ||
      storedCardItemId == ""
    ) {
      throw new Error("Empty of null parameters");
    }

    const scrapper = new CardTraderScrapper({
      cardName: decodeURIComponent(cardName),
      rarity,
      setCode,
      setName,
      storedCardItemId,
    });

    await scrapper.executePriceScrapping();

    return scrapper.response
      ? scrapper.response
      : Response.json(null, { status: 400 });
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 400 });
  }
}
