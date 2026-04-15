import { NewsPhotosRepository } from "../db/repositories/news-photos-repository";
import { StorageFolder, StorageManager } from "../storage/storage-manager";

export class NewsPhotosService {
    public static async createNewsPhoto(newsId: string, file: File) {
        const url = await StorageManager.uploadFile(StorageFolder.NEWS, newsId, file);
        return await NewsPhotosRepository.createNewsPhoto(newsId, url);
    }

    public static async deleteNewsPhoto(newsId: string, photoId: string): Promise<void> {
        const photo = await NewsPhotosRepository.getNewsPhoto(newsId, photoId);
        await StorageManager.deleteFile(photo.url);
        await NewsPhotosRepository.deleteNewsPhoto(photo.id);
    }
}