import z from "zod/v4";
import { NextResponse } from "next/server";
import { validateUser } from "@/backend/utilities/auth/validateUser";
import { ProjectPhotosService } from "@/backend/services/project-photos-service";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string; photoId: string }> }
) {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const { id, photoId } = await context.params;
    await ProjectPhotosService.deleteProjectPhoto(id, photoId);
    return NextResponse.json({ message: "Project photo deleted successfully" });
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
