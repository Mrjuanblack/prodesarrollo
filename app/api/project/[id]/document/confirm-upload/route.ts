import z from "zod/v4";
import { NextResponse } from "next/server";
import { requireRole } from "@/backend/utilities/auth/requireRole";
import { UserRole } from "@/domain/user";
import { confirmUploadProjectDocumentSchema } from "@/domain/ProjectDocument";
import { ProjectDocumentService } from "@/backend/services/project-document-service";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const result = await requireRole([UserRole.ADMIN, UserRole.ADMIN_PROJECTS]);

    if (result instanceof NextResponse) {
      return result;
    }

    const { id } = await context.params;

    const body = await request.json();
    const validatedBody = confirmUploadProjectDocumentSchema.parse(body);

    const projectDocument = await ProjectDocumentService.confirmUpload(
      id,
      validatedBody
    );
    return NextResponse.json(projectDocument);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: z.treeifyError(error) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
