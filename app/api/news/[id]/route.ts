import { NewsService } from "@/backend/services/news-service";
import { updateNewsSchema } from "@/domain/News";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const news = await NewsService.getNewsById(id);
        return NextResponse.json(news);
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
        const validatedBody = updateNewsSchema.parse(body);
        const news = await NewsService.updateNews(id, validatedBody);
        return NextResponse.json(news);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: z.treeifyError(error) },
                { status: 400 }
            );
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}