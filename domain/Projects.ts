import { z } from 'zod/v4'
;
import { ProjectDocument } from './ProjectDocument';
export enum ProjectStatus {
    STARTED = 'started',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export const projectStatusList = Object.values(ProjectStatus);
export const getProjectStatusLabel = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.STARTED:
            return 'Iniciado';
        case ProjectStatus.IN_PROGRESS:
            return 'En progreso';
        case ProjectStatus.COMPLETED:
            return 'Completado';
        case ProjectStatus.CANCELLED:
            return 'Cancelado';
    }
}

// Frontend schema - validates form input (Date objects)
export const createProjectFormSchema = z.object({
    title: z.string({ message: "El título debe ser textual" }).min(1, 'El título es requerido'),
    description: z.string({ message: "La descripción debe ser textual" }).min(1, 'La descripción es requerida'),
    status: z.enum(ProjectStatus, { message: "El estado debe ser un estado válido" }),
    date: z.date({ message: "La fecha debe ser una fecha válida" }),
    relatedProjects: z.array(z.string({ message: "El proyecto relacionado debe ser textual" })).nullable(),
});

// Backend schema - validates API input (coerces strings to dates)
export const createProjectSchema = z.object({
    title: z.string({ message: "El título debe ser textual" }).min(1, 'El título es requerido'),
    description: z.string({ message: "La descripción debe ser textual" }).min(1, 'La descripción es requerida'),
    status: z.enum(ProjectStatus, { message: "El estado debe ser un estado válido" }),
    date: z.coerce.date({ message: "La fecha debe ser una fecha válida" }),
    relatedProjects: z.array(z.string({ message: "El proyecto relacionado debe ser textual" })).nullable(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;
export type CreateProjectForm = z.infer<typeof createProjectFormSchema>;

export const updateProjectFormSchema = z.object({
    title: z.string({ message: "El título debe ser textual" }).min(1, 'El título es requerido'),
    description: z.string({ message: "La descripción debe ser textual" }).min(1, 'La descripción es requerida'),
    status: z.enum(ProjectStatus, { message: "El estado debe ser un estado válido" }),
    date: z.date({ message: "La fecha debe ser una fecha válida" }),
    relatedProjects: z.array(z.string({ message: "El proyecto relacionado debe ser textual" })).nullable(),
});

export const updateProjectSchema = z.object({
    title: z.string("El título debe ser textual").min(1, 'El título es requerido'),
    description: z.string("La descripción debe ser textual").min(1, 'La descripción es requerida'),
    status: z.enum(ProjectStatus, "El estado debe ser un estado válido"),
    date: z.coerce.date("La fecha debe ser una fecha válida"),
    relatedProjects: z.array(z.string("El proyecto relacionado debe ser textual")).nullable(),
});

export type UpdateProject = z.infer<typeof updateProjectSchema>;

export interface SimpleProject {
    id: string;
    title: string;
}

export interface Project extends Omit<CreateProject, 'relatedProjects'> {
    id: string;
    photosUrls: string[];
    documents: ProjectDocument[];
    createdAt: Date;
    updatedAt: Date;
    relatedProjects: SimpleProject[];
}