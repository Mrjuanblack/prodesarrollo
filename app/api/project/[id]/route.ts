import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { updateProjectSchema } from "@/domain/Projects";
import { ProjectService } from "@/backend/services/project-service";
import { validateUser } from "@/backend/utilities/auth/validateUser";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const project = await ProjectService.getProjectById(id);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const { id } = await context.params;
    const body = await request.json();
    const validatedBody = updateProjectSchema.parse(body);
    const project = await ProjectService.updateProject(id, validatedBody);
    return NextResponse.json(project);
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
