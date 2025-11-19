import { ProjectService } from "@/backend/services/project-service";
import { updateProjectSchema } from "@/domain/Projects";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const project = await ProjectService.getProjectById(id);
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const validatedBody = updateProjectSchema.parse(body);
        const project = await ProjectService.updateProject(id, validatedBody);
        return NextResponse.json(project);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(error) }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}