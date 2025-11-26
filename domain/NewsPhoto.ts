import { z } from "zod/v4";

export const createNewsPhotoFrontendSchema = z.object({
    file: z.instanceof(File).nullable().superRefine((file, ctx) => {
        if (file === null) {
            ctx.addIssue({
                code: "custom",
                message: 'La foto es requerida',
            });
            return;
        }
        // Validate image size
        if (file.size > 3 * 1024 * 1024) {
            ctx.addIssue({
                code: "custom",
                message: 'La foto debe ser menor a 3MB',
            });
            return;
        }
        // Validate image type (jpeg, png, jpg, webp)
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
            ctx.addIssue({
                code: "custom",
                message: 'La foto debe ser un archivo de imagen',
            });
            return;
        }
    }),
});

export type CreateNewsPhotoFrontendSchema = z.infer<typeof createNewsPhotoFrontendSchema>;

export const createNewsPhotoSchemaRequest = z.object({
    file: z.instanceof(File).superRefine((file, ctx) => {
        // Validate image size
        if (file.size > 3 * 1024 * 1024) {
            ctx.addIssue({
                code: "custom",
                message: 'La foto debe ser menor a 3MB',
            });
            return;
        }
        // Validate image type (jpeg, png, jpg, webp)
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
            ctx.addIssue({
                code: "custom",
                message: 'La foto debe ser un archivo de imagen',
            });
            return;
        }
    }),
});

export type CreateNewsPhotoSchemaRequest = z.infer<typeof createNewsPhotoSchemaRequest>;

export interface NewsPhoto {
    id: string;
    newsId: string;
    url: string;
    createdAt: Date;
}