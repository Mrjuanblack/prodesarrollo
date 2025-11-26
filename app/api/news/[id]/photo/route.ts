import { NewsPhotosService } from "@/backend/services/news-photos-service";
import { createNewsPhotoSchemaRequest } from "@/domain/NewsPhoto";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        const validatedBody = createNewsPhotoSchemaRequest.parse({ file });
        const newsPhoto = await NewsPhotosService.createNewsPhoto(id, validatedBody.file);
        return NextResponse.json(newsPhoto);
    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(error) }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}