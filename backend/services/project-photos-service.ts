import { ProjectPhotosRepository } from "../db/repositories/project-photos-repository";
import { StorageFolder, StorageManager } from "../storage/storage-manager";

export class ProjectPhotosService {
    public static async createProjectPhoto(projectId: string, file: File) {
        const url = await StorageManager.uploadFile(StorageFolder.PROJECTS, projectId, file);
        return await ProjectPhotosRepository.createProjectPhoto(projectId, url);
    }

    public static async deleteProjectPhoto(projectId: string, photoId: string): Promise<void> {
        const photo = await ProjectPhotosRepository.getProjectPhoto(projectId, photoId);
        await StorageManager.deleteFile(photo.url);
        await ProjectPhotosRepository.deleteProjectPhoto(photo.id);
    }
}