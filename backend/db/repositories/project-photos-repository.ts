import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { db } from "../config";
import { projectPhotos } from "../schema";
import { ProjectPhoto } from "@/domain/ProjectPhoto";
import { and, eq } from "drizzle-orm";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.PROJECT_PHOTOS);

export class ProjectPhotosRepository {
    public static async getProjectPhoto(projectId: string, photoId: string): Promise<ProjectPhoto> {
        try {
            const photo = await db.query.projectPhotos.findFirst({
                where: and(eq(projectPhotos.projectId, projectId), eq(projectPhotos.id, photoId)),
            });
            if (!photo) {
                throw errorHandler.handleError(RepositoryErrorType.NOT_FOUND, new Error('Project photo not found'));
            }
            return ProjectPhotosRepository.mapToDomain(photo);
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.GET, error);
        }
    }

    public static async createProjectPhoto(projectId: string, url: string): Promise<ProjectPhoto> {
        try {
            const newPhoto = await db.insert(projectPhotos).values({
                projectId,
                url,
            }).returning();
            return ProjectPhotosRepository.mapToDomain(newPhoto[0]);
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
        }
    }

    public static async deleteProjectPhoto(id: string): Promise<void> {
        try {
            await db.delete(projectPhotos).where(eq(projectPhotos.id, id));
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.DELETE, error);
        }
    }

    public static mapToDomain(photo: typeof projectPhotos.$inferSelect): ProjectPhoto {
        return {
            id: photo.id,
            projectId: photo.projectId,
            url: photo.url,
            createdAt: photo.createdAt,
        }
    }
}

