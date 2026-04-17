import "server-only";
import {
  ACCEPTED_UPLOAD_MIME_TYPES,
  MAX_TOTAL_UPLOAD_BYTES,
  formatBytes,
  isAcceptedMimeType,
} from "@/domain/upload";
import type { MailAttachment } from "./mailer";

export class AttachmentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AttachmentValidationError";
  }
}

export const extractFormDataFiles = (
  formData: FormData,
  field: string
): File[] => {
  const values = formData.getAll(field);
  const files: File[] = [];
  for (const value of values) {
    if (value instanceof File && value.size > 0) {
      files.push(value);
    }
  }
  return files;
};

export const buildMailAttachments = async (
  files: File[]
): Promise<MailAttachment[]> => {
  let total = 0;
  const attachments: MailAttachment[] = [];
  for (const file of files) {
    if (!isAcceptedMimeType(file.type)) {
      throw new AttachmentValidationError(
        `Formato no permitido: ${file.name}. Solo PDF e imágenes (${ACCEPTED_UPLOAD_MIME_TYPES.join(
          ", "
        )}).`
      );
    }
    total += file.size;
    if (total > MAX_TOTAL_UPLOAD_BYTES) {
      throw new AttachmentValidationError(
        `El tamaño total de los adjuntos supera ${formatBytes(
          MAX_TOTAL_UPLOAD_BYTES
        )}.`
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name,
      content: buffer,
      contentType: file.type,
    });
  }
  return attachments;
};
