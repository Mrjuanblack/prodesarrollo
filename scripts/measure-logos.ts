import { chromium } from "@playwright/test";
import { mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const breakpoints = [
  { name: "mobile", width: 375, height: 700 },
  { name: "md", width: 800, height: 700 },
  { name: "lg", width: 1100, height: 800 },
  { name: "xl", width: 1366, height: 800 },
  { name: "2xl", width: 1536, height: 900 },
  { name: "fullhd", width: 1920, height: 1080 },
];

const outDir = join(__dirname, "fixtures", "logos");
mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const table: Array<{
    viewport: string;
    navbarH: number;
    navbarW: number;
    footerH: number;
    footerW: number;
    pageWidth: number;
  }> = [];

  for (const bp of breakpoints) {
    const ctx = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
    });
    // Suppress splash overlay so navbar is visible immediately.
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem(
          "prodesarrollo:lastSplashShown",
          String(Date.now())
        );
      } catch {}
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/home`, { waitUntil: "networkidle" });

    // Navbar logo
    const navbarLogo = page.locator(
      'header img[alt="ProDesarrollo"]'
    ).first();
    const navBox = await navbarLogo.boundingBox();

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);

    const footerLogo = page.locator('footer img[alt="ProDesarrollo"]').first();
    const footBox = await footerLogo.boundingBox();

    // Capture just navbar + footer areas
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page
      .locator("header")
      .first()
      .screenshot({ path: join(outDir, `${bp.name}-navbar.png`) });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await page
      .locator("footer")
      .first()
      .screenshot({ path: join(outDir, `${bp.name}-footer.png`) });

    table.push({
      viewport: `${bp.name} (${bp.width}px)`,
      navbarH: Math.round(navBox?.height ?? 0),
      navbarW: Math.round(navBox?.width ?? 0),
      footerH: Math.round(footBox?.height ?? 0),
      footerW: Math.round(footBox?.width ?? 0),
      pageWidth: bp.width,
    });

    await page.close();
  }

  await browser.close();

  console.log("\nLogo sizes across breakpoints");
  console.log("─".repeat(72));
  console.log(
    "Viewport".padEnd(22) +
      "Navbar (WxH)".padEnd(18) +
      "Footer (WxH)".padEnd(18) +
      "navbar/page"
  );
  console.log("─".repeat(72));
  for (const row of table) {
    const pct = ((row.navbarW / row.pageWidth) * 100).toFixed(1) + "%";
    console.log(
      row.viewport.padEnd(22) +
        `${row.navbarW}×${row.navbarH}`.padEnd(18) +
        `${row.footerW}×${row.footerH}`.padEnd(18) +
        pct
    );
  }
  console.log("─".repeat(72));
  console.log(`\nScreenshots: scripts/fixtures/logos/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
