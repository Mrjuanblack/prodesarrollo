import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { NewsPhoto } from "@/domain/NewsPhoto";
import { db } from "../config";
import { newsPhotos } from "../schema";
import { and, eq } from "drizzle-orm";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.NEWS_PHOTOS);

export class NewsPhotosRepository {
    public static async createNewsPhoto(newsId: string, url: string): Promise<NewsPhoto> {
        try {
            const newPhoto = await db.insert(newsPhotos).values({
                newsId,
                url,
            }).returning();
            return NewsPhotosRepository.mapToDomain(newPhoto[0]);
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
        }
    }

    public static async getNewsPhoto(newsId: string, photoId: string): Promise<NewsPhoto> {
        try {
            const photo = await db.query.newsPhotos.findFirst({
                where: and(eq(newsPhotos.newsId, newsId), eq(newsPhotos.id, photoId)),
            });
            if (!photo) {
                throw errorHandler.handleError(RepositoryErrorType.NOT_FOUND, new Error('News photo not found'));
            }
            return NewsPhotosRepository.mapToDomain(photo);
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.GET, error);
        }
    }

    public static async deleteNewsPhoto(id: string): Promise<void> {
        try {
            await db.delete(newsPhotos).where(eq(newsPhotos.id, id));
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.DELETE, error);
        }
    }

    public static mapToDomain(photo: typeof newsPhotos.$inferSelect): NewsPhoto {
        return {
            id: photo.id,
            newsId: photo.newsId,
            url: photo.url,
            createdAt: photo.createdAt,
        };
    }
}