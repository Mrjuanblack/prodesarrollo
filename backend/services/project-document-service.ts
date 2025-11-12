import { ConfirmUploadProjectDocument, CreateProjectDocumentRequest, CreateProjectDocumentResponse, MakeProjectDocumentPublicRequest, MakeProjectDocumentPublicResponse, ProjectDocument } from "@/domain/ProjectDocument";
import { ProjectDocumentRepository } from "../db/repositories/project-document-repository";
import { ProjectRepository } from "../db/repositories/project-repository";
import { GoogleStorageFolder, GoogleStorageManager } from "../google-storage/google-storage-manager";

export class ProjectDocumentService {
    public static async getUploadUrl(projectId: string, createProjectDocument: CreateProjectDocumentRequest): Promise<CreateProjectDocumentResponse> {
        // Get related project data
        const project = await ProjectRepository.getProjectById(projectId);

        const fileName = `${createProjectDocument.name}.${createProjectDocument.fileExtension}`;

        const result = await GoogleStorageManager.getUploadUrl(GoogleStorageFolder.PROJECTS, project.id, fileName, createProjectDocument.mimeType);
        return { url: result.url, name: createProjectDocument.name, filePath: result.filePath };
    }

    public static async confirmUpload(projectId: string, createProjectDocument: ConfirmUploadProjectDocument): Promise<ProjectDocument> {
        // Update database entry
        return await ProjectDocumentRepository.createProjectDocument(projectId, createProjectDocument.name, createProjectDocument.filePath);
    }

    public static async deleteProjectDocument(documentId: string): Promise<void> {
        const document = await ProjectDocumentRepository.getProjectDocumentById(documentId);
        await GoogleStorageManager.deleteFile(document.url);
        await ProjectDocumentRepository.deleteProjectDocument(documentId);
    }
}