import { db } from "../config";
import { newsInlineImages } from "../schema";
import { and, eq, inArray, isNull, notInArray, or } from "drizzle-orm";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(
  RepositoryErrorOrigin.NEWS_INLINE_IMAGES
);

export interface InlineImageRow {
  id: string;
  newsId: string | null;
  imageUrl: string;
  createdAt: Date;
}

export class NewsInlineImageRepository {
  /** Track a fresh upload. newsId stays NULL until the news is saved. */
  public static async track(imageUrl: string): Promise<InlineImageRow> {
    try {
      const inserted = await db
        .insert(newsInlineImages)
        .values({ imageUrl })
        .returning();
      return inserted[0];
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }

  /**
   * Associate the given URLs with this newsId. Only updates rows that are
   * orphan (newsId IS NULL) or already belong to this news, never steals
   * from another article.
   */
  public static async claimForNews(
    newsId: string,
    imageUrls: string[]
  ): Promise<void> {
    if (imageUrls.length === 0) return;
    try {
      await db
        .update(newsInlineImages)
        .set({ newsId })
        .where(
          and(
            inArray(newsInlineImages.imageUrl, imageUrls),
            or(
              isNull(newsInlineImages.newsId),
              eq(newsInlineImages.newsId, newsId)
            )
          )
        );
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.UPDATE_MANY, error);
    }
  }

  /**
   * Find images currently attached to this news that are NOT in the given
   * URL list — i.e. images the editor removed from the body.
   */
  public static async findStaleForNews(
    newsId: string,
    keepUrls: string[]
  ): Promise<InlineImageRow[]> {
    try {
      const condition =
        keepUrls.length === 0
          ? eq(newsInlineImages.newsId, newsId)
          : and(
              eq(newsInlineImages.newsId, newsId),
              notInArray(newsInlineImages.imageUrl, keepUrls)
            );

      return await db
        .select()
        .from(newsInlineImages)
        .where(condition);
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET_MANY, error);
    }
  }

  public static async getByNewsId(
    newsId: string
  ): Promise<InlineImageRow[]> {
    try {
      return await db
        .select()
        .from(newsInlineImages)
        .where(eq(newsInlineImages.newsId, newsId));
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET_MANY, error);
    }
  }

  public static async deleteByIds(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    try {
      await db
        .delete(newsInlineImages)
        .where(inArray(newsInlineImages.id, ids));
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.DELETE_MANY, error);
    }
  }
}
