import { ProjectService } from "@/backend/services/project-service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const years = await ProjectService.getYearsWithProjects();
        return NextResponse.json(years);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}