import { ProjectPhotosRepository } from "../db/repositories/project-photos-repository";
import { GoogleStorageFolder, GoogleStorageManager } from "../google-storage/google-storage-manager";

export class ProjectPhotosService {
    public static async createProjectPhoto(projectId: string, file: File) {
        const url = await GoogleStorageManager.uploadFile(GoogleStorageFolder.PROJECTS, projectId, file);
        return await ProjectPhotosRepository.createProjectPhoto(projectId, url);
    }

    public static async deleteProjectPhoto(projectId: string, photoId: string): Promise<void> {
        const photo = await ProjectPhotosRepository.getProjectPhoto(projectId, photoId);
        await GoogleStorageManager.deleteFile(photo.url);
        await ProjectPhotosRepository.deleteProjectPhoto(photo.id);
    }
}