import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  await page.goto(`${BASE_URL}/home`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const footer = page.locator("footer").first();
  await footer.screenshot({ path: "scripts/fixtures/footer.png" });
  console.log("wrote scripts/fixtures/footer.png");
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
