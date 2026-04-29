import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { requireRole } from "@/backend/utilities/auth/requireRole";
import { UserRole } from "@/domain/user";
import { HomeCarouselService } from "@/backend/services/home-carousel-service";
import { slideCardsSchema } from "@/domain/HomeCarouselSlide";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireRole([UserRole.ADMIN]);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const cardsRaw = formData.get("cards");

    if (typeof cardsRaw !== "string") {
      return NextResponse.json(
        { error: "Datos de las cartas faltantes" },
        { status: 400 }
      );
    }

    const cards = slideCardsSchema.parse(JSON.parse(cardsRaw));
    const slide = await HomeCarouselService.update(
      id,
      cards,
      file ?? undefined
    );
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

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireRole([UserRole.ADMIN]);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    await HomeCarouselService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
