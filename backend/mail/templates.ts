import "server-only";
import type { SendRequestFormType } from "@/domain/contact";
import type { SubmitPqrsFormType } from "@/domain/pqrs";
import type { SubmitParticipateFormType } from "@/domain/participate";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const row = (label: string, value: string): string => `
  <tr>
    <td style="padding:8px 12px;background:#f5f7fb;border:1px solid #e5e7eb;font-weight:600;color:#111827;width:200px">${escapeHtml(
      label
    )}</td>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;color:#111827">${escapeHtml(
      value
    )}</td>
  </tr>`;

const wrap = (title: string, bodyRows: string, description?: string): string => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#ffffff">
    <h2 style="color:#1e3a8a;margin:0 0 16px">${escapeHtml(title)}</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${bodyRows}</table>
    ${
      description
        ? `<div style="margin-top:16px"><h3 style="color:#1e3a8a;font-size:14px;margin:0 0 6px">Descripción</h3><p style="white-space:pre-wrap;background:#f5f7fb;border:1px solid #e5e7eb;padding:12px;border-radius:6px;color:#111827;margin:0">${escapeHtml(
            description
          )}</p></div>`
        : ""
    }
    <p style="color:#6b7280;font-size:12px;margin-top:24px">Correo generado automáticamente por el sitio web de ProDesarrollo.</p>
  </div>`;

export const renderContactEmail = (data: SendRequestFormType): string =>
  wrap(
    "Nueva solicitud de contacto",
    [
      row("Nombre completo", data.fullName),
      row("Correo", data.email),
      row("Teléfono", data.phone),
    ].join(""),
    data.description
  );

export const renderPqrsEmail = (data: SubmitPqrsFormType): string =>
  wrap(
    `Nueva PQRS: ${data.requestType}`,
    [
      row("Tipo de solicitud", data.requestType),
      row("Tipo de identificación", data.idType),
      row("Número de identificación", data.idNumber),
      row("Nombre completo", data.fullName),
      row("Correo", data.email),
      row("Teléfono", data.phone),
    ].join(""),
    data.description
  );

export const renderParticipateEmail = (
  data: SubmitParticipateFormType
): string =>
  wrap(
    `Nueva inscripción — ${data.profileType}`,
    [
      row("Tipo de persona", data.profileType),
      row("Tipo de identificación", data.idType),
      row("Número de identificación", data.idNumber),
      row("Nombre completo", data.fullName),
      row("Correo", data.email),
      row("Teléfono", data.phone),
    ].join("")
  );
