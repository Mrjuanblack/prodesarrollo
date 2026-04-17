import { z } from "zod/v4";

export const MAX_TOTAL_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_UPLOAD_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const ACCEPTED_UPLOAD_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
] as const;

export type AcceptedMimeType = (typeof ACCEPTED_UPLOAD_MIME_TYPES)[number];

export const isAcceptedMimeType = (type: string): type is AcceptedMimeType =>
  (ACCEPTED_UPLOAD_MIME_TYPES as readonly string[]).includes(type);

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const uploadFilesSchema = z
  .array(z.instanceof(File))
  .superRefine((files, ctx) => {
    let total = 0;
    for (const file of files) {
      if (!isAcceptedMimeType(file.type)) {
        ctx.addIssue({
          code: "custom",
          message: `Formato no permitido: ${file.name}. Solo PDF e imágenes (jpg, png, webp, gif).`,
        });
        return;
      }
      total += file.size;
    }
    if (total > MAX_TOTAL_UPLOAD_BYTES) {
      ctx.addIssue({
        code: "custom",
        message: `El tamaño total de los adjuntos supera ${formatBytes(
          MAX_TOTAL_UPLOAD_BYTES
        )}.`,
      });
    }
  });
