import { ProjectDocumentService } from "@/backend/services/project-document-service";
import { createProjectDocumentSchemaRequest } from "@/domain/ProjectDocument";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }

) {
    try {
        const { id } = await context.params;

        const body = await request.json();
        const validatedBody = createProjectDocumentSchemaRequest.parse(body);
        
        const uploadSession = await ProjectDocumentService.getUploadUrl(id, validatedBody);
        return NextResponse.json(uploadSession);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(error) }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}