import { NewsInlineImageRepository } from "../db/repositories/news-inline-image-repository";
import { StorageFolder, StorageManager } from "../storage/storage-manager";

const SUBFOLDER = "body";

/**
 * Pull every image src out of an HTML string. We only care about <img src="...">
 * — figure/picture/etc. fall back to img inside.
 */
const extractImageSrcs = (html: string): string[] => {
  const matches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  const set = new Set<string>();
  for (const m of matches) set.add(m[1]);
  return Array.from(set);
};

/**
 * Filter to only the URLs that point at our own storage. Anything else
 * (external image, data URL, blob URL) is left untracked.
 */
const ownUrls = (urls: string[]): string[] => {
  const base = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";
  if (!base) return [];
  return urls.filter((u) => u.startsWith(base));
};

/**
 * Convert the public R2 URL (e.g. https://cdn…/prod/news-inline/body/abc.jpg)
 * back into the relative storage path StorageManager expects to delete it.
 * Returns null if the URL doesn't match our base + env prefix shape.
 */
const urlToStoragePath = (url: string): string | null => {
  const base = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";
  if (!base || !url.startsWith(base)) return null;
  // Strip base + leading slash + env prefix (prod / dev).
  const tail = url.slice(base.length).replace(/^\/+/, "");
  const slashIdx = tail.indexOf("/");
  if (slashIdx < 0) return null;
  return tail.slice(slashIdx + 1);
};

export class NewsInlineImageService {
  /**
   * Called by the upload endpoint when the admin inserts an image inside
   * the rich-text editor. Uploads to R2, registers the URL with newsId=null
   * (will be claimed when the news is saved).
   */
  public static async upload(file: File): Promise<{ url: string }> {
    const filePath = await StorageManager.uploadFile(
      StorageFolder.NEWS_INLINE,
      SUBFOLDER,
      file
    );
    const base = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";
    const env = process.env.NODE_ENV === "production" ? "prod" : "dev";
    const url = [base.replace(/\/+$/, ""), env, filePath]
      .filter(Boolean)
      .join("/");
    await NewsInlineImageRepository.track(url);
    return { url };
  }

  /**
   * Reconcile the news's inline-image rows with the latest content body.
   *
   *  - URLs newly present in the body get claimed (newsId set).
   *  - URLs previously attached to this news but no longer in the body get
   *    deleted from R2 and from the table.
   *
   * Call this from createNews and updateNews AFTER the news row exists.
   */
  public static async syncWithContent(
    newsId: string,
    htmlContent: string
  ): Promise<void> {
    const urlsInBody = ownUrls(extractImageSrcs(htmlContent));

    await NewsInlineImageRepository.claimForNews(newsId, urlsInBody);

    const stale = await NewsInlineImageRepository.findStaleForNews(
      newsId,
      urlsInBody
    );

    if (stale.length === 0) return;

    await Promise.all(
      stale.map(async (row) => {
        const path = urlToStoragePath(row.imageUrl);
        if (path) {
          await StorageManager.deleteFile(path).catch(() => {});
        }
      })
    );
    await NewsInlineImageRepository.deleteByIds(stale.map((r) => r.id));
  }

  /**
   * Called from NewsService.deleteNew. Pulls every inline image attached
   * to this news, deletes the R2 objects, and lets the cascade FK clean up
   * the rows when the news row itself is deleted.
   */
  public static async deleteAllForNews(newsId: string): Promise<void> {
    const rows = await NewsInlineImageRepository.getByNewsId(newsId);
    if (rows.length === 0) return;

    await Promise.all(
      rows.map(async (row) => {
        const path = urlToStoragePath(row.imageUrl);
        if (path) {
          await StorageManager.deleteFile(path).catch(() => {});
        }
      })
    );
    // Rows themselves get removed by the cascade FK when the news is deleted.
  }
}
