import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { validateUser } from "@/backend/utilities/auth/validateUser";
import { createProjectPhotoSchemaRequest } from "@/domain/ProjectPhoto";
import { ProjectPhotosService } from "@/backend/services/project-photos-service";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const { id } = await context.params;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const validatedBody = createProjectPhotoSchemaRequest.parse({ file });

    const projectPhoto = await ProjectPhotosService.createProjectPhoto(
      id,
      validatedBody.file
    );
    return NextResponse.json(projectPhoto);
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
