import { CreateNews, News, NewsCategory, UpdateNews } from "@/domain/News";
import { db } from "../config";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { news, newsPhotos } from "../schema";
import { and, count, desc, eq } from "drizzle-orm";
import { NewsPhoto } from "@/domain/NewsPhoto";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.NEWS);

export class NewsRepository {
    public static async createNews(newsInput: CreateNews): Promise<News> {
        try {
            const newNews = await db.insert(news).values(newsInput).returning();
            return NewsRepository.mapToDomain({
                ...newNews[0],
                photos: null,
            });
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
        }
    }

    public static async getNewsById(id: string): Promise<News> {
        try {
            const result = await db.query.news.findFirst({
                where: eq(news.id, id),
                with: {
                    photos: {
                        columns: {
                            id: true,
                            url: true,
                            createdAt: true,
                        },
                    },
                },
            });

            if (!result) {
                throw errorHandler.handleError(RepositoryErrorType.NOT_FOUND, new Error('News not found'));
            }

            return NewsRepository.mapToDomain({
                ...result,
                photos: result.photos ? result.photos.map((photo) => ({
                    id: photo.id,
                    newsId: result.id,
                    url: photo.url,
                    createdAt: photo.createdAt,
                })) : null,
            });
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.GET, error);
        }
    }

    public static async getPaginatedNews(
        pRequest: PaginationRequest,
        type?: NewsCategory
    ): Promise<PaginationResponse<News>> {
        try {
            const { page, size } = pRequest;

            const conditions = [];

            if (type) {
                conditions.push(eq(news.category, type));
            }

            const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

            const [result, total] = await Promise.all([
                db.query.news.findMany({
                    limit: size,
                    offset: page * size,
                    where: whereCondition,
                    orderBy: desc(news.createdAt),
                    with: {
                        photos: {
                            columns: {
                                id: true,
                                url: true,
                                createdAt: true,
                            },
                        },
                    },
                }),
                db.select({ count: count() }).from(news).where(whereCondition),
            ]);

            return {
                data: result.map((news) => NewsRepository.mapToDomain({
                    ...news,
                    photos: news.photos ? news.photos.map((photo) => ({
                        id: photo.id,
                        newsId: news.id,
                        url: photo.url,
                        createdAt: photo.createdAt,
                    })) : null,
                })),
                page,
                size,
                total: total[0].count,
            };
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.GET, error);
        }
    }

    public static async updateNews(id: string, newsInput: UpdateNews): Promise<News> {
        try {
            const result = await db.update(news).set(newsInput).where(eq(news.id, id)).returning();
            const photos = await db.query.newsPhotos.findMany({
                where: eq(newsPhotos.newsId, id),
            });
            return NewsRepository.mapToDomain({
                ...result[0],
                photos: photos ? photos.map((photo) => ({
                    id: photo.id,
                    newsId: result[0].id,
                    url: photo.url,
                    createdAt: photo.createdAt,
                })) : null,
            });
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.UPDATE, error);
        }
    }

    public static async deleteNews(id: string): Promise<void> {
        try {
            await db.delete(news).where(eq(news.id, id));
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.DELETE, error);
        }
    }

    public static mapToDomain(newsInput: typeof news.$inferSelect & { photos: NewsPhoto[] | null }): News {
        return {
            id: newsInput.id,
            title: newsInput.title,
            content: newsInput.content,
            category: newsInput.category,
            photos: newsInput.photos ?? [],
            createdAt: newsInput.createdAt,
            updatedAt: newsInput.updatedAt,
        };
    }
}