import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { submitParticipateFormSchema } from "@/domain/participate";
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
      profileType: formData.get("profileType"),
      idType: formData.get("idType"),
      idNumber: formData.get("idNumber"),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    };

    const validated = submitParticipateFormSchema.parse(raw);
    const files = extractFormDataFiles(formData, "files");
    const attachments = await buildMailAttachments(files);

    await MailService.sendParticipateRequest(validated, attachments);
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
    console.error("[/api/participate] failed:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el formulario. Intenta más tarde." },
      { status: 500 }
    );
  }
}
