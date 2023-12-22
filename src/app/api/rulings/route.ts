import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cardName = searchParams.get("card_name");

  if (cardName == null || cardName == "")
    return Response.json({}, { status: 400 });

  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  const cardNameUrified = cardName.replace(" ", "_");
  await page.goto(
    `https://yugipedia.com/wiki/Card_Rulings:${cardNameUrified}`,
    {
      waitUntil: "networkidle2",
    }
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
      selector.querySelector(".mw-references-wrap")?.remove();

      if (selector.hasChildNodes() == false) return null;

      return selector.innerHTML;
    });

    if (html == null) return Response.json({ html: null }, { status: 200 });

    if (html.includes("There is currently no text in this page"))
      return Response.json({ html: null }, { status: 200 });

    html.replace("/wiki", "https://yugipedia.com/wiki");

    return Response.json({ html: JSON.stringify(html) });
  }

  return Response.json({ html: null }, { status: 400 });
}
