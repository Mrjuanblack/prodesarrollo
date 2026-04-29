import z from "zod/v4";
import { NextResponse } from "next/server";
import { requireRole } from "@/backend/utilities/auth/requireRole";
import { UserRole } from "@/domain/user";
import { ProjectDocumentService } from "@/backend/services/project-document-service";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string; documentId: string }> }
) {
  try {
    const result = await requireRole([UserRole.ADMIN, UserRole.ADMIN_PROJECTS]);

    if (result instanceof NextResponse) {
      return result;
    }

    const { documentId } = await context.params;
    await ProjectDocumentService.deleteProjectDocument(documentId);
    return NextResponse.json({
      message: "Project document deleted successfully",
    });
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
