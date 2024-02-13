import { NextRequest } from "next/server";
import { chromium } from "@playwright/test";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cardName = searchParams.get("card_name");

  if (cardName == null || cardName == "")
    return Response.json({}, { status: 400 });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const cardNameUrified = cardName.replace(" ", "_");
  await page.goto(
    `https://yugipedia.com/wiki/Card_Rulings:${cardNameUrified}`,
    {
      waitUntil: "load",
    },
  );

  const element = await page.waitForSelector("#mw-content-text > div");

  if (element) {
    let html = await element?.evaluate((selector) => {
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

    if (html == null) return Response.json({ html: null }, { status: 200 });

    if (html.includes("There is currently no text in this page"))
      return Response.json({ html: null }, { status: 200 });

    html = html.replace(new RegExp(/(\/wiki\/)/g), "/list?search=");
    html = html.replace(
      new RegExp(/(href=\"\/list)/g),
      'target="_blank" href="/list',
    );

    await browser.close();

    return Response.json({ html: JSON.stringify(html) });
  }

  await browser.close();

  return Response.json({ html: null }, { status: 400 });
}
