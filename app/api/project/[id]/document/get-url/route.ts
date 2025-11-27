import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { validateUser } from "@/backend/utilities/auth/validateUser";
import { createProjectDocumentSchemaRequest } from "@/domain/ProjectDocument";
import { ProjectDocumentService } from "@/backend/services/project-document-service";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await validateUser();

    const { id } = await context.params;

    const body = await request.json();
    const validatedBody = createProjectDocumentSchemaRequest.parse(body);

    const uploadSession = await ProjectDocumentService.getUploadUrl(
      id,
      validatedBody
    );
    return NextResponse.json(uploadSession);
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
