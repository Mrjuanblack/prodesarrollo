import { ProjectDocumentService } from "@/backend/services/project-document-service";
import { confirmUploadProjectDocumentSchema } from "@/domain/ProjectDocument";
import { NextResponse } from "next/server";
import z from "zod/v4";

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const body = await request.json();
        const validatedBody = confirmUploadProjectDocumentSchema.parse(body);

        const projectDocument = await ProjectDocumentService.confirmUpload(id, validatedBody);
        return NextResponse.json(projectDocument);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(error) }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}