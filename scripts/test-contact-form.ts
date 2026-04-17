import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const sample = {
  fullName: "Juan Vera (prueba automatizada)",
  phone: "3001234567",
  email: "juan.vera+test@bluhartmann.com",
  description:
    "Mensaje de prueba generado por Playwright para validar que el endpoint /api/contact envía correos vía Zoho SMTP.",
};

async function main() {
  console.log(`→ Abriendo ${BASE_URL}/about/contacts`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") console.log(`[browser error] ${msg.text()}`);
  });

  const apiResponses: { status: number; body: string }[] = [];
  page.on("response", async (res) => {
    if (res.url().includes("/api/contact")) {
      apiResponses.push({ status: res.status(), body: await res.text() });
    }
  });

  await page.goto(`${BASE_URL}/about/contacts`, { waitUntil: "networkidle" });

  console.log("→ Llenando formulario");
  await page.getByLabel("Nombre completo").fill(sample.fullName);
  await page.getByLabel("Teléfono").fill(sample.phone);
  await page.getByLabel("Correo electrónico").fill(sample.email);
  await page
    .getByLabel("Descripción de la solicitud")
    .fill(sample.description);

  console.log("→ Submit");
  await page.getByRole("button", { name: /enviar/i }).click();

  await page.waitForResponse(
    (res) => res.url().includes("/api/contact"),
    { timeout: 15000 }
  );

  await page.waitForTimeout(1500);

  const responses = apiResponses;
  console.log("\n=== Respuestas /api/contact ===");
  for (const r of responses) {
    console.log(`status=${r.status} body=${r.body}`);
  }

  const toast = await page
    .locator('[role="alert"], [data-toast]')
    .allTextContents();
  console.log("\n=== Toasts detectados ===");
  toast.forEach((t) => console.log(`• ${t.trim()}`));

  await browser.close();

  const allOk = responses.every((r) => r.status === 200);
  if (!allOk) {
    console.error("\n✗ Al menos una respuesta no fue 200");
    process.exit(1);
  }
  console.log("\n✓ /api/contact respondió 200 — revisa tu bandeja de entrada");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
