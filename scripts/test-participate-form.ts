import { chromium } from "@playwright/test";
import { join } from "path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const FIXTURES = join(__dirname, "fixtures");

const sample = {
  idNumber: "1000987654",
  fullName: "Juan Vera Participa (prueba)",
  phone: "3001112233",
  email: "juan.vera+participa@bluhartmann.com",
};

async function main() {
  console.log(`→ Abriendo ${BASE_URL}/participate`);
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext()).newPage();

  const responses: { status: number; body: string }[] = [];
  page.on("response", async (res) => {
    if (res.url().includes("/api/participate")) {
      responses.push({ status: res.status(), body: await res.text() });
    }
  });
  page.on("pageerror", (err) => console.log(`[pageerror] ${err.message}`));

  await page.goto(`${BASE_URL}/participate`, { waitUntil: "networkidle" });

  // Step 1: pick profile
  console.log("→ Paso 1: selecciono 'Persona natural'");
  await page
    .getByRole("button", { name: /Persona natural/i })
    .first()
    .click();
  await page.waitForTimeout(300);

  // Siguiente → step 2
  await page.getByRole("button", { name: /^Siguiente$/i }).first().click();
  await page.waitForTimeout(300);

  // Siguiente → step 3
  await page.getByRole("button", { name: /^Siguiente$/i }).first().click();
  await page.waitForTimeout(500);

  // Step 3: fill form
  console.log("→ Paso 3: lleno formulario");
  const fillAndBlur = async (id: string, value: string) => {
    const loc = page.locator(`#${id}`);
    await loc.click();
    await loc.fill(value);
    await loc.press("Tab");
  };
  await fillAndBlur("idNumber", sample.idNumber);
  await fillAndBlur("fullName", sample.fullName);
  await fillAndBlur("phone", sample.phone);
  await fillAndBlur("email", sample.email);

  // Attach files
  console.log("→ Adjuntando sample.pdf + sample.png");
  await page
    .locator("#file-upload")
    .setInputFiles([
      join(FIXTURES, "sample.pdf"),
      join(FIXTURES, "sample.png"),
    ]);

  // Submit
  console.log("→ Enviando");
  await page.getByRole("button", { name: /^Enviar$/i }).click();

  try {
    await page.waitForResponse((r) => r.url().includes("/api/participate"), {
      timeout: 15000,
    });
  } catch {
    console.log("\n⚠ Sin respuesta del API");
    await page.screenshot({
      path: "scripts/fixtures/participate-debug.png",
      fullPage: true,
    });
  }
  await page.waitForTimeout(1500);

  console.log("\n=== Respuestas /api/participate ===");
  responses.forEach((r) => console.log(`status=${r.status} body=${r.body}`));

  const toasts = await page.locator('[role="alert"]').allTextContents();
  console.log("\n=== Toasts ===");
  toasts.forEach((t) => console.log(`• ${t.trim()}`));

  await browser.close();

  const ok = responses.length > 0 && responses.every((r) => r.status === 200);
  if (!ok) {
    console.error("\n✗ Participar falló");
    process.exit(1);
  }
  console.log(
    `\n✓ Participar respondió 200 (${responses.length} envío${
      responses.length === 1 ? "" : "s"
    }) — revisa tu bandeja`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
