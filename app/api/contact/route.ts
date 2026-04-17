import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { sendRequestFormSchema } from "@/domain/contact";
import { MailService } from "@/backend/mail/mail-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = sendRequestFormSchema.parse(body);
    await MailService.sendContactRequest(validated);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: z.treeifyError(error) },
        { status: 400 }
      );
    }
    console.error("[/api/contact] failed:", error);
    return NextResponse.json(
      { error: "No se pudo enviar la solicitud. Intenta más tarde." },
      { status: 500 }
    );
  }
}
