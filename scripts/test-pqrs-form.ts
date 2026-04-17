import { chromium } from "@playwright/test";
import { join } from "path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const FIXTURES = join(__dirname, "fixtures");

const sample = {
  idNumber: "1000123456",
  fullName: "Juan Vera PQRS (prueba)",
  phone: "3009876543",
  email: "juan.vera+pqrs@bluhartmann.com",
  description:
    "Mensaje de prueba PQRS generado por Playwright. Incluye un PDF y una imagen como adjuntos para validar el flujo completo.",
};

async function main() {
  console.log(`→ Abriendo ${BASE_URL}/pqrs`);
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext()).newPage();

  const responses: { status: number; body: string }[] = [];
  page.on("response", async (res) => {
    if (res.url().includes("/api/pqrs")) {
      responses.push({ status: res.status(), body: await res.text() });
    }
  });
  page.on("console", (msg) => {
    console.log(`[browser ${msg.type()}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => console.log(`[pageerror] ${err.message}`));

  await page.goto(`${BASE_URL}/pqrs`, { waitUntil: "networkidle" });

  // Step 1: pick a card
  console.log("→ Paso 1: selecciono 'Petición'");
  await page
    .getByRole("button", { name: /Petición/i, pressed: false })
    .first()
    .click();

  // Advance to step 2
  await page.getByRole("button", { name: /^Siguiente$/i }).click();
  await page.waitForTimeout(300);

  // Step 2: fill form
  console.log("→ Paso 2: lleno formulario");
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
  await fillAndBlur("description", sample.description);

  // Attach files via the hidden input
  console.log("→ Adjuntando sample.pdf + sample.png");
  await page
    .locator("#file-upload")
    .setInputFiles([
      join(FIXTURES, "sample.pdf"),
      join(FIXTURES, "sample.png"),
    ]);

  // Submit
  console.log("→ Enviando");
  await page.getByRole("button", { name: /Enviar solicitud/i }).click();

  try {
    await page.waitForResponse((r) => r.url().includes("/api/pqrs"), {
      timeout: 15000,
    });
  } catch {
    console.log("\n⚠ Sin respuesta del API — capturando estado");
    await page.screenshot({ path: "scripts/fixtures/pqrs-debug.png", fullPage: true });
    const errors = await page
      .locator(".text-danger, [aria-invalid='true']")
      .allTextContents();
    console.log("Errores visibles:", errors);
    const toasts = await page.locator('[role="alert"]').allTextContents();
    console.log("Toasts:", toasts);
  }
  await page.waitForTimeout(1500);

  console.log("\n=== Respuestas /api/pqrs ===");
  responses.forEach((r) => console.log(`status=${r.status} body=${r.body}`));

  const toasts = await page.locator('[role="alert"]').allTextContents();
  console.log("\n=== Toasts ===");
  toasts.forEach((t) => console.log(`• ${t.trim()}`));

  await browser.close();

  const ok = responses.length > 0 && responses.every((r) => r.status === 200);
  if (!ok) {
    console.error("\n✗ PQRS falló");
    process.exit(1);
  }
  console.log(
    `\n✓ PQRS respondió 200 (${responses.length} envío${
      responses.length === 1 ? "" : "s"
    }) — revisa tu bandeja`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
