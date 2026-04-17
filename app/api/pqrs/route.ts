import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { submitPqrsFormSchema } from "@/domain/pqrs";
import { MailService } from "@/backend/mail/mail-service";
import {
  AttachmentValidationError,
  buildMailAttachments,
  extractFormDataFiles,
} from "@/backend/mail/form-attachments";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const raw = {
      requestType: formData.get("requestType"),
      idType: formData.get("idType"),
      idNumber: formData.get("idNumber"),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      description: formData.get("description"),
    };

    const validated = submitPqrsFormSchema.parse(raw);
    const files = extractFormDataFiles(formData, "files");
    const attachments = await buildMailAttachments(files);

    await MailService.sendPqrsRequest(validated, attachments);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: z.treeifyError(error) },
        { status: 400 }
      );
    }
    if (error instanceof AttachmentValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("[/api/pqrs] failed:", error);
    return NextResponse.json(
      { error: "No se pudo enviar la PQRS. Intenta más tarde." },
      { status: 500 }
    );
  }
}
