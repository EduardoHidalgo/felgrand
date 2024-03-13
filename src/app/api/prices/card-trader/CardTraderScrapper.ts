import { Browser, ElementHandle, Page, chromium } from "@playwright/test";
import { CTPrices } from "@prisma/client";
import prisma from "@/lib/prisma";

import { GetPriceArgs } from "@/types";
import { similarity } from "@/utils/similarity";

export class CardTraderScrapper {
  private SIMILARITY_ACCEPTABLE_VALUE = 0.5;
  private ONE_DAY_IN_MS = 86400000;
  private REVALIDATION_TIME = this.ONE_DAY_IN_MS;

  private isRevalidationTimePassed: boolean = false;
  private prices: CTPrices | null = null;
  public response: Response | null = null;

  private browser: Browser | null = null;
  private cardName: string;
  private page: Page | null = null;
  private rarity: string;
  private setCode: string;
  private setName: string;
  private storedCardItemId: number | null;

  constructor({
    cardName,
    rarity,
    setCode,
    setName,
    storedCardItemId,
  }: GetPriceArgs & { storedCardItemId: string | null }) {
    this.cardName = cardName;
    this.rarity = rarity;
    this.setCode = setCode;
    this.setName = setName;
    this.storedCardItemId = storedCardItemId ? Number(storedCardItemId) : null;
  }

  public async executePriceScrapping() {
    await this.revalidatePrices();

    this.logRevalidationStates();

    if (this.prices != null && this.isRevalidationTimePassed == false) {
      this.response = Response.json(this.prices, { status: 200 });
      return;
    }

    const initScrapperSuccess = await this.initScrapper();
    if (initScrapperSuccess) {
      try {
        const viewAllButton = await this.browseCard();
        if (viewAllButton == null) return;

        const navigationResult = await this.goToResultsPage(viewAllButton);
        if (navigationResult == null) return;

        if (navigationResult == "allResults") {
          const selectCardInAllResultsListSuccess =
            await this.selectCardInAllResultsList();
          if (selectCardInAllResultsListSuccess == false) return;

          await this.findPriceBoxes();
        }

        if (navigationResult == "oneResult") {
          await this.findPriceBoxes();
        }

        console.log("Finished successfully.");
      } catch (error) {
        this.response = Response.json(null, { status: 400 });
      } finally {
        await this.cleanStates();
      }
    }
  }

  private async cleanStates() {
    await this.page?.close();
    await this.browser?.close();
  }

  private async revalidatePrices() {
    try {
      const found = await prisma.cTPrices.findFirst({
        where: {
          cardName: this.cardName,
          setName: this.setName,
          rarity: this.rarity,
        },
      });

      if (found) {
        const updatedAtWithRevalidationTime =
          found.updatedAt.getTime() + this.REVALIDATION_TIME;
        this.isRevalidationTimePassed =
          new Date().getTime() >= updatedAtWithRevalidationTime;

        this.prices = found;
        await this.updateWithStoredCardItemId();
      }
    } catch (error) {
      console.error(error);
      this.response = Response.json(null, { status: 400 });
    }
  }

  private updateWithStoredCardItemId = async () => {
    if (this.prices && this.storedCardItemId)
      this.prices = await prisma.cTPrices.update({
        where: {
          id: this.prices.id,
        },
        data: {
          storedCardItemId: this.storedCardItemId,
        },
      });
  };

  private logRevalidationStates() {
    if (this.prices != null && this.isRevalidationTimePassed == false) {
      console.log("obtained prices by cache. returning.");
    }

    if (this.prices == null) console.log("Prices was null, doing scrap.");
    if (this.prices == null && this.isRevalidationTimePassed == true)
      console.log("Price revalidation time passed, doing scrap.");

    console.log("Starting scrap.");
  }

  private async initScrapper(): Promise<boolean> {
    try {
      this.browser = await chromium.launch({
        headless: true,
        args: ["--start-maximized"],
      });
      this.page = await this.browser.newPage();

      return true;
    } catch (error) {
      console.error(error);
      this.response = Response.json(null, { status: 400 });

      return false;
    }
  }

  private async browseCard(): Promise<ElementHandle<
    SVGElement | HTMLElement
  > | null> {
    if (this.page == null) return null;

    try {
      await this.page.goto("https://www.cardtrader.com/en/yu-gi-oh", {
        waitUntil: "load",
      });

      const manaSearch = await this.page.waitForSelector(
        "#manasearch-input:not([disabled])",
        { timeout: 10000 },
      );

      if (manaSearch == null || manaSearch == undefined) {
        throw new Error(
          "Browser manasearch timeout or not found, unable to get price.",
        );
      }

      await this.page.getByRole("button", { name: "Reject" }).first().click();

      const setCodeSplitted = this.setCode.split("-")[0];
      await manaSearch.fill(`${this.cardName} ${setCodeSplitted}`);

      const viewAllButton = await this.page.waitForSelector(
        ".manasearch__view-all",
      );

      return viewAllButton;
    } catch (error) {
      console.error(error);
      this.response = Response.json(null, { status: 400 });

      return null;
    }
  }

  private async goToResultsPage(
    viewAllButton: ElementHandle<SVGElement | HTMLElement>,
  ): Promise<"allResults" | "oneResult" | null> {
    if (this.page == null) return null;

    try {
      const viewAllButtonInnerHTML = await viewAllButton.innerText();

      await viewAllButton.click();
      await this.page.waitForNavigation();

      if (viewAllButtonInnerHTML !== "View all 1 results") {
        return "allResults";
      } else {
        return "oneResult";
      }
    } catch (error) {
      console.error(error);
      this.response = Response.json(null, { status: 400 });

      return null;
    }
  }

  private async selectCardInAllResultsList(): Promise<boolean> {
    if (this.page == null) return false;

    try {
      await this.page.waitForSelector("#nav-tabContent");

      const founds = await this.page.$$("h5.mb-0");

      let parent: ElementHandle | null = null;
      let highestSimilarity: number | null = 0;
      for (let index = 0; index < founds.length; index++) {
        const element = founds[index] as ElementHandle<HTMLElement>;
        const innerHTML = await element.innerText();
        const replacedInner = innerHTML
          .replace(this.cardName, "")
          .replace(this.rarity, "");

        const similarityValue = similarity(replacedInner, this.setName);

        console.log("innerHTML:", innerHTML);
        console.log("similarity:", similarityValue.toFixed(4), replacedInner);

        const similarityCondition =
          similarityValue > this.SIMILARITY_ACCEPTABLE_VALUE &&
          similarityValue > highestSimilarity;

        if (innerHTML.includes(this.rarity) && similarityCondition) {
          highestSimilarity = similarityValue;
          parent = await element.$("..");
        } else if (similarityCondition) {
          highestSimilarity = similarityValue;
          parent = await element.$("..");
        }
      }

      console.log({ highestSimilarity });

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

      return true;
    } catch (error) {
      console.error(error);
      this.response = Response.json(null, { status: 400 });

      return false;
    }
  }

  private async findPriceBoxes(): Promise<void> {
    if (this.page == null) return;

    try {
      const blueprint = await this.page.waitForSelector(
        ".blueprint-info-container",
      );
      await this.page.waitForSelector(".products-table");
      const priceBoxes = await blueprint.$$(".price-box");

      if (priceBoxes.length >= 2) {
        const minPriceLabel = await priceBoxes[0].$(".price-box__price");
        const marketPriceLabel = await priceBoxes[1].$(".price-box__price");
        const betterPriceLabel = await this.page.waitForSelector(".best-deal");

        const minPriceValue = minPriceLabel
          ? await minPriceLabel.innerHTML()
          : null;
        const marketPriceValue = marketPriceLabel
          ? await marketPriceLabel.innerHTML()
          : null;
        const betterPriceValue = await betterPriceLabel.textContent();

        const marketPrice = marketPriceValue
          ? Number(marketPriceValue.replace("M$", ""))
          : null;
        const minPrice = minPriceValue
          ? Number(minPriceValue.replace("M$", ""))
          : null;
        const betterPrice = betterPriceValue
          ? Number(betterPriceValue.replace("M$", ""))
          : null;

        await this.storePrices({
          betterPrice,
          marketPrice,
          minPrice,
        });

        this.response = Response.json(this.prices, { status: 200 });
      } else {
        throw new Error("PriceBoxes not found");
      }

      return;
    } catch (error) {
      console.error(error);
      this.response = Response.json(null, { status: 400 });

      return;
    }
  }

  private async storePrices(prices: {
    marketPrice: number | null;
    minPrice: number | null;
    betterPrice: number | null;
  }) {
    const { betterPrice, marketPrice, minPrice } = prices;

    if (this.prices) {
      this.prices = await prisma.cTPrices.update({
        where: {
          id: this.prices.id,
        },
        data: {
          betterPrice,
          cardName: this.cardName,
          marketPrice,
          minPrice,
          rarity: this.rarity,
          setName: this.setName,
          storedCardItemId: this.storedCardItemId,
        },
      });
    } else {
      this.prices = await prisma.cTPrices.create({
        data: {
          betterPrice,
          cardName: this.cardName,
          marketPrice,
          minPrice,
          rarity: this.rarity,
          setName: this.setName,
          storedCardItemId: this.storedCardItemId,
        },
      });
    }
  }
}
