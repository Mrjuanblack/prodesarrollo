import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";
import { ProjectService } from "@/backend/services/project-service";
import { createProjectSchema, Project, ProjectType } from "@/domain/Projects";

export async function GET(request: Request) {
  try {
    //read query params
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 0;
    const size = Number(searchParams.get("size")) || 10;
    const year = Number(searchParams.get("year")) || undefined;
    const type = searchParams.get("type") || undefined;
    const search = searchParams.get("search") || undefined;
    const highlight = searchParams.get("highlight") || undefined;
    const donationProject = searchParams.get("donationProject") || undefined;

    const typeEnum =
      type && Object.values(ProjectType).includes(type as ProjectType)
        ? (type as ProjectType)
        : undefined;

    const pRequest: PaginationRequest = {
      page,
      size,
    };

    if (highlight) {
      const parsedBoolean = Boolean(highlight);
      if(parsedBoolean) {
        const projects = await ProjectService.getHighlightedProjects();
        const paginationResponse: PaginationResponse<Project> = {
          data: projects,
          page: 0,
          size: 10,
          total: projects.length,
        }
        return NextResponse.json(paginationResponse);
      }
    }

    const projects = await ProjectService.getPaginatedProjects(
      pRequest,
      search,
      year,
      typeEnum
    );

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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
