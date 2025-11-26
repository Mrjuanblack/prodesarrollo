import { NewsService } from "@/backend/services/news-service";
import { createNewsSchema, NewsCategory } from "@/domain/News";
import { PaginationRequest } from "@/domain/Pagination";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export async function GET(request: Request) {
    try {
        //read query params
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get("page")) || 0;
        const size = Number(searchParams.get("size")) || 10;
        const type = searchParams.get("type") || undefined;

        const typeEnum =
        type && Object.values(NewsCategory).includes(type as NewsCategory)
            ? (type as NewsCategory)
            : undefined;

        const pRequest: PaginationRequest = {
            page,
            size,
        };

        const news = await NewsService.getPaginatedNews(pRequest, typeEnum);
        return NextResponse.json(news);
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
        const validatedBody = createNewsSchema.parse(body);
        const news = await NewsService.createNews(validatedBody);
        return NextResponse.json(news);
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