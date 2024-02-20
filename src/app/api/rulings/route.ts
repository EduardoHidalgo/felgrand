import { NextRequest } from "next/server";
import { chromium } from "@playwright/test";

export async function GET(request: NextRequest) {
  let response: Response | null = null;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const searchParams = request.nextUrl.searchParams;
    const cardName = searchParams.get("card_name");

    if (cardName == null || cardName == "") {
      throw new Error("Empty of null parameters");
    }

    const cardNameUrified = cardName.replace(" ", "_");
    await page.goto(
      `https://yugipedia.com/wiki/Card_Rulings:${cardNameUrified}`,
      {
        waitUntil: "load",
      },
    );

    const element = await page.waitForSelector("#mw-content-text > div");

    if (element == null || element == undefined) {
      throw new Error("Browser element not found, unable to get data.");
    }

    let html = await element.evaluate((selector) => {
      selector.querySelector(".mobile-show")?.remove();
      selector.querySelector(".navbox-styles")?.remove();
      selector.querySelector(".navbox")?.remove();
      selector.querySelectorAll("h3").forEach((el) => el.remove());
      selector.querySelectorAll("h2").forEach((el) => el.remove());
      selector.querySelectorAll("style").forEach((el) => el.remove());
      selector.querySelectorAll("table").forEach((el) => el.remove());
      selector
        .querySelectorAll(".mw-references-wrap")
        .forEach((el) => el.remove());

      selector.childNodes.forEach((node) => {
        if (node.nodeType == 1) {
          const el = node as HTMLElement;
          el.removeAttribute("style");
        }
      });

      if (selector.hasChildNodes() == false) return null;

      return selector.innerHTML.toString();
    });

    if (html == null) {
      throw new Error("HTML returned null");
    }

    const noTextPage = "There is currently no text in this page";
    if (html.includes(noTextPage)) {
      response = Response.json({ html: null }, { status: 200 });
      return;
    }

    html = html.replace(new RegExp(/(\/wiki\/)/g), "/list?search=");
    html = html.replace(
      new RegExp(/(href=\"\/list)/g),
      'target="_blank" href="/list',
    );

    response = Response.json({ html: JSON.stringify(html) }, { status: 200 });
  } catch (error) {
    console.error(error);
    response = Response.json({ html: null }, { status: 400 });
  } finally {
    await page.close();
    await browser.close();

    return response;
  }
}
