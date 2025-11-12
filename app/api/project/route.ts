import { ProjectService } from "@/backend/services/project-service";
import { PaginationRequest } from "@/domain/Pagination";
import { createProjectSchema, ProjectType } from "@/domain/Projects";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export async function GET(request: Request) {
    try {
        //read query params
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get("page")) || 0;
        const size = Number(searchParams.get("size")) || 10;
        const year = Number(searchParams.get("year")) || undefined;
        const type = searchParams.get("type") || undefined;
        const search = searchParams.get("search") || undefined;

        const typeEnum = type && Object.values(ProjectType).includes(type as ProjectType) 
            ? (type as ProjectType) 
            : undefined;

        const pRequest: PaginationRequest = {
            page,
            size,
        }

        const projects = await ProjectService.getPaginatedProjects(pRequest, search, year, typeEnum);

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedBody = createProjectSchema.parse(body);
        const project = await ProjectService.createProject(validatedBody);
        return NextResponse.json(project);
    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(error) }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}