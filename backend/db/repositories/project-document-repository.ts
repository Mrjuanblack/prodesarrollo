import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { CreateProjectDocumentRequest, ProjectDocument } from "@/domain/ProjectDocument";
import { db } from "../config";
import { projectDocuments } from "../schema";
import { eq } from "drizzle-orm";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.PROJECT_DOCUMENTS);

export class ProjectDocumentRepository {

    public static async createProjectDocument(projectId: string, name: string, url: string): Promise<ProjectDocument> {
        try {
            const newDocument = await db.insert(projectDocuments).values({
                projectId,
                name,
                url,
            }).returning();

            return ProjectDocumentRepository.mapToDomain(newDocument[0]);
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
        }
    }

    public static async getProjectDocumentById(id: string): Promise<ProjectDocument> {
        try {
            const document = await db.query.projectDocuments.findFirst({
                where: eq(projectDocuments.id, id),
            });
            if (!document) {
                throw errorHandler.handleError(RepositoryErrorType.NOT_FOUND, new Error('Project document not found'));
            }

            return ProjectDocumentRepository.mapToDomain(document);
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.GET, error);
        }
    }

    public static async deleteProjectDocument(id: string): Promise<void> {
        try {
            await db.delete(projectDocuments).where(eq(projectDocuments.id, id));
        } catch (error) {
            throw errorHandler.handleError(RepositoryErrorType.DELETE, error);
        }
    }

    public static mapToDomain(document: typeof projectDocuments.$inferSelect): ProjectDocument {
        return {
            id: document.id,
            name: document.name,
            url: document.url,
            createdAt: document.createdAt,
        }
    }
}