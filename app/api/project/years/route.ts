import { NextResponse } from "next/server";
import { ProjectService } from "@/backend/services/project-service";

export async function GET(request: Request) {
  try {
    const years = await ProjectService.getYearsWithProjects();
    return NextResponse.json(years);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
