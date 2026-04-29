import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { requireRole } from "@/backend/utilities/auth/requireRole";
import { UserRole } from "@/domain/user";
import { HomeCarouselService } from "@/backend/services/home-carousel-service";
import { slideCardsSchema } from "@/domain/HomeCarouselSlide";

// Public endpoint — used by the home page to render the carousel.
export async function GET() {
  try {
    const slides = await HomeCarouselService.list();
    return NextResponse.json(slides);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Admin-only — multipart with `file` (image) and `cards` (JSON string).
export async function POST(request: Request) {
  try {
    const auth = await requireRole([UserRole.ADMIN]);
    if (auth instanceof NextResponse) return auth;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const cardsRaw = formData.get("cards");

    if (!file) {
      return NextResponse.json(
        { error: "La imagen de fondo es requerida" },
        { status: 400 }
      );
    }
    if (typeof cardsRaw !== "string") {
      return NextResponse.json(
        { error: "Datos de las cartas faltantes" },
        { status: 400 }
      );
    }

    const cards = slideCardsSchema.parse(JSON.parse(cardsRaw));
    const slide = await HomeCarouselService.create(file, cards);
    return NextResponse.json(slide);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: z.treeifyError(error) },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
