import { NextResponse } from "next/server";
import { requireRole } from "@/backend/utilities/auth/requireRole";
import { UserRole } from "@/domain/user";
import { NewsInlineImageService } from "@/backend/services/news-inline-image-service";

// Admin-only endpoint used by the rich-text editor when the user inserts an
// image inline in a news article body. Returns the public URL so the editor
// can render an <img> tag pointing at it. The row is created with newsId=null
// and gets claimed when the news is saved.
export async function POST(request: Request) {
  try {
    const auth = await requireRole([UserRole.ADMIN, UserRole.ADMIN_NEWS]);
    if (auth instanceof NextResponse) return auth;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "La imagen es requerida" },
        { status: 400 }
      );
    }

    const result = await NewsInlineImageService.upload(file);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/news/inline-image] failed:", error);
    return NextResponse.json(
      { error: "No se pudo subir la imagen" },
      { status: 500 }
    );
  }
}
