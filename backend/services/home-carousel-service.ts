import { HomeCarouselRepository } from "../db/repositories/home-carousel-repository";
import { StorageFolder, StorageManager } from "../storage/storage-manager";
import {
  HomeCarouselSlide,
  SlideCards,
} from "@/domain/HomeCarouselSlide";

const SUBFOLDER = "slides";

export class HomeCarouselService {
  public static async list(): Promise<HomeCarouselSlide[]> {
    return HomeCarouselRepository.getAll();
  }

  public static async getById(id: string): Promise<HomeCarouselSlide> {
    return HomeCarouselRepository.getById(id);
  }

  public static async create(
    file: File,
    cards: SlideCards
  ): Promise<HomeCarouselSlide> {
    const imageUrl = await StorageManager.uploadFile(
      StorageFolder.HOME_CAROUSEL,
      SUBFOLDER,
      file
    );
    return HomeCarouselRepository.create({ imageUrl, cards });
  }

  public static async update(
    id: string,
    cards: SlideCards,
    file?: File
  ): Promise<HomeCarouselSlide> {
    const existing = await HomeCarouselRepository.getById(id);

    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await StorageManager.uploadFile(
        StorageFolder.HOME_CAROUSEL,
        SUBFOLDER,
        file
      );
    }

    const updated = await HomeCarouselRepository.update(id, {
      imageUrl,
      cards,
    });

    // Best-effort delete of the previous image once the row points at the
    // new one. Failure here doesn't break the update — the orphaned object
    // can be cleaned up manually.
    if (file) {
      StorageManager.deleteFile(existing.imageUrl).catch(() => {});
    }

    return updated;
  }

  public static async delete(id: string): Promise<void> {
    const existing = await HomeCarouselRepository.getById(id);
    await HomeCarouselRepository.delete(id);
    StorageManager.deleteFile(existing.imageUrl).catch(() => {});
  }

  public static async reorder(
    orders: { id: string; displayOrder: number }[]
  ): Promise<void> {
    await HomeCarouselRepository.reorder(orders);
  }
}
