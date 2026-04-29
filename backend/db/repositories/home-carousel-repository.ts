import { db } from "../config";
import { homeCarouselSlides } from "../schema";
import { asc, eq, max } from "drizzle-orm";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";
import {
  HomeCarouselSlide,
  HomeCarouselCard,
  SlideCards,
} from "@/domain/HomeCarouselSlide";

const errorHandler = new ErrorHandler_Repository(
  RepositoryErrorOrigin.HOME_CAROUSEL
);

type SlideRow = typeof homeCarouselSlides.$inferSelect;

const mapToDomain = (row: SlideRow): HomeCarouselSlide => {
  const leftCard: HomeCarouselCard | null =
    row.leftCardTitle && row.leftCardDescription
      ? { title: row.leftCardTitle, description: row.leftCardDescription }
      : null;
  const rightCard: HomeCarouselCard | null =
    row.rightCardTitle && row.rightCardDescription
      ? { title: row.rightCardTitle, description: row.rightCardDescription }
      : null;

  return {
    id: row.id,
    imageUrl: row.imageUrl,
    leftCard,
    rightCard,
    displayOrder: row.displayOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
};

export class HomeCarouselRepository {
  public static async getAll(): Promise<HomeCarouselSlide[]> {
    try {
      const rows = await db
        .select()
        .from(homeCarouselSlides)
        .orderBy(asc(homeCarouselSlides.displayOrder));
      return rows.map(mapToDomain);
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET_ALL, error);
    }
  }

  public static async getById(id: string): Promise<HomeCarouselSlide> {
    try {
      const row = await db.query.homeCarouselSlides.findFirst({
        where: eq(homeCarouselSlides.id, id),
      });
      if (!row) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("Home carousel slide not found")
        );
      }
      return mapToDomain(row);
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async create(input: {
    imageUrl: string;
    cards: SlideCards;
  }): Promise<HomeCarouselSlide> {
    try {
      const next = await db
        .select({ value: max(homeCarouselSlides.displayOrder) })
        .from(homeCarouselSlides);
      const nextOrder = (next[0]?.value ?? -1) + 1;

      const inserted = await db
        .insert(homeCarouselSlides)
        .values({
          imageUrl: input.imageUrl,
          leftCardTitle: input.cards.leftCard?.title ?? null,
          leftCardDescription: input.cards.leftCard?.description ?? null,
          rightCardTitle: input.cards.rightCard?.title ?? null,
          rightCardDescription: input.cards.rightCard?.description ?? null,
          displayOrder: nextOrder,
        })
        .returning();

      return mapToDomain(inserted[0]);
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }

  public static async update(
    id: string,
    input: { imageUrl?: string; cards: SlideCards }
  ): Promise<HomeCarouselSlide> {
    try {
      const updated = await db
        .update(homeCarouselSlides)
        .set({
          ...(input.imageUrl ? { imageUrl: input.imageUrl } : {}),
          leftCardTitle: input.cards.leftCard?.title ?? null,
          leftCardDescription: input.cards.leftCard?.description ?? null,
          rightCardTitle: input.cards.rightCard?.title ?? null,
          rightCardDescription: input.cards.rightCard?.description ?? null,
          updatedAt: new Date(),
        })
        .where(eq(homeCarouselSlides.id, id))
        .returning();

      if (updated.length === 0) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("Home carousel slide not found")
        );
      }

      return mapToDomain(updated[0]);
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.UPDATE, error);
    }
  }

  public static async delete(id: string): Promise<void> {
    try {
      const deleted = await db
        .delete(homeCarouselSlides)
        .where(eq(homeCarouselSlides.id, id))
        .returning({ id: homeCarouselSlides.id });
      if (deleted.length === 0) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("Home carousel slide not found")
        );
      }
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.DELETE, error);
    }
  }

  public static async reorder(
    orders: { id: string; displayOrder: number }[]
  ): Promise<void> {
    try {
      await db.transaction(async (tx) => {
        for (const { id, displayOrder } of orders) {
          await tx
            .update(homeCarouselSlides)
            .set({ displayOrder, updatedAt: new Date() })
            .where(eq(homeCarouselSlides.id, id));
        }
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.UPDATE_MANY, error);
    }
  }
}
