import { NewsPhotosService } from "@/backend/services/news-photos-service";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string, photoId: string }> }
) {
    try {
        const { id, photoId } = await context.params;
        await NewsPhotosService.deleteNewsPhoto(id, photoId);
        return NextResponse.json({ message: 'News photo deleted successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(error) }, { status: 400 });
        }
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}