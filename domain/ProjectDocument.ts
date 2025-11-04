import { z } from "zod/v4";
export const createProjectDocumentFrontendSchema = z.object({
    name: z.string({ message: "El nombre del documento debe ser textual" }).min(1, 'El nombre del documento es requerido'),
    file: z.instanceof(File).nullable().superRefine((file, ctx) => {
        if (file === null) {
            ctx.addIssue({
                code: "custom",
                message: 'El archivo es requerido',
            });
        }
    }),
})

export type CreateProjectDocumentFrontendSchema = z.infer<typeof createProjectDocumentFrontendSchema>;

export const createProjectDocumentSchemaRequest = z.object({
    name: z.string({ message: "El nombre del documento debe ser textual" }).min(1, 'El nombre del documento es requerido'),
    fileExtension: z.string({ message: "La extensión del archivo debe ser textual" }).min(1, 'La extensión del archivo es requerida'),
    mimeType: z.string({ message: "El MIME type del archivo debe ser textual" }).min(1, 'El MIME type del archivo es requerido'),
})

export type CreateProjectDocumentRequest = z.infer<typeof createProjectDocumentSchemaRequest>;

export interface CreateProjectDocumentResponse {
    url: string;
}

export const makeProjectDocumentPublicRequest = z.object({
    name: z.string({ message: "El nombre del documento debe ser textual" }).min(1, 'El nombre del documento es requerido'), // Used to store the name in the database
    fileId: z.string({ message: "El ID del archivo debe ser textual" }).min(1, 'El ID del archivo es requerido'),
});

export type MakeProjectDocumentPublicRequest = z.infer<typeof makeProjectDocumentPublicRequest>;

export interface MakeProjectDocumentPublicResponse {
    publicUrl: string;
}

export interface ProjectDocument {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
}