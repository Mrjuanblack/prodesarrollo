import { CreateNews, News, NewsCategory, UpdateNews } from "@/domain/News";
import { NewsRepository } from "../db/repositories/news-repository";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";

export class NewsService {
    public static async createNews(news: CreateNews): Promise<News> {
        return await NewsRepository.createNews(news);
    }

    public static async getNewsById(id: string): Promise<News> {
        return await NewsRepository.getNewsById(id);
    }

    public static async getPaginatedNews(pRequest: PaginationRequest, type?: NewsCategory): Promise<PaginationResponse<News>> {
        return await NewsRepository.getPaginatedNews(pRequest, type);
    }

    public static async updateNews(id: string, news: UpdateNews): Promise<News> {
        return await NewsRepository.updateNews(id, news);
    }
}