import { NextRequest } from "next/server";
import { ElementHandle, chromium } from "@playwright/test";

//https://localhost:3002/api/prices/card-trader?set_name=Duel%20Power&rarity=Ultra%20Rare&card_name=Blue-Eyes%20Chaos%20MAX%20Dragon
export async function GET(request: NextRequest) {
  let response: Response | null = null;

  const browser = await chromium.launch({
    headless: true,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  try {
    const searchParams = request.nextUrl.searchParams;
    const cardName = searchParams.get("card_name");
    const setName = searchParams.get("set_name");
    const rarity = searchParams.get("rarity");

    if (
      cardName == null ||
      setName == null ||
      rarity == null ||
      cardName == "" ||
      setName == "" ||
      rarity == ""
    ) {
      throw new Error("Empty of null parameters");
    }

    await page.goto("https://www.cardtrader.com/en/yu-gi-oh", {
      waitUntil: "load",
    });

    const manaSearch = await page.waitForSelector(
      "#manasearch-input:not([disabled])",
      { timeout: 5000 },
    );

    if (manaSearch == null || manaSearch == undefined) {
      throw new Error(
        "Browser manasearch timeout or not found, unable to get price.",
      );
    }

    await manaSearch.fill(cardName);

    const viewAllButton = await page.waitForSelector(".manasearch__view-all");

    await viewAllButton.click();
    await page.waitForNavigation();
    await page.waitForSelector("#nav-tabContent");

    const founds = await page.$$("h5.mb-0");

    let parent: ElementHandle | null = null;
    for (let index = 0; index < founds.length; index++) {
      const element = founds[index] as ElementHandle<HTMLElement>;
      const innerHTML = await element.innerHTML();

      if (innerHTML.includes(rarity) && innerHTML.includes(setName)) {
        parent = await element.$("..");
        break;
      }
    }

    if (parent == null) {
      throw Error(
        "List of selling cards doesn't contain this rarity and setName.",
      );
    }
    const allItemsButton = await parent.$("a");
    if (allItemsButton == null) {
      throw Error("Unable to find allItemsButton.");
    }

    await allItemsButton.click();

    const blueprint = await page.waitForSelector(".blueprint-info-container");
    await page.waitForSelector(".products-table");

    const priceBoxes = await blueprint.$$(".price-box");

    if (priceBoxes.length >= 2) {
      const minPriceLabel = await priceBoxes[0].$(".price-box__price");
      const marketPriceLabel = await priceBoxes[1].$(".price-box__price");

      if (minPriceLabel && marketPriceLabel) {
        const minPriceInnerHtml = (await minPriceLabel.innerHTML()).toString();
        const marketPriceInnerHtml = (
          await marketPriceLabel.innerHTML()
        ).toString();

        response = Response.json(
          {
            marketPrice: Number(marketPriceInnerHtml.replace("M$", "")),
            minPrice: Number(minPriceInnerHtml.replace("M$", "")),
          },
          { status: 200 },
        );
      } else {
        throw new Error("PriceBoxes Min and Market not found");
      }
    } else {
      throw new Error("PriceBoxes not found");
    }
  } catch (error) {
    console.error(error);
    response = Response.json(null, { status: 400 });
  } finally {
    await page.close();
    await browser.close();

    return response;
  }
}
