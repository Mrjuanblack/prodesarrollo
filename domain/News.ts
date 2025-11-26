import { z } from "zod/v4";
import { NewsPhoto } from "./NewsPhoto";

export enum NewsCategory {
    GENERAL = "general",
    EVENTS = "events",
    PROJECTS = "projects",
    SOCIAL = "social",
}

export const newsCategoryList = Object.values(NewsCategory);

export const getNewsCategoryLabel = (category: NewsCategory): string => {
    switch (category) {
        case NewsCategory.GENERAL:
            return "General";
        case NewsCategory.EVENTS:
            return "Eventos";
        case NewsCategory.PROJECTS:
            return "Proyectos";
        case NewsCategory.SOCIAL:
            return "Social";
    }
};

export const createNewsFormSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    content: z.string().min(1, "El contenido es requerido"),
    category: z.enum(NewsCategory, { message: "La categoría es requerida y debe ser una opción válida." }),
})

export const createNewsSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    content: z.string().min(1, "El contenido es requerido"),
    category: z.enum(NewsCategory, { message: "La categoría es requerida y debe ser una opción válida." }),
})

export type CreateNews = z.infer<typeof createNewsSchema>;
export type CreateNewsForm = z.infer<typeof createNewsFormSchema>;

export const updateNewsFormSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    content: z.string().min(1, "El contenido es requerido"),
    category: z.enum(NewsCategory, { message: "La categoría es requerida y debe ser una opción válida." }),
})

export const updateNewsSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    content: z.string().min(1, "El contenido es requerido"),
    category: z.enum(NewsCategory, { message: "La categoría es requerida y debe ser una opción válida." }),
})

export type UpdateNews = z.infer<typeof updateNewsSchema>;
export type UpdateNewsForm = z.infer<typeof updateNewsFormSchema>;

export interface News extends CreateNews {
    id: string;
    photos: NewsPhoto[];
    createdAt: Date;
    updatedAt: Date;
}