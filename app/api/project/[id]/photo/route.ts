import { ProjectPhotosService } from "@/backend/services/project-photos-service";
import { createProjectPhotoSchemaRequest } from "@/domain/ProjectPhoto";
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

        const validatedBody = createProjectPhotoSchemaRequest.parse({ file });
        
        const projectPhoto = await ProjectPhotosService.createProjectPhoto(id, validatedBody.file);
        return NextResponse.json(projectPhoto);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(error) }, { status: 400 });
        }
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

