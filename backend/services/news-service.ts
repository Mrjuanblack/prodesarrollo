import { CreateNews, News, NewsCategory, UpdateNews } from "@/domain/News";
import { NewsRepository } from "../db/repositories/news-repository";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";
import { StorageManager } from "../storage/storage-manager";
import { NewsInlineImageService } from "./news-inline-image-service";
import { sanitizeRichTextHtml } from "../utilities/sanitizeHtml";

export class NewsService {
  public static async createNews(news: CreateNews): Promise<News> {
    const sanitized: CreateNews = {
      ...news,
      content: sanitizeRichTextHtml(news.content),
    };
    const created = await NewsRepository.createNews(sanitized);
    await NewsInlineImageService.syncWithContent(created.id, sanitized.content);
    return created;
  }

  public static async getNewsById(id: string): Promise<News> {
    return await NewsRepository.getNewsById(id);
  }

  public static async getPaginatedNews(
    pRequest: PaginationRequest,
    type?: NewsCategory
  ): Promise<PaginationResponse<News>> {
    return await NewsRepository.getPaginatedNews(pRequest, type);
  }

  public static async updateNews(id: string, news: UpdateNews): Promise<News> {
    const sanitized: UpdateNews = {
      ...news,
      content: sanitizeRichTextHtml(news.content),
    };
    const updated = await NewsRepository.updateNews(id, sanitized);
    await NewsInlineImageService.syncWithContent(id, sanitized.content);
    return updated;
  }

  public static async deleteNew(newId: string): Promise<void> {
    const newData = await NewsRepository.getNewsById(newId);

    const deletePhotoPromises = newData.photos.map((photo) =>
      StorageManager.deleteFile(photo.url)
    );

    await Promise.all([
      ...deletePhotoPromises,
      NewsInlineImageService.deleteAllForNews(newId),
    ]);

    await NewsRepository.deleteNews(newData.id);
  }
}
