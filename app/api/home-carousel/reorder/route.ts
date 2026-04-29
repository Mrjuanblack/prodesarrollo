import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { requireRole } from "@/backend/utilities/auth/requireRole";
import { UserRole } from "@/domain/user";
import { HomeCarouselService } from "@/backend/services/home-carousel-service";
import { reorderSlidesSchema } from "@/domain/HomeCarouselSlide";

export async function PATCH(request: Request) {
  try {
    const auth = await requireRole([UserRole.ADMIN]);
    if (auth instanceof NextResponse) return auth;

    const body = await request.json();
    const { orders } = reorderSlidesSchema.parse(body);
    await HomeCarouselService.reorder(orders);
    return NextResponse.json({ success: true });
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
