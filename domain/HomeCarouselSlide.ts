import { z } from "zod/v4";

export interface HomeCarouselCard {
  title: string;
  description: string;
}

export interface HomeCarouselSlide {
  id: string;
  imageUrl: string;
  leftCard: HomeCarouselCard | null;
  rightCard: HomeCarouselCard | null;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = z
  .object({
    title: z.string().min(1, "El título es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
  })
  .nullable();

const ensureAtLeastOneCard = (
  data: { leftCard: HomeCarouselCard | null; rightCard: HomeCarouselCard | null },
  ctx: z.RefinementCtx
): void => {
  if (data.leftCard === null && data.rightCard === null) {
    ctx.addIssue({
      code: "custom",
      message: "Debe completar al menos una de las dos cartas",
      path: ["leftCard"],
    });
  }
};

// Frontend form input. The image is uploaded out-of-band as multipart and
// only its filePath ends up in the DB; on create the file is required, on
// update it is optional.
export const createSlideFormSchema = z
  .object({
    leftCard: cardSchema,
    rightCard: cardSchema,
  })
  .superRefine(ensureAtLeastOneCard);

export const updateSlideFormSchema = createSlideFormSchema;

// Backend payload (what comes through the JSON portion of the multipart
// body). We coerce strings to nulls when the card is absent.
export const slideCardsSchema = z
  .object({
    leftCard: cardSchema,
    rightCard: cardSchema,
  })
  .superRefine(ensureAtLeastOneCard);

export type SlideCards = z.infer<typeof slideCardsSchema>;

export const reorderSlidesSchema = z.object({
  orders: z
    .array(
      z.object({
        id: z.string().uuid("ID inválido"),
        displayOrder: z.number().int().nonnegative(),
      })
    )
    .min(1, "La lista no puede estar vacía"),
});
