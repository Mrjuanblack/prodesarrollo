import { NewsPhotosRepository } from "../db/repositories/news-photos-repository";
import { GoogleStorageFolder, GoogleStorageManager } from "../google-storage/google-storage-manager";

export class NewsPhotosService {
    public static async createNewsPhoto(newsId: string, file: File) {
        const url = await GoogleStorageManager.uploadFile(GoogleStorageFolder.NEWS, newsId, file);
        return await NewsPhotosRepository.createNewsPhoto(newsId, url);
    }

    public static async deleteNewsPhoto(newsId: string, photoId: string): Promise<void> {
        const photo = await NewsPhotosRepository.getNewsPhoto(newsId, photoId);
        await GoogleStorageManager.deleteFile(photo.url);
        await NewsPhotosRepository.deleteNewsPhoto(photo.id);
    }
}